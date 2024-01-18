//app/api/auth/[...nextauth]/options.js
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "../../../../src/utils/data/db";
import User from "../../../../src/models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        console.log("Profile GitHub: ", profile);

        let userRole = "GitHub User";
        if (profile?.email == "admin@admin.com") {
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
        console.log("Profile Google: ", profile);

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
    async jwt({ token, user }) {
      console.log("JWT user: ", user);
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
        } else {
          session.user.userId = null;
        }
      }
      return session;
    },
    // async signIn with new account of google and github
    // async signIn({ user, account, profile }) {
    //   console.log("user", user);
    //   let userData;
    //   await connect();
    //   if (account.provider === "github" || account.provider === "google") {
    //     userData = {
    //       fullName: user.name,
    //       email: user.email,
    //       _id: new mongoose.Types.ObjectId(),
    //       role: account.provider === "github" ? "GitHub User" : "Google User",
    //       avatar_url: user.image,
    //       account_category: "Free",
    //     };
    //     try {
    //       const existingUser = await User.findOne({ email: userData.email });
    //       if (!existingUser) {
    //         await User.create(userData);
    //         return { status: "created", user: userData };
    //       } else {
    //         return { status: "existing_user" };
    //       }
    //     } catch (error) {
    //       console.error(error);
    //       throw new Error("User creation failed");
    //     }
    //   }

    //   return true;
    // },
  },
  pages: {
    signIn: "/auth/signin",
    register: "/auth/signup",
  },
};
