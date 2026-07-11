import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/client";
import { useAuth } from "../auth/AuthContext";
import { Toast } from "../lib/toast";
import AuthLayout from "../auth/AuthLayout";

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
        <AuthLayout
          title="Welcome Back"
          subtitle="Sign in to continue to your workspace."
        >
          <form
            onSubmit={submit}
            className="space-y-5"
          >

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <input
          className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-white/80
                      px-4
                      py-3
                      outline-none
                      transition
                      focus:border-primary
                      focus:ring-4
                      focus:ring-primary/10
                      "
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-white/70
                      px-5
                      py-4
                      text-base
                      placeholder:text-slate-400
                      outline-none
                      transition-all
                      duration-200
                      focus:border-[#6D5CFF]
                      focus:ring-4
                      focus:ring-[#6D5CFF]/10
                      "
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="
                          w-full
                          rounded-xl
                          border
                          border-slate-200
                          bg-white/70
                          px-5
                          py-4
                          text-base
                          placeholder:text-slate-400
                          outline-none
                          transition-all
                          duration-200
                          focus:border-[#6D5CFF]
                          focus:ring-4
                          focus:ring-[#6D5CFF]/10
                          ">
          Login
        </button>

        <p className="pt-2 text-center text-sm text-slate-600">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="
                      font-semibold
                      text-[#6D5CFF]
                      transition-colors
                      hover:text-[#5B4EF5]">
          Create Account
        </Link>
      </p>
            </form>
    </AuthLayout>
  );
};

export default LoginPage;