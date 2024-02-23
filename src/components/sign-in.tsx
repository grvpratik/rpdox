"use client";
import React from "react";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { Button } from "@nextui-org/react";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Avatar,
	User,
} from "@nextui-org/react";

const SignInButton = () => {
	const { data: session, status } = useSession();
	return (
		<>
			{!!session ? (
				<Dropdown>
					<DropdownTrigger>
						<Avatar
							name={session.user.name || "guest"}
							size="sm"
							isBordered
							as="button"
							className="transition-transform"
							src={session?.user.image || ""}
						/>
					</DropdownTrigger>
					<DropdownMenu aria-label="Profile Actions" variant="flat">
						<DropdownItem key="profile" className="h-14 gap-2">
							<p className="font-semibold">Signed in as</p>
							<p className="font-semibold">{session?.user.email}</p>
						</DropdownItem>
						<DropdownItem key="dashboard">Dashboard</DropdownItem>
						<DropdownItem key="settings">Settings</DropdownItem>

						<DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
						<DropdownItem
							className="text-red-500"
							key="logout"
							color="danger"
							onClick={() => signOut()}
						>
							Log Out
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			) : (
				<Link href={"/login"}>
					<Button
						isLoading={status === "loading"}
						color="primary"
						spinner={
							<svg
								className="animate-spin h-5 w-5 text-current"
								fill="none"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								/>
								<path
									className="opacity-75"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									fill="currentColor"
								/>
							</svg>
						}
						radius="full"
					>
						{!(status === "loading") && " Sign In"}
					</Button>
				</Link>
			)}{" "}
		</>
	);
};

export default SignInButton;
