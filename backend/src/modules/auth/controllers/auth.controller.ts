import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          message: "Name, email and password are required"
        });
      }

      const user = await AuthService.register({
        name,
        email,
        password
      });

      return res.status(201).json({
        message: "User registered successfully",
        user
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Registration failed"
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required"
        });
      }

      const { token, user } = await AuthService.login({
        email,
        password
      });

      res.cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 60 * 60 * 1000
      });

      return res.status(200).json({
        message: "Login successful",
        user
      });
    } catch (error: any) {
      return res.status(401).json({
        message: error.message || "Login failed"
      });
    }
  }
}
