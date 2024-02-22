import React from "react";
import { getServerSession } from "next-auth";

import GoogleLoginButton from "@/components/google-login-button";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
	const session = await getServerSession(authOptions);
	if (session) return redirect("/");
	console.log(session);
	
	return (
		<main className="w-full h-screen flex items-center justify-center">
			<section className="flex flex-col gap-4 items-center">
				{/* <div>logo</div>
				<div>login to temp</div> */}
				<GoogleLoginButton />
			</section>
		</main>
	);
};

export default LoginPage;
