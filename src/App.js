import {useEffect} from "react";
import GameHubPage from "./Hub";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ErrorPage from "./Error";
import Footer from "./components/Footer";
import MemoryGamePage from "./Games/MemoryGame";
import RockPaperScissorsPage from "./Games/RPS";
import MemoryImage from "./assets/images/memory-game.png";

function App() {
    useEffect(() => {
        document.title = "Game Hub"
    }, []);

    const games = [
        {name: "Memory Game", path: "/memory", image: MemoryImage, component: MemoryGamePage},
        {name: "Rock Paper Scissors", path: "/rps", image: MemoryImage, component: RockPaperScissorsPage},
    ];

    return (
        <div className="m-0 min-h-screen flex flex-col
                        bg-background dark:bg-background-dark text-text dark:text-text-dark
                        transition-colors duration-500">
            <BrowserRouter basename="/web-games">
                <Routes>
                    <Route path="/" element={<GameHubPage games={games}/>}/>
                    {games.map((game) => (
                        <Route key={game.name} path={game.path} element={<game.component/>}/>
                    ))}
                    <Route path="*" element={<ErrorPage/>}/>
                </Routes>
            </BrowserRouter>

            <Footer/>
        </div>
    );
}

export default App;
