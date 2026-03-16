"use client"

import Link from "next/link"

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white dark:bg-zinc-900">

      <div className="p-6 font-bold text-lg">
        EMS
      </div>

      <nav className="flex flex-col gap-2 p-4">

        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/expenses">
          Expenses
        </Link>

        <Link href="/budgets">
          Budgets
        </Link>

        <Link href="/categories">
          Categories
        </Link>

        <Link href="/analytics">
          Analytics
        </Link>

      </nav>

    </aside>
  )
}