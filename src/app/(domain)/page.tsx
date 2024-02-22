'use client'
import React from "react";
import { useSession } from "next-auth/react";

import { Button } from "@nextui-org/react";

const RootPage = () => {

	const { data } = useSession();
	console.log(data)
	return (
		<div className="p-4 md:px-16 md:pt-6 flex justify-between">
			<div className=" font-bold text-lg">TEMP</div>
			<Button color="secondary" radius="full">Sign In</Button>
		</div>
	);
};

export default RootPage;
