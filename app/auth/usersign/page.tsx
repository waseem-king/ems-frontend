"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { signupSchema, SignupInput } from "@/types/auth"
import { useSignup } from "@/hooks/useSignup"

export default function SignupPage() {

  const { mutate, isPending } = useSignup()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema)
  })

  const ownerType = watch("ownerType")

  const onSubmit = (data: SignupInput) => {

    mutate(data, {
      onSuccess: (res) => {
        console.log("Signup success", res)
      },
      onError: (err) => {
        console.log("Signup error", err)
      }
    })

  }

  return (

    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[420px] p-6 border rounded-xl space-y-4"
      >

        <h2 className="text-2xl font-bold text-center">
          Create Account
        </h2>

        {/* Name */}

        <input
          {...register("name")}
          placeholder="Full Name"
          className="w-full border p-2 rounded"
        />

        <p className="text-red-500 text-sm">
          {errors.name?.message}
        </p>

        {/* Email */}

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />

        <p className="text-red-500 text-sm">
          {errors.email?.message}
        </p>

        {/* Password */}

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
        />

        <p className="text-red-500 text-sm">
          {errors.password?.message}
        </p>

        {/* Account Type */}

        <select
          {...register("ownerType")}
          className="w-full border p-2 rounded"
        >

          <option value="user">Individual User</option>

          <option value="organization">
            Organization
          </option>

        </select>

        {/* Organization Role */}

        {ownerType === "organization" && (

          <select
            {...register("role")}
            className="w-full border p-2 rounded"
          >

            <option value="ceo">CEO</option>
            <option value="hr">HR</option>
            <option value="captain">Captain</option>
            <option value="senior">Senior</option>
            <option value="junior">Junior</option>

          </select>

        )}

        {/* Phone */}

        <input
          {...register("phone")}
          placeholder="Phone"
          className="w-full border p-2 rounded"
        />

        {/* Occupation */}

        <input
          {...register("occupation")}
          placeholder="Occupation"
          className="w-full border p-2 rounded"
        />

        <button
          disabled={isPending}
          className="w-full bg-black text-white p-2 rounded"
        >

          {isPending ? "Creating Account..." : "Sign Up"}

        </button>

      </form>

    </div>

  )
}