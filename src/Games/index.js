import {NavLink} from "react-router-dom";
import DarkModeSwitcher from "../components/DarkModeSwitcher";
import Hamburger from "../components/Hamburger";

const GamePage = ({children, game}) => {
    return (
        <div className="grow">
            <nav className="w-full">
                <div className="hidden md:flex items-center gap-[2rem] text-3xl font-bold p-[1rem]">
                    <div className="me-auto hover:underline underline-offset-2">
                        <NavLink to="/">Home</NavLink>
                    </div>
                    <h1 className="mx-auto">{game}</h1>
                    <div className="ms-auto">
                        <DarkModeSwitcher/>
                    </div>
                </div>

                <Hamburger/>
            </nav>

            <div className="flex justify-center mt-[1rem]">
                {children}
            </div>
        </div>
    );
}

export default GamePage