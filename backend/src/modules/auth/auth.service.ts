import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../prisma.js";

export class AuthService {
  static async register(name: string, email: string, password: string) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new Error("User already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: { name, email, password: hashed },
      select: { id: true, name: true, email: true },
    });
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return {
      user: { id: user.id, name: user.name, email: user.email },
      token,
    };
  }

  static async getMe(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });
  }

 
  static async listUsers() {
    return prisma.user.findMany({
      select: { id: true, name: true, email: true },
    });
  }
}