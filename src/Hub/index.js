import DarkModeSwitcher from "../components/DarkModeSwitcher";
import {Link} from "react-router-dom";
import {useEffect} from "react";

const GameHubPage = ({games}) => {
    useEffect(() => {
        document.title = "Game Hub";
    }, []);

    const handleImageFallback = (e) => {
        console.log("Image not found");
        e.target.src = "https://placehold.co/600x400";
    }

    return (
        <div className="grow py-[2rem] flex flex-col gap-y-[4rem]">
            <header>
                <div className="flex flex-col md:flex-row justify-center items-center gap-[1.5rem]">
                    <h1 className="text-6xl text-center font-bold">
                        Game Hub
                    </h1>
                    <DarkModeSwitcher/>
                </div>
                <p className="text-xl text-center mt-[1rem]">
                    A collection of browser games that I have made
                </p>
            </header>

            <main className="flex flex-wrap justify-center gap-[2rem]">
                {games.map((game) => (
                    <Link key={game.path} to={game.path} className="w-[20rem] h-[20rem] group">
                        <div className="relative w-full h-full">
                            <img src={game.image} alt={game.name} onError={handleImageFallback}
                                 className="absolute w-full h-full group-hover:blur-sm"/>

                            <div className="absolute w-full h-full bg-black/50 hidden
                                            group-hover:flex items-center justify-center
                                            text-text-dark text-3xl">
                                <p>{game.name}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </main>
        </div>
    );
}

export default GameHubPage;