"use client";

import Image from "next/image";
import DarkModeToggler from "./dark-mode-toggler";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
	const title = usePathname()
    .split("/")
    .filter(Boolean)
    .pop()
    ?.split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

	return (
		<header>
			<div className="grid grid-cols-6 place-items-center">
				<Link href="/">
					<Image src="/web-games/images/logo.svg" alt="Logo" width={64} height={64} className="w-8 h-8 sm:w-16 sm:h-16 p-1 rounded-full hover:bg-foreground hover:scale-105 duration-500" />
				</Link>
				<p className="text-2xl lg:text-5xl text-center font-bold col-span-4">
					{title ?? "Web Games"}
				</p>
				<div className="flex justify-end">
					<DarkModeToggler />
				</div>
			</div>
		</header>
	);
}
