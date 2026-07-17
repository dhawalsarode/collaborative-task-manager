import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/client";
import AuthLayout from "../auth/AuthLayout";
import { Toast } from "../lib/toast";

const RegisterPage = () => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [error, setError] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [loading, setLoading] = useState(false);
  const validateName = (value: string) => {
    if (value.trim().length < 3) {
      return "Name must be at least 3 characters.";
    }

    if (value.trim().length > 40) {
      return "Name cannot exceed 40 characters.";
    }

    return "";
  };

  const validateEmail = (value: string) => {
    if (!EMAIL_REGEX.test(value.trim())) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  const getPasswordChecks = (value: string) => ({
    minLength: value.length >= 8,
    uppercase: /[A-Z]/.test(value),
    lowercase: /[a-z]/.test(value),
    number: /\d/.test(value),
  });

  const validatePassword = (value: string) => {
    const checks = getPasswordChecks(value);

    return Object.values(checks).every(Boolean)
      ? ""
      : "Invalid password";
  };

  const validate = () => {
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    const confirmPasswordErr =
      password === confirmPassword
        ? ""
        : "Passwords do not match.";

    setNameError(nameErr);
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setConfirmPasswordError(confirmPasswordErr);

    if (
      nameErr ||
      emailErr ||
      passwordErr ||
      confirmPasswordErr
    ) {
      return false;
    }

      return true;
    };

  const passwordChecks = getPasswordChecks(password);
  const isFormInvalid =
    loading ||
    !name.trim() ||
    !email.trim() ||
    !password ||
    !confirmPassword ||
    !!nameError ||
    !!emailError ||
    !!passwordError ||
    !!confirmPasswordError;
    
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validate()) {
      return;
    }

    setLoading(true);

  try {
    await api.post("/auth/register", {
      name,
      email,
      password,
    });

    Toast.success("Account created successfully.");
    navigate("/login");
  } catch (err: any) {
    const message =
      err.response?.data?.message ??
      "Registration failed.";

    setError(message);
    Toast.error(message);
  } finally {
    setLoading(false);
  }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Create your Syncora workspace account."
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
          placeholder="Full Name"
          value={name}
          onChange={(e) => {
            setError("");

            const value = e.target.value;
            setName(value);
            setNameError(validateName(value));
          }}
          required
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
        />

        {nameError && (
          <p className="mt-2 text-sm text-red-500">
            {nameError}
          </p>
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setError("");

            const value = e.target.value;
            setEmail(value);
            setEmailError(validateEmail(value));
          }}
          required
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
        onFocus={() => setPasswordFocused(true)}
        onChange={(e) => {
          setError("");
          
          const value = e.target.value;
          setPassword(value);
          setPasswordError(validatePassword(value));
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

    {passwordFocused && (
    <div className="mt-2 space-y-1 text-sm">

      <p
        className={
          passwordChecks.minLength
            ? "text-green-600"
            : "text-slate-500"
        }
      >
        {passwordChecks.minLength ? "✓" : "•"} At least 8 characters
      </p>

      <p
        className={
          passwordChecks.uppercase
            ? "text-green-600"
            : "text-slate-500"
        }
      >
        {passwordChecks.uppercase ? "✓" : "•"} One uppercase letter
      </p>

      <p
        className={
          passwordChecks.lowercase
            ? "text-green-600"
            : "text-slate-500"
        }
      >
        {passwordChecks.lowercase ? "✓" : "•"} One lowercase letter
      </p>

      <p
        className={
          passwordChecks.number
            ? "text-green-600"
            : "text-slate-500"
        }
      >
        {passwordChecks.number ? "✓" : "•"} One number
      </p>

    </div>
    )}

        <div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setError("");

              const value = e.target.value;
              setConfirmPassword(value);

              setConfirmPasswordError(
                password === value
                  ? ""
                  : "Passwords do not match."
              );
            }}
            required
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
          />

          {confirmPasswordError && (
            <p className="mt-2 text-sm text-red-500">
              {confirmPasswordError}
            </p>
          )}
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

              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>

        <p className="pt-2 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="
              font-semibold
              text-[#6D5CFF]
              transition-colors
              hover:text-[#5B4EF5]
            "
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;