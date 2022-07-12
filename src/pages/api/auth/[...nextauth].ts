import {NextApiRequest, NextApiResponse} from "next";
import NextAuth, {NextAuthOptions} from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
import EmailProvider from "next-auth/providers/email";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ? process.env.GOOGLE_ID : '',
      clientSecret: process.env.GOOGLE_SECRET ? process.env.GOOGLE_SECRET : ''
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID ? process.env.AZURE_AD_CLIENT_ID : '',
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET ? process.env.AZURE_AD_CLIENT_SECRET : '',
      tenantId: process.env.AZURE_AD_TENANT_ID
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASS
        }
      },
      from: process.env.EMAIL_FROM
    })
  ]
}

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);
