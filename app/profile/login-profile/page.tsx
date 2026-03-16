"use client";

import { useProfile } from "@/hooks/useProfile";
import { motion } from "framer-motion";
import { User, Mail, ShieldCheck, Briefcase, Globe, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function InfoCard({ 
  icon, 
  label, 
  value, 
  subValue, 
  className = "" 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value?: string; 
  subValue?: string; 
  className?: string; 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all group hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)]",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-white/10 group-hover:bg-white/20 transition-all flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-slate-400 text-sm uppercase tracking-wider font-medium mb-1">
            {label}
          </p>
          <p className="text-white font-semibold text-lg truncate">{value || "Not set"}</p>
          {subValue && (
            <p className="text-emerald-400 text-xs font-medium mt-1">{subValue}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function LoginProfilePage() {
  const { data: userData, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="text-center">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 shadow-xl mb-4 mx-auto">
            <Loader2 className="h-12 w-12 text-white animate-spin" />
          </div>
          <p className="text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        {/* blur overlay */}
        <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-10"
        >
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 shadow-xl mb-6">
              <User size={48} className="text-white drop-shadow-lg" />
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-2">
              {userData?.name ?? "Unknown User"}
            </h1>

            <p className="text-slate-300 flex items-center gap-2 text-lg mb-4">
              <Briefcase size={20} />
              {userData?.occupation ?? "Not specified"}
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <span className="px-4 py-2 text-sm font-bold rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-500/30">
                {userData?.ownerType === "user" ? "Individual" : "Organization"}
              </span>

              {userData?.isActive && (
                <span className="px-4 py-2 text-sm font-bold rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-500/30">
                  Active Account
                </span>
              )}
            </div>
          </div>

          {/* Profile Info Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <InfoCard
              icon={<Mail size={20} />}
              label="Email"
              value={userData?.email}
              subValue={userData?.isEmailVerified ? "Verified" : "Unverified"}
            />

            <InfoCard
              icon={<Phone size={20} />}
              label="Phone"
              value={userData?.phone}
            />

            <InfoCard
              icon={<Globe size={20} />}
              label="Currency"
              value={userData?.defaultCurrency}
            />

            <InfoCard
              icon={<ShieldCheck size={20} />}
              label="Role"
              value={userData?.role ? userData.role.toUpperCase() : "N/A"}
            />
          </div>

          {/* Edit Button */}
          <Button
            asChild
            size="lg"
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-lg font-bold border-0 shadow-xl h-14"
          >
            <Link href="/profile/edit-profile" className="w-full flex items-center justify-center gap-3">
              <User size={20} />
              Edit Profile
            </Link>
          </Button>
        </motion.div>
      </div>

      <style jsx>{`
        .cn {
          @apply relative z-10 w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-10;
        }
      `}</style>
    </>
  );
}
