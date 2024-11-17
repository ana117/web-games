import { useState } from "react";
import { BiSolidCircle, BiSolidSun, BiSolidMoon } from "react-icons/bi";

export default function DarkModeToggler() {
	const [darkMode, setDarkMode] = useState(true);

	const toggleDarkMode = () => {
		setDarkMode((prev) => !prev);

		localStorage.setItem("darkMode", JSON.stringify(!darkMode));
		document.documentElement.classList.toggle("dark");
	};

	return (
		<button onClick={toggleDarkMode} className="flex gap-4 p-1 rounded-full sm:text-4xl bg-foreground dark:bg-foreground text-background">
			<BiSolidCircle className={`absolute transition-transform duration-500 ${darkMode ? 'translate-x-0' : 'translate-x-[2rem] sm:translate-x-[3.25rem]'}`}/>
			<BiSolidSun/>
			<BiSolidMoon/>
		</button>
	)
}