import { DefaultSession, NextAuthOptions, getServerSession } from 'next-auth';
import { prisma } from './db';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
// import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      credits: number;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    credits: number;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token }) => {
      const db_user = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });
      if (db_user) {
        token.id = db_user.id;
        token.credits = db_user.credits;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.credits = token.credits;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // CredentialsProvider({
    //   name: 'Credentials',
    //   credentials: {
    //     username: { label: 'Username', type: 'text', placeholder: 'test_user' },
    //     password: {
    //       label: 'Password',
    //       type: 'password',
    //       placeholder: 'test_user_password',
    //     },
    //   },
    //   async authorize(credentials, req) {
    //     // const res = await fetch(
    //     //   `${process.env.NEXTAUTH_URL}/api/auth/credentials/`,
    //     //   {
    //     //     method: 'POST',
    //     //     body: JSON.stringify(credentials),
    //     //     headers: { 'Content-Type': 'application/json' },
    //     //   },
    //     // );
    //     // const user = await res.json();
    //     const user = {
    //       id: '1000',
    //       name: 'Demo User',
    //       image: 'https://etibd.org/wp-content/uploads/2023/01/team.png',
    //       credits: 10,
    //     };

    //     // If no error and we have user data, return it
    //     // if (res.ok && user) {
    //     return user;
    //     // }
    //     // Return null if user data could not be retrieved
    //     // return null;
    //   },
    // }),
  ],
};

export const getAuthSession = () => {
  return getServerSession(authOptions);
};
