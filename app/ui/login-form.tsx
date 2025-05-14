"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { lusitana } from "@/app/ui/fonts";
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "./button";
import clsx from "clsx";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error();

      // Login berhasil, redirect
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="mb-3 mt-5 block text-xs font-medium text-gray-900">
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={clsx(
                "peer block w-full rounded-md border py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500",
                error ? "border-red-500" : "border-gray-200"
              )}
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        {/* Password Input */}
        <div className="mt-4">
          <label htmlFor="password" className="mb-3 mt-5 block text-xs font-medium text-gray-900">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className={clsx(
                "peer block w-full rounded-md border py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500",
                error ? "border-red-500" : "border-gray-200"
              )}
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="mt-4 w-full" disabled={loading}>
          {loading ? (
            "Logging in..."
          ) : (
            <>
              Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </>
          )}
        </Button>

        {/* Error Message */}
        {error && (
          <div className="mt-2 flex items-center text-red-600">
            <ExclamationCircleIcon className="h-5 w-5 mr-2" />
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>
    </form>
  );
}
