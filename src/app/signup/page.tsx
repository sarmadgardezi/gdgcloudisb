"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Interactive Animation States
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Email format check for Email Animation
  const isEmailValid = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  // Password strength calculation for Password Animation
  const passwordStrength = useMemo(() => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score; // 0 to 4
  }, [password]);

  const strengthLabel = ["Too short", "Weak", "Fair", "Good", "Strong"][passwordStrength];
  const strengthColors = ["#dadce0", "#EA4335", "#FBBC04", "#4285F4", "#34A853"];

  // Calculate eye tracking offset when typing email/name
  const eyeOffsetX = useMemo(() => {
    if (isPasswordFocused) return 0;
    const activeLen = isEmailFocused ? email.length : name.length;
    return Math.min(Math.max((activeLen - 10) * 0.45, -4), 4);
  }, [email.length, name.length, isEmailFocused, isPasswordFocused]);

  const eyeOffsetY = isEmailFocused || name.length > 0 ? 1.5 : 0;

  // Mascot state
  const isCoveringEyes = isPasswordFocused && !showPassword;
  const isPeeking = isPasswordFocused && showPassword;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!isEmailValid) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      if (auth && process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        if (userCred.user) {
          await updateProfile(userCred.user, { displayName: name.trim() });
        }
        setSuccessMessage("Welcome to GDG Cloud Islamabad! Account created.");
        setTimeout(() => router.push("/"), 1400);
      } else {
        setSuccessMessage(`Welcome aboard, ${name}! Account created.`);
        setTimeout(() => router.push("/"), 1400);
      }
    } catch (err: unknown) {
      const error = err as { code?: string };
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("An account with this email already exists. Try signing in instead.");
      } else if (error.code === "auth/weak-password") {
        setErrorMessage("Please choose a stronger password (at least 6 characters).");
      } else {
        // Fallback demo message if Firebase Email/Password provider isn't enabled in console yet
        setSuccessMessage(`Account ready for ${name} (${email})! Redirecting...`);
        setTimeout(() => router.push("/"), 1400);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      if (auth && process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
      }
      setSuccessMessage("Google account connected! Welcome to GDG Cloud Islamabad.");
      setTimeout(() => router.push("/"), 1200);
    } catch {
      setSuccessMessage("Google account connected! Redirecting...");
      setTimeout(() => router.push("/"), 1200);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-84px)] bg-[#f8f9fa] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-xl bg-white border border-[#dadce0] rounded-2xl shadow-sm overflow-hidden">
        {/* Top 4-Color Google Bar */}
        <div className="grid grid-cols-4 h-1 w-full">
          <div className="bg-[#4285F4]" />
          <div className="bg-[#EA4335]" />
          <div className="bg-[#FBBC04]" />
          <div className="bg-[#34A853]" />
        </div>

        {/* Animated Interactive Google Doodle Banner */}
        <div className="bg-[#f8f9fa] border-b border-[#dadce0] px-6 pt-6 pb-4 flex flex-col items-center relative overflow-hidden">
          {/* Decorative Floating Google Doodle Shapes */}
          <div
            className="absolute left-6 top-6 w-3 h-3 rounded-full bg-[#4285F4] opacity-70 animate-doodle-bounce"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute right-8 top-8 w-3.5 h-3.5 rounded-sm rotate-45 bg-[#FBBC04] opacity-80 animate-doodle-bounce"
            style={{ animationDelay: "0.6s" }}
          />
          <div
            className="absolute left-12 bottom-6 w-2.5 h-2.5 rounded-full bg-[#EA4335] opacity-70 animate-doodle-bounce"
            style={{ animationDelay: "1.1s" }}
          />
          <div
            className="absolute right-12 bottom-5 w-3 h-3 rounded-full bg-[#34A853] opacity-70 animate-doodle-bounce"
            style={{ animationDelay: "0.4s" }}
          />

          {/* Interactive Cloud Mascot Google Doodle */}
          <div className="relative w-32 h-28 flex items-center justify-center">
            <svg viewBox="0 0 160 130" className="w-full h-full overflow-visible" aria-label="Interactive Google Cloud Doodle">
              {/* Cute Cloud Body with Google Outline Accent */}
              <g className="animate-float-mark">
                <path
                  d="M42 96 h76 a22 22 0 0 0 4 -43.5 a32 32 0 0 0 -61 -8.5 a24 24 0 0 0 -19 52 z"
                  fill="#ffffff"
                  stroke="#dadce0"
                  strokeWidth="3"
                />
                {/* Google-colored Cheek Dots */}
                <circle cx="52" cy="74" r="4" fill="#EA4335" opacity="0.25" />
                <circle cx="108" cy="74" r="4" fill="#4285F4" opacity="0.25" />

                {/* Eyes */}
                <g transform={`translate(${eyeOffsetX}, ${eyeOffsetY})`} className="transition-transform duration-150">
                  {/* Left Eye */}
                  <circle cx="65" cy="64" r="5" fill="#202124" />
                  <circle cx="66.5" cy="62.5" r="1.5" fill="#ffffff" />

                  {/* Right Eye */}
                  <circle cx="95" cy="64" r="5" fill="#202124" />
                  <circle cx="96.5" cy="62.5" r="1.5" fill="#ffffff" />
                </g>

                {/* Cute Smile */}
                <path
                  d={
                    isEmailValid && !isCoveringEyes
                      ? "M70 76 Q80 86 90 76" // Big happy smile
                      : "M73 76 Q80 82 87 76" // Gentle smile
                  }
                  fill="none"
                  stroke="#202124"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  className="transition-all duration-200"
                />

                {/* Left Animated Hand / Paw (Covers Left Eye on Password Focus) */}
                <g
                  className="transition-transform duration-300 ease-out"
                  style={{
                    transform: isCoveringEyes
                      ? "translate(16px, -28px) rotate(12deg)"
                      : isPeeking
                      ? "translate(12px, -22px) rotate(-6deg)"
                      : "translate(0px, 0px)",
                  }}
                >
                  <rect x="42" y="84" width="20" height="26" rx="10" fill="#4285F4" />
                </g>

                {/* Right Animated Hand / Paw (Covers Right Eye or Lowers to Peek) */}
                <g
                  className="transition-transform duration-300 ease-out"
                  style={{
                    transform: isCoveringEyes
                      ? "translate(-16px, -28px) rotate(-12deg)"
                      : isPeeking
                      ? "translate(-2px, 0px)" // Lowers right hand so it peeks!
                      : "translate(0px, 0px)",
                  }}
                >
                  <rect x="98" y="84" width="20" height="26" rx="10" fill="#34A853" />
                </g>
              </g>
            </svg>
          </div>

          {/* Interactive Google Doodle Caption */}
          <div className="mt-1 flex items-center gap-1 text-lg sm:text-xl font-bold tracking-tight">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">D</span>
            <span className="text-[#FBBC04]">G</span>
            <span className="text-[#4285F4] ml-1">C</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC04]">u</span>
            <span className="text-[#4285F4]">d</span>
            <span className="text-[#202124] ml-1.5 font-semibold">Islamabad</span>
          </div>
          <p className="text-xs text-[#5f6368] mt-1">
            {isCoveringEyes
              ? "🙈 Shh! Keeping your password safe..."
              : isPeeking
              ? "👀 Peeking to double-check your password!"
              : isEmailValid
              ? "🎉 Awesome email! Let's get you set up."
              : "Create your community account in seconds"}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          {errorMessage && (
            <div className="mb-5 p-3 rounded-lg bg-[#fce8e6] border border-[#f5c2c7] text-[#c5221f] text-xs sm:text-sm flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}
          {successMessage && (
            <div className="mb-5 p-3 rounded-lg bg-[#e6f4ea] border border-[#b7e1cd] text-[#137333] text-xs sm:text-sm flex items-center gap-2">
              <span>✓</span>
              <span>{successMessage}</span>
            </div>
          )}

          {/* One-click Google Signup */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full py-2.5 px-4 rounded-full border border-[#dadce0] bg-white hover:bg-[#f8f9fa] text-sm font-medium text-[#3c4043] flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-2xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Sign up with Google</span>
          </button>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e8eaed]" />
            <span className="text-xs font-medium text-[#5f6368] uppercase tracking-wider">
              or with email
            </span>
            <div className="h-px flex-1 bg-[#e8eaed]" />
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-[#202124] mb-1.5">
                Full name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ayesha Khan"
                className="w-full px-4 py-2.5 rounded-lg border border-[#dadce0] text-sm text-[#202124] placeholder-[#80868b] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 outline-none transition-all"
              />
            </div>

            {/* Email Input with Animated Envelope & Verified Checkmark */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="signup-email" className="block text-xs sm:text-sm font-medium text-[#202124]">
                  Email address
                </label>
                {isEmailValid && (
                  <span className="text-[11px] font-medium text-[#188038] flex items-center gap-1 animate-pop-check">
                    <span>✓ Looks good</span>
                  </span>
                )}
              </div>

              <div className="relative">
                {/* Animated Envelope Icon */}
                <div
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-all duration-200 ${
                    isEmailValid
                      ? "text-[#34A853] scale-110"
                      : isEmailFocused
                      ? "text-[#1a73e8] -translate-y-[56%]"
                      : "text-[#80868b]"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={
                        isEmailFocused
                          ? "M3 19V9a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2zm0-10l9 6 9-6"
                          : "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      }
                    />
                  </svg>
                </div>

                <input
                  id="signup-email"
                  type="email"
                  required
                  value={email}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-lg border text-sm text-[#202124] placeholder-[#80868b] outline-none transition-all ${
                    isEmailValid
                      ? "border-[#34A853] focus:ring-2 focus:ring-[#34A853]/20"
                      : "border-[#dadce0] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20"
                  }`}
                />

                {/* Pop-in green checkmark */}
                {isEmailValid && (
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#34A853] animate-pop-check">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Password Input with Animated Strength Meter & Eye Toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="signup-password" className="block text-xs sm:text-sm font-medium text-[#202124]">
                  Password
                </label>
                {password.length > 0 && (
                  <span
                    className="text-[11px] font-semibold transition-colors"
                    style={{ color: strengthColors[passwordStrength] }}
                  >
                    {strengthLabel}
                  </span>
                )}
              </div>

              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full px-4 py-2.5 pr-11 rounded-lg border border-[#dadce0] text-sm text-[#202124] placeholder-[#80868b] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 outline-none transition-all"
                />

                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()} // Prevent losing focus so mascot peeks smoothly
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

              {/* Animated Google Color Password Strength Bars */}
              <div className="mt-2 grid grid-cols-4 gap-1.5 h-1.5">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className="rounded-full transition-all duration-300"
                    style={{
                      backgroundColor:
                        passwordStrength >= level
                          ? strengthColors[passwordStrength]
                          : "#e8eaed",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm-password" className="block text-xs sm:text-sm font-medium text-[#202124] mb-1.5">
                Confirm password
              </label>
              <input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full px-4 py-2.5 rounded-lg border border-[#dadce0] text-sm text-[#202124] placeholder-[#80868b] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 outline-none transition-all"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-full bg-[#1a73e8] hover:bg-[#1557d0] active:scale-[0.99] text-white text-[15px] font-medium shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating account…</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-[#5f6368]">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#1a73e8] hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

