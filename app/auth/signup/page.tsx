"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupInput } from "@/types/auth";
import { useSignup } from "@/hooks/useSignup";
import { User, Mail, Phone, Briefcase, Lock, Coins } from "lucide-react";

export default function IndividualSignupPage() {
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const { mutate, isPending } = useSignup();
  // set the user type stored in localstorage
  const [userType, setUserType] = useState<string | null>("individual")

  const imageUrl = `https://images.unsplash.com/photo-1770795263316-f302a878ee64?w=1200&auto=format&fit=crop&q=80`;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { ownerType: "user" }
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUserType(storedUser)
    if (status) {
      const timer = setTimeout(() => setStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const onSubmit = (data: SignupInput) => {
    mutate(data, {
      onSuccess: () => setStatus({ type: "success", message: "Welcome aboard! Account created." }),
      onError: (err: any) => setStatus({ type: "error", message: err?.message || "Registration failed" }),
    });
  };

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center bg-background px-4 py-8 font-sans bg-cover bg-center bg-no-repeat transition-all duration-700"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Dynamic Blur Overlay */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[6px] z-0" />

      <div className="relative z-10 w-full max-w-xl bg-white/5 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 md:p-12 border border-white/10 animate-in fade-in zoom-in-95 duration-700">
        
        {/* Header Section */}
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-white/10 mb-2 border border-white/10">
            <User className="text-white" size={32} />
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white">Create Account</h2>
          <p className="text-slate-300 text-lg">Manage your personal expenses with ease.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Full Name */}
          <div className="md:col-span-2 group">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2 transition-colors group-focus-within:text-white">
              <User size={16} /> Full Name
            </label>
            <input
              {...register("name")}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-500 outline-none transition-all focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 focus:border-indigo-400"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1 italic">{errors.name.message}</p>}
          </div>

          {/* Email Address */}
          <div className="md:col-span-2 group">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
              <Mail size={16} /> Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-500 outline-none transition-all focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 focus:border-indigo-400"
            />
          </div>

          {/* Phone */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
              <Phone size={16} /> Phone
            </label>
            <input
              {...register("phone")}
              placeholder="+92 3xx xxxxxxx"
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-500 outline-none transition-all focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          {/* Currency */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
              <Coins size={16} /> Currency
            </label>
            <select
              {...register("defaultCurrency")}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-900/80 text-white outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              <option value="PKR">PKR (Rs)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>

          {/* Occupation */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
              <Briefcase size={16} /> Occupation
            </label>
            <input
              {...register("occupation")}
              placeholder="e.g. Designer"
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-500 outline-none transition-all focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          {/* Password */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
              <Lock size={16} /> Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-500 outline-none transition-all focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          {/* Status Message */}
          {status && (
            <div className={`md:col-span-2 p-4 rounded-xl text-sm font-semibold text-center animate-in slide-in-from-top-2 duration-300 ${
              status.type === "success" 
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" 
              : "bg-red-500/20 text-red-300 border border-red-500/30"
            }`}>
              {status.message}
            </div>
          )}

          {/* Action Button */}
          <div className="md:col-span-2 pt-2">
            <button
              disabled={isPending}
              className="group relative w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-4 rounded-2xl transition-all transform active:scale-[0.98] disabled:opacity-50 shadow-[0_10px_20px_rgba(79,70,229,0.3)] flex justify-center items-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating account...
                  </div>
                ) : "Create My Account"}
              </span>
            </button>
          </div>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            Ready to log in? <a href="/auth/login" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors underline underline-offset-4">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
}