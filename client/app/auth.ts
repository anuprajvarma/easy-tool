import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Always redirect to your dashboard after sign in
      return "/";
    },
  },
});
