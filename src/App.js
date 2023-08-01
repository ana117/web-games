import {useEffect} from "react";
import GameHubPage from "./Hub";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    useEffect(() => {
        document.title = "Game Hub"
    }, []);

    return (
        <div className="m-0 bg-background dark:bg-background-dark text-text dark:text-text-dark
                    transition-colors duration-500">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<GameHubPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
