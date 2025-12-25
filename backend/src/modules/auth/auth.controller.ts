import { Request, Response } from "express";
import { AuthService } from "./auth.service.js";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await AuthService.register(name, email, password);
      res.status(201).json({ user });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);

      res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: "none",  
      secure: true,       
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

      res.json({ user });
    } catch {
      res.status(401).json({ message: "Invalid credentials" });
    }
  }

  static async me(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await AuthService.getMe(userId);
    res.json({ user });
  }

  static async listUsers(req: Request, res: Response) {
    const users = await AuthService.listUsers();
    res.json({ users });
  }

  static async logout(req: Request, res: Response) {
    res.clearCookie("access_token");
    res.json({ message: "Logged out" });
  }
}