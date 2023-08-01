import {BiSolidMoon, BiSolidSun, BiSolidCircle} from 'react-icons/bi';
import {useState} from "react";

const DarkModeSwitcher = () => {
    const [darkMode, setDarkMode] = useState(true);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        const root = window.document.documentElement;
        root.classList.toggle('dark');
    }

    return (
        <button onClick={toggleDarkMode}
                className="flex gap-[1rem] p-[0.25rem] rounded-full
                           bg-background-dark dark:bg-background
                           text-4xl text-text-dark dark:text-text">
            <BiSolidCircle className={
                `absolute transition-transform duration-500 ${darkMode ? 'translate-x-0' : 'translate-x-[3.25rem]'}`
            }/>
            <BiSolidSun/>
            <BiSolidMoon/>
        </button>
    );
}

export default DarkModeSwitcher;