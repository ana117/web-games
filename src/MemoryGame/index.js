import {
    BiSolidBook,
    BiSolidBot,
    BiSolidCastle,
    BiSolidCat,
    BiSolidDizzy,
    BiSolidGhost,
    BiSolidHardHat,
    BiSolidMask,
    BiSolidCog
} from "react-icons/bi";
import {useEffect, useState} from "react";
import Tile from "./Tile";
import DarkModeSwitcher from "../components/DarkModeSwitcher";
import Button from "../components/Button";


const ICONS = [
    {icon: <BiSolidBook/>, name: "Book"},
    {icon: <BiSolidBot/>, name: "Bot"},
    {icon: <BiSolidCastle/>, name: "Castle"},
    {icon: <BiSolidCat/>, name: "Cat"},
    {icon: <BiSolidDizzy/>, name: "Dizzy"},
    {icon: <BiSolidGhost/>, name: "Ghost"},
    {icon: <BiSolidHardHat/>, name: "Hard Hat"},
    {icon: <BiSolidMask/>, name: "Mask"},
];

const MemoryGamePage = () => {
    const [tiles, setTiles] = useState([]);
    const [turnCounter, setTurnCounter] = useState(0);
    const [choices, setChoices] = useState([null, null]);
    const [disableClick, setDisableClick] = useState(false);
    const [tileLeft, setTileLeft] = useState(-1);
    const [highScore, setHighScore] = useState(0);

    const handleFlip = (id) => {
        setTurnCounter(turnCounter + 1);
        if (choices[0] === null) {
            setChoices([tiles[id], null]);
        } else {
            setChoices([choices[0], tiles[id]]);
        }
    }

    const shuffleTiles = (array) => {
        return [...array, ...array]
            .sort(() => Math.random() - 0.5)
            .map((item, index) => ({...item, id: index, matched: false}));
    }

    const resetGame = () => {
        setChoices([null, null]);
        setDisableClick(false);
        setTurnCounter(0);
        setTileLeft(ICONS.length);
        setTiles([]);
        setTimeout(() => {
            setTiles(shuffleTiles(ICONS));
        }, 500);
    }

    const resetSelection = () => {
        setChoices([null, null]);
        setDisableClick(false);
    }

    const tileMatched = () => {
        setTileLeft(tileLeft - 1);
        setTiles(tiles.map((tile) => {
            if (tile.name === choices[0].name) {
                return {...tile, matched: true}
            } else {
                return tile;
            }
        }));
    }

    useEffect(() => {
        const localHighScore = JSON.parse(localStorage.getItem("memoryGameHighScore"));
        if (localHighScore) {
            setHighScore(localHighScore);
        }

        resetGame();
    }, []);

    useEffect(() => {
        if (choices[0] && choices[1]) {
            setDisableClick(true);
            if (choices[0].name === choices[1].name) {
                tileMatched();
            }
            setTimeout(() => {
                resetSelection();
            }, 1000);
        }
    }, [choices]);

    useEffect(() => {
        if (tileLeft === 0) {
            if (turnCounter < highScore || highScore === 0) {
                localStorage.setItem("memoryGameHighScore", JSON.stringify(turnCounter));
                setHighScore(turnCounter);
            }
            alert(`You win in ${turnCounter} turns!`);
            resetGame();
        }
    }, [tileLeft]);


    return (
        <div className="grow py-[2rem] flex flex-col items-center gap-y-[2rem]">
            <header
                className="flex flex-col md:flex-row justify-center items-center gap-[1.5rem] text-center text-3xl font-bold">
                <h1>Memory Game</h1>
                <DarkModeSwitcher/>
            </header>

            <main className="flex justify-between max-w-fit w-full gap-[2rem]">
                <div className="w-[12rem]"/>
                <div className="w-[31rem] h-[31rem]">
                    {tiles.length !== 0 ?
                        <div className="grid grid-cols-4 gap-[1rem]">
                            {tiles.map((tile) => (
                                <Tile key={tile.id}
                                      tile={tile}
                                      handleFlip={handleFlip}
                                      disableClick={disableClick}
                                      flipped={tile.matched || tile === choices[0] || tile === choices[1]}/>
                            ))}
                        </div>
                        :
                        <div className="w-full h-full flex items-center justify-center">
                            <BiSolidCog className="animate-spin text-9xl"/>
                        </div>
                    }
                </div>
                <div className="w-[12rem]">
                    <div className="flex flex-col gap-[1rem] justify-between items-center">
                        <p className="text-2xl text-right w-full font-semibold">
                            High Score: <span>{highScore}</span>
                        </p>
                        <p className="text-2xl text-right w-full font-semibold">
                            Turn: <span>{turnCounter}</span>
                        </p>
                        <p className="text-2xl text-right w-full font-semibold">
                            Tile Left: <span>{tileLeft}</span>
                        </p>

                        <Button onClick={resetGame} customClass="w-[10rem]">
                            Reset
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default MemoryGamePage