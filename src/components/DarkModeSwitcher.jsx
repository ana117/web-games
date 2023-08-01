import {BiSolidMoon, BiSolidSun, BiSolidCircle} from 'react-icons/bi';
import {useEffect, useState} from "react";

const DarkModeSwitcher = () => {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const isUsingDarkMode = JSON.parse(localStorage.getItem('darkMode'));
        if (isUsingDarkMode === null) {
            localStorage.setItem('darkMode', JSON.stringify(true));
        } else {
            enableDarkMode(isUsingDarkMode);
        }
    }, [])

    const enableDarkMode = (enable) => {
        setDarkMode(enable);
        localStorage.setItem('darkMode', JSON.stringify(enable));

        const root = window.document.documentElement;
        if (enable) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }

    return (
        <button onClick={() => {enableDarkMode(!darkMode)}} aria-label="Toggle Dark Mode"
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