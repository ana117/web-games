import Image from "next/image";
import DarkModeToggler from "./dark-mode-toggler";
import Link from "next/link";

export default function Navbar({ title }: Readonly<{ title?: string }>) {
	return (
		<header>
			<div className="grid grid-cols-6 place-items-center">
				<Link href="/">
					<Image src="/images/logo.svg" alt="Logo" width={64} height={64} className="w-8 h-8 sm:w-16 sm:h-16" />
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
