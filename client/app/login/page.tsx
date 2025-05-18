"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import GoogleSignInButton from "@/components/ui/GoogleSignInButton";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include", // ✅ necessary to send/receive cookies
      body: new URLSearchParams(formData as Record<string, string>).toString(),
    });
    const data = await res.json();
    if (data.success) {
      router.push(data.redirectTo);
    } else {
      console.log("redirecting error");
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[60rem] h-screen flex flex-col gap-2  items-center ">
        <div className="w-[40rem] h-[40rem] flex flex-col py-8">
          <div className="flex justify-between">
            <h1>Login Page</h1>
            <GoogleSignInButton />
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label>email</label>
            <input
              type="text"
              required
              name="email"
              placeholder="enter your email"
              onChange={handleChange}
            />
            <label>password</label>
            <input
              type="text"
              required
              name="password"
              placeholder="enter your password"
              onChange={handleChange}
            />
            <button className="cursor-pointer" type="submit">
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
