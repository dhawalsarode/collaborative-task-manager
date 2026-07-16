import { useState } from "react";

import { useAuth } from "../auth/AuthContext";

import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { useChangePassword } from "../hooks/useChangePassword";

import { Toast } from "../lib/toast";

export default function SettingsPage() {
  const { user, setUser, logout } = useAuth();

  const updateProfile = useUpdateProfile();
  const updatePassword = useChangePassword();

  const [name, setName] = useState(user?.name ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <div className="mx-auto max-w-3xl space-y-6">

      {/* Header */}

      <div>
        <p className="text-sm font-medium text-indigo-600">
          Settings
        </p>

        <h1 className="mt-1 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Account Settings
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Manage your profile, password and account preferences.
        </p>
      </div>

      {/* ---------------- Profile ---------------- */}

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900">

        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Profile
        </h2>

        <p className="mt-1 mb-6 text-sm text-slate-500 dark:text-slate-400">
          Update the name displayed across your workspace.
        </p>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      dark:bg-slate-800
                      text-slate-900
                      dark:text-white
                      placeholder:text-slate-400
                      dark:placeholder:text-slate-500
                      px-4
                      py-3
                      outline-none
                      transition
                      focus:border-indigo-600
                      focus:ring-4
                      focus:ring-indigo-100
                      dark:border-slate-700
                      dark:focus:ring-indigo-900/40
                      "
        />

        <button
          disabled={updateProfile.isPending}
          onClick={async () => {
            try {
              const res = await updateProfile.mutateAsync(name);

              setUser(res.data.user);

              Toast.success("Profile updated.");
            } catch {
              Toast.error("Unable to update profile.");
            }
          }}
          className="
            mt-5
            rounded-xl
            bg-indigo-600
            px-6
            py-3
            font-medium
            text-white
            shadow-md
            transition
            hover:bg-indigo-700
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {updateProfile.isPending
            ? "Saving..."
            : "Save Profile"}
        </button>

      </section>

      {/* ---------------- Password ---------------- */}

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900">

        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Change Password
        </h2>

        <p className="mt-1 mb-6 text-sm text-slate-500 dark:text-slate-400">
          Choose a strong password to keep your account secure.
        </p>

        <div className="space-y-4">

          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
            className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      dark:bg-slate-800
                      text-slate-900
                      dark:text-white
                      placeholder:text-slate-400
                      dark:placeholder:text-slate-500
                      px-4
                      py-3
                      outline-none
                      transition
                      focus:border-indigo-600
                      focus:ring-4
                      focus:ring-indigo-100
                      dark:border-slate-700
                      dark:focus:ring-indigo-900/40
                      "
          />

          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      dark:bg-slate-800
                      text-slate-900
                      dark:text-white
                      placeholder:text-slate-400
                      dark:placeholder:text-slate-500
                      px-4
                      py-3
                      outline-none
                      transition
                      focus:border-indigo-600
                      focus:ring-4
                      focus:ring-indigo-100
                      dark:border-slate-700
                      dark:focus:ring-indigo-900/40
                      "
          />

        </div>

        <button
          disabled={updatePassword.isPending}
          onClick={() =>
            updatePassword.mutate(
              {
                currentPassword,
                newPassword,
              },
              {
                onSuccess: () => {
                  Toast.success("Password changed.");

                  setCurrentPassword("");
                  setNewPassword("");
                },
                onError: () => {
                  Toast.error("Unable to change password.");
                },
              }
            )
          }
          className="
            mt-5
            rounded-xl
            bg-indigo-600
            px-6
            py-3
            font-medium
            text-white
            shadow-md
            transition
            hover:bg-indigo-700
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {updatePassword.isPending
            ? "Updating..."
            : "Change Password"}
        </button>

      </section>

      {/* ---------------- Account ---------------- */}

      <section className="rounded-3xl border border-red-200 bg-white p-5 shadow-sm dark:border-red-800 dark:bg-slate-900">

        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Account
        </h2>

        <p className="mt-1 mb-6 text-sm text-slate-500 dark:text-slate-400">
          Sign out from your current session.
        </p>

        <button
          onClick={logout}
          className="
            rounded-xl
            bg-red-500
            px-6
            py-3
            font-medium
            text-white
            shadow-md
            transition
            hover:bg-red-600
            active:scale-[0.98]
          "
        >
          Logout
        </button>

      </section>

    </div>
  );
}