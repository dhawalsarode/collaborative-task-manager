import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/client";
import { useAuth } from "../auth/AuthContext";
import { Toast } from "../lib/toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data.user);
      navigate("/");
      Toast.success("Welcome back!");
    } catch {
      setError("Invalid email or password");
      Toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;