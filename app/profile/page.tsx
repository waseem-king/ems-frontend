"use client";

import { useProfile } from "@/hooks/useProfile";
import { motion } from "framer-motion";
import { User, Mail, ShieldCheck, Briefcase, Globe, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const { data: profileResponse, isLoading, isError } = useProfile();
  const userData = profileResponse?.data;
  const router = useRouter();
  const [userType, setUserType] = useState<string | null >("individual")


  // get user type from localstorage 
  useEffect(()=>{
    const storedUserType = localStorage.getItem("user")
    setUserType(storedUserType)
  })

  // userData = profileResponse.data (User type)

  const imageUrl = "https://plus.unsplash.com/premium_photo-1679339460933-f16fdb43df74?w=500&auto=format&fit=crop&q=60";

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-indigo-500 rounded-full"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-400">
        Error loading profile
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 py-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* blur overlay */}
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] p-10"
      >
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 shadow-xl mb-4">
            <User size={36} className="text-white" />
          </div>

          <h1 className="text-3xl font-bold text-white">
            {userData?.name ?? "Unknown User"}
          </h1>

          <p className="text-slate-400 mt-1 flex items-center gap-2">
            <Briefcase size={16} />
            {userData?.occupation ?? "Software Developer"}
          </p>

          <div className="flex gap-2 mt-4">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {userData?.ownerType === "user" ? "Individual" : "Organization"}
            </span>

            {userData?.isActive && (
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Active
              </span>
            )}
          </div>
        </div>

        {/* Profile Info Grid */}
        <div className="grid md:grid-cols-2 gap-6">

          <InfoCard
            icon={<Mail size={18} />}
            label="Email"
            value={userData?.email}
            subValue={userData?.isEmailVerified ? "Verified" : "Unverified"}
          />

          <InfoCard
            icon={<Phone size={18} />}
            label="Phone"
            value={userData?.phone}
          />

          <InfoCard
            icon={<Globe size={18} />}
            label="Currency"
            value={userData?.defaultCurrency}
          />

          <InfoCard
            icon={<ShieldCheck size={18} />}
            label="Role"
            value={userData?.role}
            className="uppercase ...other classes"
          />

        </div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full mt-10 py-4 rounded-2xl font-bold text-slate-200 
             bg-gradient-to-r from-slate-900 to-slate-800 
             hover:from-slate-800 hover:to-slate-700 
             border border-white/10
             shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
        onClick={()=> router.push("/profile/edit")}
        >
          Edit Profile
        </motion.button>

      </motion.div>
    </div>
  );
}

function InfoCard({ icon, label, value, subValue }: any) {
  return (
    <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition">
      <div className="flex items-center gap-2 text-slate-400 mb-2">
        {icon}
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>

      <p className="text-white font-semibold">{value ?? "N/A"}</p>

      {subValue && (
        <span
          className={`text-[10px] font-bold mt-1 inline-block px-2 py-0.5 rounded ${subValue === "Verified"
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-amber-500/20 text-amber-400"
            }`}
        >
          {subValue}
        </span>
      )}
    </div>
  );
}

