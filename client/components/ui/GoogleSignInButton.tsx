// components/GoogleSignInButton.tsx
"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function GoogleSignInButton() {
  const session = useSession();
  const router = useRouter();
  console.log(`session ${session.data?.user?.name}`);
  if (session.status === "authenticated") {
    router.push("/");
  }
  return (
    <>
      <button onClick={() => signIn("google")}>Sign in with Google</button>{" "}
    </>
  );
}
