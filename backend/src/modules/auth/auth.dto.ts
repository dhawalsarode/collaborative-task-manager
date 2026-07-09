import { z } from "zod";

export const RegisterDto = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const LoginDto = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const UpdateProfileDto = z.object({
  name: z.string().min(2).max(100),
});

export const ChangePasswordDto = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
});