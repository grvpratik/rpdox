import { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connect } from "@/utils/connect";
import User from "@/database/models/user.model";

export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],

	callbacks: {
		async signIn({ account, profile, user }: any) {
			try {
				console.log("before connection ");
				await connect();
				// console.log(profile, "profile");
				// console.log(account);
				// console.log(user)

				// Check if user already exists
				const userExists = await User.findOne({ email: profile.email });

				// If not, create a new document and save user in MongoDB
				if (!userExists) {
					await User.create({
						email: profile.email,
						username: profile.name.replace(" ", "").toLowerCase(),
						image: profile.picture,
						role: profile.role,
					});
				}

				return true;
			} catch (error: any) {
				console.error("Error checking if user exists:", error?.message);
				return false;
			}
		},
		async jwt({ token, user }) {
			console.log({ ...token, ...user }, "jwt");
			// Merge token and user data
			return { ...token, ...user };
		},
		async session({ session, user }) {
			try {
				await connect();
				// Retrieve user id from MongoDB and add it to session
				const sessionUser = await User.findOne({
					email: session.user.email,
				});
				if (sessionUser) {
					session.user.id = sessionUser._id.toString();
					session.user.role = sessionUser.role;
				} else {
					// User not found in the database, invalidate session
					throw new Error("User not found in database.");
				}
				return session;
			} catch (error: any) {
				console.error("Error retrieving user session:", error?.message);
				return session;
			}
		},
	},

	// Use a strong and unique secret for session encryption
	secret: process.env.NEXTAUTH_SECRET,

	// Customize sign-in page URL
	pages: {
		signIn: "/login",
	},
};

// export async function loginIsRequiredServer() {
// 	const session = await getServerSession(authOptions);
// 	if (!session) return redirect("/");
// }

// export function loginIsRequiredClient() {
// 	if (typeof window !== "undefined") {
// 		const session = useSession();
// 		const router = useRouter();
// 		if (!session) router.push("/");
// 	}
// }
