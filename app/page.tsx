"use client"
import Link from "next/link";
import { User, Building2, ArrowRight } from "lucide-react";

export default function Home() {
  const imageUrl = `https://images.unsplash.com/photo-1478029115463-6371b5133cac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRhcmslMjBiYWNrZ3JvdW5kc3xlbnwwfHwwfHx8MA%3D%3D`
  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Dark Overlay for depth */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      <div className="relative z-10 w-full max-w-3xl text-center">
        {/* Animated Heading Section */}
        <div className="mb-12 space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            Incredible <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Expense Management</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light">
            Streamline your finances with precision. Choose your account type to get started.
          </p>
        </div>

        {/* Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6 animate-in fade-in zoom-in-95 duration-1000 delay-300">

          {/* Individual Link */}
          <Link
            href="/auth/signup"
            onClick={()=>localStorage.setItem("user", "individual")}
            className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl transition-all hover:bg-white/20 hover:scale-[1.02] hover:shadow-2xl text-left"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500 text-white shadow-lg group-hover:scale-110 transition-transform">
              <User size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              Individual <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Personal expense tracking, smart budgeting, and individual financial insights.
            </p>
          </Link>

          {/* Organization Link */}
          <Link
            href="/auth/signup"
            onClick={()=> localStorage.setItem("user", "organization")}
            className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl transition-all hover:bg-white/20 hover:scale-[1.02] hover:shadow-2xl text-left"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500 text-white shadow-lg group-hover:scale-110 transition-transform">
              <Building2 size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              Organization <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Multi-user management, corporate tax reporting, and team-wide spending controls.
            </p>
          </Link>

        </div>

        {/* Footer Text */}
        <p className="mt-12 text-gray-400 text-sm animate-pulse">
          Secure • Encrypted • Professional
        </p>
      </div>
    </div>
  );
}