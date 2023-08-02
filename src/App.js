import {useEffect} from "react";
import GameHubPage from "./Hub";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ErrorPage from "./Error";
import Footer from "./components/Footer";
import MemoryGamePage from "./Games/MemoryGame";

function App() {
    useEffect(() => {
        document.title = "Game Hub"
    }, []);

    return (
        <div className="m-0 min-h-screen flex flex-col
                        bg-background dark:bg-background-dark text-text dark:text-text-dark
                        transition-colors duration-500">
            <BrowserRouter basename="/web-games">
                <Routes>
                    <Route path="/" element={<GameHubPage/>}/>
                    <Route path="/memory" element={<MemoryGamePage/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Routes>
            </BrowserRouter>

            <Footer/>
        </div>
    );
}

export default App;
