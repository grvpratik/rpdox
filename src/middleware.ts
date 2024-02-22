import { withAuth } from "next-auth/middleware";

export default withAuth({
	callbacks: {
		authorized: async ({ req, token }) => {
			if (req.nextUrl.pathname.startsWith("/dashboard"))
				return token?.role === "verified";
			return !!token;
		},
	},
});
export const config = { matcher: ["/dashboard:path*", "/profile"] };
