import { AuthService } from "../services/auth.service.js";
export class AuthController {
    static async register(req, res) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" });
        }
        const user = await AuthService.register({ name, email, password });
        return res.status(201).json({ message: "User registered successfully", user });
    }
    static async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const { token, user } = await AuthService.login({ email, password });
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
        });
        return res.json({ message: "Login successful", user });
    }
}
