import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [emailError, setEmailError] = useState("");

  const [loading, setLoading] = useState(false);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (value: string) => {
    if (!EMAIL_REGEX.test(value.trim())) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  const isFormInvalid =
    loading ||
    !email.trim() ||
    !password ||
    !!emailError;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    const emailValidation = validateEmail(email);

      setEmailError(emailValidation);

      if (emailValidation) {
        return;
      }
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {email, password,});

      setUser(res.data.user);
      Toast.success("Welcome back!");
      navigate("/");
    } catch (err: any) {
      const message =
        err.response?.data?.message ??
        "Invalid email or password.";
      setError(message);
        Toast.error(message);
  } finally {
      setLoading(false);
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
          onChange={(e) => {
            setError("");

            const value = e.target.value;
            setEmail(value);
            setEmailError(validateEmail(value));
          }}
          required
        />

        {emailError && (
          <p className="mt-2 text-sm text-red-500">
            {emailError}
          </p>
        )}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white/70
              px-5
              py-4
              pr-14
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
            onChange={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-slate-500
              hover:text-[#6D5CFF]
              transition
            "
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={isFormInvalid}
          className="
            flex
            w-full
            items-center
            justify-center
            rounded-xl
            bg-[#6D5CFF]
            py-3.5
            text-base
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-[#5B4EF5]
            hover:-translate-y-0.5
            hover:shadow-lg
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-70
            disabled:hover:translate-y-0
            disabled:hover:shadow-none
          "
        >
          {loading ? (
            <>
              <svg
                className="mr-2 h-5 w-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  opacity="0.25"
                />
                <path
                  fill="currentColor"
                  d="M22 12a10 10 0 00-10-10v4a6 6 0 016 6h4z"
                />
              </svg>

              Signing In...
            </>
          ) : (
            "Login"
          )}
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