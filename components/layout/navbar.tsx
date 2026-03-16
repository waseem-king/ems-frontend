"use client"

import { ThemeToggle } from "@/components/layout/theme-toggle";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="h-16 border-b flex items-center justify-between px-6">

      <h1 className="font-semibold text-lg">
        Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
      <div>
        <Link href={"/profile"}>Profile</Link>
      </div>

    </header>
  )
}