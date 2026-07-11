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

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  return (
    <div className="mx-auto max-w-3xl space-y-8">

      <div>
        <p className="text-sm font-medium text-primary">
          Settings
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          Account Settings
        </h1>
      </div>

      {/* Profile */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">

        <h2 className="mb-5 text-xl font-semibold">
          Profile
        </h2>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="mb-4 w-full rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
        />

        <button
          onClick={async () => {
            try {
              const res =
                await updateProfile.mutateAsync(name);

              setUser(res.data.user);

              Toast.success("Profile updated.");
            } catch {
              Toast.error("Unable to update profile.");
            }
          }}
          className="rounded-xl bg-primary px-5 py-3 text-white"
        >
          Save Profile
        </button>

      </div>

      {/* Password */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">

        <h2 className="mb-5 text-xl font-semibold">
          Change Password
        </h2>

        <input
          type="password"
          placeholder="Current password"
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(
              e.target.value
            )
          }
          className="mb-3 w-full rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
        />

        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(
              e.target.value
            )
          }
          className="mb-4 w-full rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
        />

        <button
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
          className="rounded-xl bg-primary px-5 py-3 text-white"
        >
          Change Password
        </button>

      </div>

      {/* Account */}

      <div className="rounded-3xl border border-red-200 bg-white p-6 dark:border-red-800 dark:bg-slate-900">

        <h2 className="mb-4 text-xl font-semibold">
          Account
        </h2>

        <button
          onClick={logout}
          className="rounded-xl bg-red-600 px-5 py-3 text-white"
        >
          Logout
        </button>

      </div>

    </div>
  );
}