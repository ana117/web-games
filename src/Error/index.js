import {useNavigate} from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-[2rem] px-[1rem] text-center">
            <h1 className="text-5xl">404 | Not Found</h1>
            <p className="text-2xl">The page you are looking for does not exist</p>
            <button onClick={() => navigate("/")}
                    className="px-4 py-2 rounded-xl
                               bg-background-dark dark:bg-background
                               text-text-dark dark:text-text text-xl font-bold
                               hover:bg-accent hover:dark:bg-accent-dark">
                Go Home
            </button>
        </div>
    )
}

export default ErrorPage