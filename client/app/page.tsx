import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import SignOutPage from "@/components/sing-out";

export default async function Home() {
  const session = await auth();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {!session ? (
        redirect("/signin")
      ) : (
        <>
          <h1>
            Welcome, {session.user?.name || "User"}!__
            {session.user?.email || "User"}
          </h1>
          <div>
            <SignOutPage></SignOutPage>
          </div>
        </>
      )}
    </div>
  );
}
