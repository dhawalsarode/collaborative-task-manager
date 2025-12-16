import { Socket } from "socket.io";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

export const socketAuth = (socket: Socket, next: (err?: Error) => void) => {
  try {
    const cookieHeader = socket.handshake.headers.cookie;

    if (!cookieHeader) {
      return next(new Error("Authentication required"));
    }

    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((c) => c.split("="))
    );

    const token = cookies.access_token;

    if (!token) {
      return next(new Error("Authentication required"));
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    socket.data.userId = decoded.userId;

    next();
  } catch {
    next(new Error("Invalid or expired token"));
  }
};
