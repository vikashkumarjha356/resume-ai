import { Request, Response, NextFunction } from "express";
import { supabase } from "../config/supabase";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const isDev = process.env.BYPASS_AUTH_LIMITS === 'true';
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      if (isDev) {
        console.warn("Bypassing authentication in development: No auth header found. Using mock user.");
        (req as any).user = { id: "00000000-0000-0000-0000-000000000000", email: "tester@example.com" };
        next();
        return;
      }
      res.status(401).json({
        success: false,
        message: "Missing or invalid authorization header",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      if (isDev) {
        console.warn("Bypassing authentication in development: Invalid token. Using mock user.");
        (req as any).user = { id: "00000000-0000-0000-0000-000000000000", email: "tester@example.com" };
        next();
        return;
      }
      res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid token",
      });
      return;
    }

    // Attach user to request
    (req as any).user = user;
    
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during authentication",
    });
  }
};
