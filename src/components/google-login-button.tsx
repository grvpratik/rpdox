"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";

import { useSession } from "next-auth/react";


const GoogleLoginButton = () => {
	
	const {data} = useSession();


	console.log(data)
	 const handleClick = async() => {
			await signIn("google", { target: "_blank" });
		};
	return (
		<Button
			onClick={handleClick}
			className=" font-semibold rounded-full bg-white overflow-hidden my-6"
		>
			<Image src={"/google.svg"} alt="google icon" height={24} width={24} />
			Login with google
		</Button>
	);
};

export default GoogleLoginButton;
