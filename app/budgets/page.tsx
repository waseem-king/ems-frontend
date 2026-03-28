"use client"

import { useForm } from "react-hook-form"
import axios from "axios"

export default function BudgetPage() {

 const { register, handleSubmit } = useForm()

 const onSubmit = async (data:any) => {
   await axios.post("/budgets", data)
 }

 return (
  <form onSubmit={handleSubmit(onSubmit)}>

   <input
    placeholder="Budget Name"
    {...register("name")}
   />

   <input
    type="number"
    placeholder="Amount"
    {...register("amount")}
   />

   <input
    type="number"
    placeholder="Month"
    {...register("month")}
   />

   <input
    type="number"
    placeholder="Year"
    {...register("year")}
   />

   <button type="submit">
     Create Budget
   </button>

  </form>
 )
}