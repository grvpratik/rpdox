import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import "@/styles/globals.css";
import { NextUIProviders } from "@/providers/next-ui";
import { AuthProvider } from "@/providers/next-auth";

const rethink = Rethink_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={rethink.className}>
				<AuthProvider>
					<NextUIProviders>{children}</NextUIProviders>
				</AuthProvider>
			</body>
		</html>
	);
}
