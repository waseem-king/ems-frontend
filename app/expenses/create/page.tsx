"use client"

import { useForm } from "react-hook-form"
import axios from "axios"

export default function CreateExpensePage(){

 const { register, handleSubmit } = useForm()

 const onSubmit = async (data:any)=>{
  await axios.post("/expenses", data)
 }

 return(
  <form onSubmit={handleSubmit(onSubmit)}>

  <input
   placeholder="Title"
   {...register("title")}
  />

  <input
   type="number"
   placeholder="Amount"
   {...register("amount")}
  />

  <input
   placeholder="Currency"
   {...register("currency")}
  />

  <textarea
   placeholder="Note"
   {...register("note")}
  />

  <button type="submit">
   Create Expense
  </button>

  </form>
 )
}