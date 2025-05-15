"use client";

import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:5001/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData as Record<string, string>).toString(),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[60rem] h-screen flex flex-col gap-2  items-center">
        <div className="w-[40rem] h-[40rem] flex flex-col">
          <h1>Signup Page</h1>
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

export default SignUp;
