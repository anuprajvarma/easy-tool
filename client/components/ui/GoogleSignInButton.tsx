// components/GoogleSignInButton.tsx
"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function GoogleSignInButton() {
  const session = useSession();
  const router = useRouter();
  const handleGoogleAuthSubmit = async () => {
    await fetch("http://localhost:5001/api/auth/google-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: session.data?.user?.name,
        email: session.data?.user?.email,
      }),
      // body: new URLSearchParams(formData as Record<string, string>).toString(),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  console.log(`session ${session.data?.user?.name}`);
  if (session.status === "authenticated") {
    handleGoogleAuthSubmit();
    router.push("/");
  }
  return (
    <>
      <button onClick={() => signIn("google")}>Sign in with Google</button>{" "}
    </>
  );
}
