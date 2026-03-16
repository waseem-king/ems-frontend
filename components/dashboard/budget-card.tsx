"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BudgetCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Budget</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-2xl font-bold">PKR 50,000</p>
      </CardContent>
    </Card>
  )
}