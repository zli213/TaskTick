//app/api/auth/[...nextauth]/options.js
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "../../../../src/utils/data/db";
import User from "../../../../src/models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { cookies } from "next/headers";

export const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        let userRole = "GitHub User";
        if (profile?.email === "admin@admin.com") {
          userRole = "admin";
        }

        return {
          ...profile,
          role: userRole,
          id: profile.id.toString(),
        };
      },
      clientId: process.env.GITHUB_ID, // Stored in .env.local, please check the README.md for details. you need to create one in your env but not advisable to commit it to your repo.
      clientSecret: process.env.GITHUB_Secret, // Same as above
    }),
    GoogleProvider({
      profile(profile) {
        let userRole = "Google User";
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID, // Stored in .env.local, please check the README.md for details. you need to create one in your env but not advisable to commit it to your repo.
      clientSecret: process.env.GOOGLE_Secret, // Same as above
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        try {
          await connect();
          const foundUser = await User.findOne({ email: credentials.email })
            .lean()
            .exec();

          if (foundUser) {
            console.log("User Exists");
            const match = await bcrypt.compare(
              credentials.password,
              foundUser.password
            );

            if (match) {
              console.log("Good Pass");
              delete foundUser.password;

              foundUser["role"] = "Email user";
              const userTheme = foundUser.themes[0];
              cookies().set("themeName", userTheme);
              return foundUser;
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    // async signIn with new account of google and github
    async signIn({ user, account, profile }) {
      let userData;
      console.log("User: ", user);
      await connect();
      if (account.provider === "github" || account.provider === "google") {
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            userData = {
              fullName: user.name,
              email: user.email,
              _id: new mongoose.Types.ObjectId(),
              role:
                account.provider === "github" ? "GitHub User" : "Google User",
              avatar_url:
                account.provider === "github" ? user.avatar_url : user.picture,
              account_category: "Free",
            };
            await User.create(userData);
            user.accountStatus = "created";
          } else if (existingUser.role !== user.role) {
            // if user exists but role is different, notify user to use the other provider
            user.accountStatus = "existing_user_different_provider";
          } else {
            user.accountStatus = "existing_user";
          }
          const userTheme = existingUser.themes[0];
          cookies().set("themeName", userTheme);

        } catch (error) {
          user.accountStatus = "error";
          throw new Error("User creation failed");
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        if (user.role === "GitHub User") {
          token.avatar_url = user.avatar_url;
          token.name = user.name;
        } else if (user.role === "Google User") {
          token.avatar_url = user.picture;
          token.name = user.name;
        } else {
          token.avatar_url = null;
        }
        token.accountStatus = user.accountStatus;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.avatar_url = token.avatar_url;
        session.user.name = token.name;

        await connect();
        const user = await User.find({ email: session.user.email });
        if (user[0]) {
          session.user.userId = user[0]._id.toString();
          session.user.username = user[0].username;
          // session.user.theme = user[0].themes[0];
        } else {
          session.user.userId = null;
        }
        session.user.accountStatus = token.accountStatus;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
    register: "/auth/signup",
  },
};
