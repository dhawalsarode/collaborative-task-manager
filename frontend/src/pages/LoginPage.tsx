import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("demo@taskapp.com");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/login", { email, password });
      navigate("/");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
          Sign in to your account
        </h1>

        {/* Demo Credentials */}
        <div className="mb-5 p-4 rounded-lg bg-blue-50 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-100">
          <p className="font-semibold mb-1">Demo Credentials</p>
          <p>
            Email: <span className="font-mono">demo@taskapp.com</span>
          </p>
          <p>
            Password: <span className="font-mono">demo123</span>
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            required
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            required
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-xs text-center mt-5 text-gray-500 dark:text-gray-400">
          Registration disabled for demo version
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
