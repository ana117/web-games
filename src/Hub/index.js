import DarkModeSwitcher from "../components/DarkModeSwitcher";

const GameHubPage = () => {
    const games = ["Game 1", "Game 2", "Game 3", "Game 4", "Game 5", "Game 6", "Game 7", "Game 8", "Game 9", "Game 10"];

    return (
        <div className="min-h-screen py-[2rem] flex flex-col gap-y-[4rem]">
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
                    <a key={game} href="/" className="w-[20rem] h-[20rem] group">
                        <div className="relative w-full h-full">
                            <img src="https://via.placeholder.com/250" alt={game}
                                 className="absolute w-full h-full group-hover:blur-sm"/>

                            <div className="absolute w-full h-full bg-black/50 hidden
                                            group-hover:flex items-center justify-center
                                            text-text-dark text-3xl">
                                <p>{game}</p>
                            </div>
                        </div>
                    </a>
                ))}
            </main>
        </div>
    );
}

export default GameHubPage;