import { signOut } from "../app/auth";

export default function SignOutPage() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit" className="cursor-pointer">
        SignOut
      </button>
    </form>
  );
}
