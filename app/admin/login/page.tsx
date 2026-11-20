"use client";

import { useActionState } from "react";
import { login, type LoginFormState } from "@/lib/actions/auth";

const initialState: LoginFormState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-paper px-4">
      <form action={formAction} className="w-full max-w-sm rounded-[4px] border border-rule bg-paper p-8">
        <h1 className="font-display text-xl font-semibold">CSMP IAS Admin</h1>
        <p className="mt-1 text-sm text-ink/70">Sign in to manage the site.</p>

        <label className="mt-6 flex flex-col gap-1.5 text-sm font-medium">
          Email
          <input
            type="email"
            name="email"
            required
            autoComplete="username"
            className="rounded-[4px] border border-rule bg-paper px-3 py-2.5 outline-none focus:border-ink"
          />
        </label>

        <label className="mt-4 flex flex-col gap-1.5 text-sm font-medium">
          Password
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="rounded-[4px] border border-rule bg-paper px-3 py-2.5 outline-none focus:border-ink"
          />
        </label>

        {state.error ? (
          <p role="alert" className="mt-4 text-sm text-danger">
            {state.error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="mt-6 w-full rounded-[4px] bg-accent px-5 py-3 font-semibold text-paper hover:bg-ink disabled:opacity-60"
        >
          {pending ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
