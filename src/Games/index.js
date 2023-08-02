import {NavLink} from "react-router-dom";
import DarkModeSwitcher from "../components/DarkModeSwitcher";

const GamePage = ({children, game}) => {
    return (
        <div className="grow">
            <nav className="p-[1rem] flex items-center gap-[2rem] w-full
                            text-3xl font-bold">
                <div className="me-auto hover:underline underline-offset-2">
                    <NavLink to="/">Home</NavLink>
                </div>
                <h1 className="mx-auto">{game}</h1>
                <div className="ms-auto">
                    <DarkModeSwitcher/>
                </div>
            </nav>

            <div className="flex justify-center mt-[1rem]">
                {children}
            </div>
        </div>
    )
}

export default GamePage