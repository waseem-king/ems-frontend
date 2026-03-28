"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ExpenseCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Expenses</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-2xl font-bold">PKR 18,200</p>
      </CardContent>
    </Card>
  )
}