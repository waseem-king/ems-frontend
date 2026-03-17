"use client";

import { useProfile } from "@/hooks/useProfile";
import { updateProfile } from "@/services/api/profile-api";
import { useRouter } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Phone, Briefcase, Mail, Save, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { User as UserType } from "@/types/user";
import { toast } from "sonner"; // assuming sonner is installed, or use native alert

function EditProfilePage() {
  const router = useRouter();
  const { data: user, isLoading, refetch } = useProfile();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<Partial<UserType>>({});
   const [userType, setUserType] = useState<string | null >("individual")
  
  
    // get user type from localstorage 
    useEffect(()=>{
      const storedUserType = localStorage.getItem("user")
      setUserType(storedUserType)
    })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await updateProfile(formData);
        await refetch();
        toast.success("Profile updated successfully!");
        router.push("/profile/login-profile");
      } catch (error) {
        toast.error("Failed to update profile. Please try again.");
      }
    });
  };

  const handleCancel = () => {
    router.push("/profile/edit");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  const imageUrl = "https://images.unsplash.com/photo-1664044097232-bbff7bf21e10?w=500&auto=format&fit=crop&q=60";


  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 py-10 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Edit Profile</h1>
            <p className="text-slate-400">Update your personal information</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name || user?.data?.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone || user?.data?.phone || ""}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Occupation</label>
            <input
              type="text"
                value={formData.occupation || user?.data?.occupation || ""}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Your occupation"
            />
          </div>

          {userType === "organization" && (
            <div className="space-y-6 pt-6 border-t border-white/10">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Employee Email</label>
                <input
                  type="email"
                value={formData.employeeEmail || user?.data?.employeeEmail || ""}
                  onChange={(e) => setFormData({ ...formData, employeeEmail: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="employee@company.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
                  <select
                    value={formData.role || ""}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select role</option>
                    <option value="ceo">CEO</option>
                    <option value="hr">HR</option>
                    <option value="captain">Captain</option>
                    <option value="senior">Senior</option>
                    <option value="junior">Junior</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">About</label>
                  <textarea
                    rows={4}
                    value={formData.about || ""}
                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-vertical"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel} className="flex-1">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default EditProfilePage;

