import CategoryChart from "@/components/charts/category-chart"
import ExpenseChart from "@/components/charts/expense-chart"
import BudgetCard from "@/components/dashboard/budget-card"
import ExpenseCard from "@/components/dashboard/expense-card"
import DashboardLayout from "@/components/layout/dashboard-layout"


export default function DashboardPahe() {
    return (
        <DashboardLayout>
            <div className="grid gap-6">
                {/* summary cards */}
                <div className="grid md:grid-cols-4 gap-4">
                    <BudgetCard />
                    <ExpenseCard />
                </div>

                {/* charts */}
                <div className="grid md:grid-cols-2 gap-6">
                    <ExpenseChart />
                    <CategoryChart />
                </div>
            </div>
        </DashboardLayout>
    )
}