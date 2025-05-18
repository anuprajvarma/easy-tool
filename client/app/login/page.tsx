"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import GoogleSignInButton from "@/components/ui/GoogleSignInButton";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);
    const res = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include", // ✅ necessary to send/receive cookies
      body: new URLSearchParams({ email }).toString(),
    });
    const data = await res.json();
    if (data?.user && data?.redirectTo) {
      router.push("/");
      // setRedirectTo(data?.redirectTo);
    } else {
      console.log("redirecting error");
    }
  };

  // useEffect(() => {
  //   if (redirectTo) {
  //     console.log("Redirecting to:", redirectTo);
  //     router.push(redirectTo);
  //   } else {
  //     console.log("Redirecting error");
  //   }
  // }, [redirectTo, router]);

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
