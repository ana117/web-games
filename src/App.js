import GameHubPage from "./Hub";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ErrorPage from "./Error";
import Footer from "./components/Footer";
import MemoryGamePage from "./Games/MemoryGame";
import RockPaperScissorsPage from "./Games/RPS";
import KoreanFlashcardsPage from "./Games/KoreanFlashcards";
import {MemoryImage, RPSImage, KoreanFlashcardsImage} from "./assets/images";
import JumpingBirdPage from "./Games/JumpingBird";

function App() {
    const games = [
        {
            name: "Memory Game",
            path: "/memory",
            image: MemoryImage,
            component: MemoryGamePage},
        {
            name: "Rock Paper Scissors",
            path: "/rps",
            image: RPSImage,
            component: RockPaperScissorsPage
        },
        {
            name: "Korean Flashcards",
            path: "/korean-flashcards",
            image: KoreanFlashcardsImage,
            component: KoreanFlashcardsPage
        },
        {
            name: "Jumping Bird",
            path: "/jumping-bird",
            image: "https://placehold.co/600x400",
            component: JumpingBirdPage
        }
    ];

    return (
        <div className="m-0 min-h-screen flex flex-col
                        theme dark:theme-dark
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
