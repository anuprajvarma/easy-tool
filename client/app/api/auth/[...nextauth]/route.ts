// import NextAuth from "next-auth";
// import { authOptions } from "../../../../lib/auth";

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  // callbacks: {
  //   async signIn({ user, account, profile }) {
  //     console.log("SIGN IN:", { user, account, profile });
  //     return true;
  //   },
  //   async redirect({ url, baseUrl }) {
  //     console.log("REDIRECTING TO:", url);
  //     return baseUrl;
  //   },
  // },
});

export { handler as GET, handler as POST };
