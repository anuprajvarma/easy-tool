"use client";

import { useState } from "react";
import GoogleSignInButton from "@/components/ui/GoogleSignInButton";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ formData });
    const res = await fetch("http://localhost:5001/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // body: JSON.stringify({ formData }),
      body: new URLSearchParams(formData as Record<string, string>).toString(),
    });
    const data = await res.json();
    if (data) {
      console.log("signup");
      router.push("/");
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[60rem] h-screen flex flex-col gap-2  items-center">
        <div className="w-[40rem] h-[40rem] flex flex-col">
          <h1>Signup Page</h1>
          <GoogleSignInButton />
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label>name</label>
            <input
              type="text"
              required
              name="name"
              placeholder="enter your name"
              onChange={handleChange}
            />
            <label>email</label>
            <input
              type="text"
              required
              name="email"
              placeholder="enter your email"
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

export default SignUp;
