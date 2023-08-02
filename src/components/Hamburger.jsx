import {BiMenu, BiSolidHome} from "react-icons/bi";
import {NavLink} from "react-router-dom";
import DarkModeSwitcher from "./DarkModeSwitcher";
import {useState} from "react";
import OutsideDetector from "./OutsideDetector";

const Hamburger = () => {
    const [open, setOpen] = useState(false);

    const handleOutsideClick = () => {
            setOpen(false);
    }

    return (
        <div className="lg:hidden">
            <div onClick={() => setOpen(!open)} className="fixed text-5xl p-[0.5rem]">
                <BiMenu/>
            </div>
            <OutsideDetector handleOutsideClick={handleOutsideClick}>
                <div className={`fixed z-10 flex flex-col gap-[1rem] text-5xl p-[0.5rem] bg-accent h-full
                                 transition-transform origin-left duration-300 -translate-x-[9rem] ${open && "translate-x-[0rem]"}`}>
                    <div onClick={() => setOpen(!open)}>
                        <BiMenu/>
                    </div>
                    <div className="flex flex-col items-center h-full">
                        <NavLink to="/" className="flex items-center gap-[0.5rem]">
                            <BiSolidHome/> <p className="text-2xl font-bold">Home</p>
                        </NavLink>
                        <div className="mt-auto">
                            <DarkModeSwitcher/>
                        </div>
                    </div>
                </div>
            </OutsideDetector>
        </div>
    );
}

export default Hamburger;