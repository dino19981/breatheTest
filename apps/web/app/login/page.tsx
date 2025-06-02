"use client";

import { AuthForm } from "@/components/auth/auth-form";
import { t } from "@lingui/core/macro";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-4 shadow-lg sm:p-6 sm:space-y-8">
        <div className="text-center">
          <h1 className="text-xl font-bold sm:text-2xl">{t`Welcome back`}</h1>
          <p className="mt-2 text-sm text-gray-600">{t`Sign in to your account to continue`}</p>
        </div>
        <AuthForm type="login" />
      </div>
    </div>
  );
}
