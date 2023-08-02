import {useNavigate} from "react-router-dom";
import Button from "../components/Button";

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-[2rem] px-[1rem] text-center">
            <h1 className="text-5xl">404 | Not Found</h1>
            <p className="text-2xl">The page you are looking for does not exist</p>
            <Button onClick={() => navigate(-1)}>
                Go Back
            </Button>
        </div>
    )
}

export default ErrorPage