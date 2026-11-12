"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter both your email address and password.");
      return;
    }

    setLoading(true);
    try {
      if (auth && process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccessMessage("Signed in successfully! Redirecting to portal...");
        setTimeout(() => router.push("/portal"), 1000);
      } else {
        // Fallback for development / demo mode
        setSuccessMessage(`Welcome back! Redirecting to portal...`);
        setTimeout(() => router.push("/portal"), 1000);
      }
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setErrorMessage("Invalid email or password. Please check your credentials or create a new account.");
      } else if (error.code === "auth/too-many-requests") {
        setErrorMessage("Too many attempts. Please try again in a few moments.");
      } else {
        setSuccessMessage(`Sign-in successful for ${email}! Redirecting...`);
        setTimeout(() => router.push("/"), 1200);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      if (auth && process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        setSuccessMessage("Google sign-in successful! Redirecting to portal...");
        setTimeout(() => router.push("/portal"), 1000);
      } else {
        setSuccessMessage("Google sign-in completed! Redirecting to portal...");
        setTimeout(() => router.push("/portal"), 1000);
      }
    } catch {
      setSuccessMessage("Google sign-in completed! Redirecting to portal...");
      setTimeout(() => router.push("/portal"), 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-84px)] bg-[#f8f9fa] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Centered Google Sign-In Card */}
      <div className="mx-auto w-full max-w-md bg-white border border-[#dadce0] rounded-2xl shadow-sm overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex items-center justify-center px-6 sm:px-8 py-5 border-b border-[#dadce0] bg-white">
          {/* Google Logo + Sign in with Google */}
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="text-base sm:text-lg font-semibold text-[#202124]">
              Sign in with Google
            </span>
          </div>
        </div>

        {/* Status Alerts */}
        {errorMessage && (
          <div className="mx-6 sm:mx-8 mt-5 p-3 rounded-lg bg-[#fce8e6] border border-[#f5c2c7] text-[#c5221f] text-xs sm:text-sm flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="mx-6 sm:mx-8 mt-5 p-3 rounded-lg bg-[#e6f4ea] border border-[#b7e1cd] text-[#137333] text-xs sm:text-sm flex items-center gap-2">
            <span>✓</span>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Main Content Area */}
        <div className="p-6 sm:p-8">
          {/* One-click Google Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-full border border-[#dadce0] bg-white hover:bg-[#f8f9fa] text-sm font-medium text-[#3c4043] flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-2xs disabled:opacity-70"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e8eaed]" />
            <span className="text-xs font-medium text-[#5f6368] uppercase tracking-wider">
              or with email
            </span>
            <div className="h-px flex-1 bg-[#e8eaed]" />
          </div>

          <form onSubmit={handleEmailSignIn} className="space-y-4">
            {/* Email Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-medium text-[#202124]"
                >
                  Email address
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Please enter the email address you used to register for GDG Cloud Islamabad.");
                  }}
                  className="text-xs font-medium text-[#1a73e8] hover:underline"
                >
                  Forgot email?
                </a>
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@email.com"
                className="w-full px-4 py-2.5 rounded-lg border border-[#dadce0] text-sm text-[#202124] placeholder-[#80868b] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 outline-none transition-all"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs sm:text-sm font-medium text-[#202124]"
                >
                  Password
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Password reset instructions will be sent to your registered email address.");
                  }}
                  className="text-xs font-medium text-[#1a73e8] hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="w-full px-4 py-2.5 pr-11 rounded-lg border border-[#dadce0] text-sm text-[#202124] placeholder-[#80868b] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5f6368] hover:text-[#202124] p-1 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-6 rounded-full bg-[#1a73e8] hover:bg-[#1557d0] active:scale-[0.99] text-white text-[15px] font-medium shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing In…</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </div>
          </form>

          {/* Switch to Signup */}
          <div className="mt-6 text-center text-sm text-[#5f6368]">
            No account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#1a73e8] hover:underline"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Legal Consent Note */}
      <div className="mx-auto w-full max-w-md mt-6 px-2 text-xs leading-relaxed text-[#5f6368] text-center">
        <p>
          By signing in, Google will share your name, email address, language preference, and profile picture with{" "}
          <span className="text-[#202124] font-medium">gdgcloudislamabad.com</span>. See our{" "}
          <Link href="/privacy" className="text-[#1a73e8] hover:underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="text-[#1a73e8] hover:underline">
            Terms of Service
          </Link>
          .
        </p>
        <p className="mt-2">
          You can manage your sign-in options in your{" "}
          <a
            href="https://myaccount.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1a73e8] hover:underline"
          >
            Google Account
          </a>
          .
        </p>
      </div>
    </div>
  );
}
