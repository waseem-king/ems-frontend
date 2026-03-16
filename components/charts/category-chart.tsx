"use client"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Food", value: 12000 },
  { name: "Transport", value: 8000 },
  { name: "Shopping", value: 5000 },
  { name: "Bills", value: 7000 }
]

const COLORS = ["#6366f1", "#22c55e", "#f97316", "#ef4444"]

export default function CategoryChart() {

  return (
    <Card>

      <CardHeader>
        <CardTitle>Expense by Category</CardTitle>
      </CardHeader>

      <CardContent className="h-[300px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >

              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </CardContent>

    </Card>
  )
}