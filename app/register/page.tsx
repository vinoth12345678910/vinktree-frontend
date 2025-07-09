"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"

const Register = () => {

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = formData.get("username") as string // ✅ Correct key
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    fetch(`${backendUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Registration successful! You can now log in.")
          // Redirect to login page
          window.location.href = "/login"
        } else {
          response.json().then((data) => {
            alert(`Registration failed: ${data.message || "Unknown error"}`)
          })
        }
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="flex flex-col items-center gap-2 pb-2">
          <Image src="/next.svg" alt="Logo" width={48} height={48} className="dark:invert mb-2" />
          <CardTitle className="text-2xl font-bold text-center">Create your account</CardTitle>
          <CardDescription className="text-center text-gray-500">
            Enter your details to sign up for Vinktree
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username" // ✅ Required for FormData
                type="text"
                placeholder="JohnDoe"
                required
                className="focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email" // ✅ Required for FormData
                type="email"
                placeholder="m@example.com"
                required
                className="focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password" // ✅ Required for FormData
                type="password"
                required
                className="focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-2 rounded-lg shadow">
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2 pt-2">
          <span className="text-sm text-gray-500">Already have an account?</span>
          <Link href="/login" className="text-blue-600 hover:underline font-semibold">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Register
