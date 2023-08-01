import {useEffect} from "react";
import GameHubPage from "./Hub";
import {HashRouter, Route, Routes} from "react-router-dom";
import ErrorPage from "./Error";

function App() {
    useEffect(() => {
        document.title = "Game Hub"
    }, []);

    return (
        <div className="m-0 bg-background dark:bg-background-dark text-text dark:text-text-dark
                    transition-colors duration-500">
            <HashRouter>
                <Routes>
                    <Route path="/" element={<GameHubPage/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
