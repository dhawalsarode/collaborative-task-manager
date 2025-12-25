import { Socket } from "socket.io";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  email: string;
}

export function socketAuth(socket: Socket, next: (err?: Error) => void) {
  try {
    const cookie = socket.handshake.headers.cookie;
    if (!cookie) {
      return next(new Error("Authentication required"));
    }

    const token = cookie
      .split("; ")
      .find((c) => c.startsWith("access_token="))
      ?.split("=")[1];

    if (!token) {
      return next(new Error("Authentication required"));
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    socket.data.user = {
      id: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch {
    next(new Error("Invalid or expired token"));
  }
}

