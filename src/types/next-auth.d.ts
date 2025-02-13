import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      password?: string;
      image?: string;
      role?: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    image?: string;
    role: string;
  }

  interface JWT {
    id: string;
    role?: string;
  }
}
