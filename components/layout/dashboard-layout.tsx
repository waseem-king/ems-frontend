"use client"

import Sidebar from "./sidebar"
import Navbar from "./navbar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-muted/40">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex flex-col flex-1">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>

      </div>

    </div>
  )
}