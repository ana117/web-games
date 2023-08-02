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
import Button from "../../components/Button";
import GamePage from "../index";


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
            setTimeout(() => {
                resetGame();
            }, 2000);
        }
    }, [tileLeft]);


    return (
        <GamePage game="Memory Game">
            {tileLeft === 0 &&
                <div className="absolute z-20 bg-accent rounded-xl
                                text-4xl text-center font-semibold
                                px-[1rem] py-[2.5rem] mx-[2rem]">
                    You win in <span className="font-bold">{turnCounter}</span> turns!
                </div>
            }
            <main className="flex flex-col lg:flex-row justify-between max-w-fit w-full gap-[2rem] mt-[0.25rem]">
                <div className="w-[12rem] hidden lg:flex"/>
                <div className="w-[19rem] h-[19rem] lg:w-[31rem] lg:h-[31rem] min-h-fit">
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
                <div className="lg:w-[12rem] mt-auto">
                    <div className="grid grid-cols-2
                                    lg:flex lg:flex-col gap-[1rem] justify-between items-center
                                    text-xl  font-semibold
                                    lg:text-2xl lg:text-right font-semibold">
                        <p className="w-full col-span-2">
                            High Score: <span>{highScore}</span>
                        </p>
                        <p className="w-full">
                            Turn: <span>{turnCounter}</span>
                        </p>
                        <p className="w-full">
                            Tile Left: <span>{tileLeft}</span>
                        </p>

                        <Button onClick={resetGame} customClass="w-full col-span-2">
                            Reset
                        </Button>
                    </div>
                </div>
            </main>
        </GamePage>
    )
}

export default MemoryGamePage