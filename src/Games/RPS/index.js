import GamePage from "../index";
import {FaHandScissors, FaHandRock, FaHandPaper} from "react-icons/fa";
import SelectedOption from "./SelectedOption";
import RPSOptions from "./RPSOptions";
import {useEffect, useState} from "react";

const RockPaperScissorsPage = () => {
    const [playerOption, setPlayerOption] = useState(null);
    const [computerOption, setComputerOption] = useState(null);
    const [status, setStatus] = useState(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const options = {
        rock: {
            name: "rock",
            defeats: ["scissors"],
            icon: <FaHandRock/>,
        },
        paper: {
            name: "paper",
            defeats: ["rock"],
            icon: <FaHandPaper/>,
        },
        scissors: {
            name: "scissors",
            defeats: ["paper"],
            icon: <FaHandScissors className="-rotate-90 -scale-x-100"/>,
        }
    };

    const generateComputerOption = () => {
        const availableOptions = Object.keys(options);
        const computerOption = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        setComputerOption(options[computerOption]);
    };

    const handleSelection = (selection) => {
        setPlayerOption(selection);
        generateComputerOption();
    }

    useEffect(() => {
        const localHighScore = JSON.parse(localStorage.getItem("rpsHighScore"));
        if (localHighScore) {
            setHighScore(localHighScore);
        }
    }, []);

    useEffect(() => {
        if (playerOption && computerOption) {
            if (playerOption.name === computerOption.name) {
                setStatus("It's a draw");
            } else if (playerOption.defeats.includes(computerOption.name)) {
                setStatus("You win!");
                setScore(s => s + 1);
            } else {
                setStatus("You lose");
                setScore(0);
            }
        }
    }, [playerOption, computerOption]);

    useEffect(() => {
        setHighScore(s => {
            if (score > s) {
                localStorage.setItem("rpsHighScore", JSON.stringify(score));
                return score;
            } else {
                return s;
            }
        });
    }, [score]);

    return (
        <GamePage game="Rock Paper Scissors">
            <div className="flex flex-col justify-between p-[1rem] lg:p-[4rem]">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-[4rem] lg:h-[12rem]">
                    <div className="flex justify-center items-center">
                        {playerOption && <SelectedOption option={playerOption} isPlayer={true}/>}
                    </div>

                    <div className="order-last lg:order-none col-span-2 lg:col-span-1
                                    flex flex-col items-center justify-center gap-[2rem]
                                    text-2xl font-semibold">
                        {status && <p className="text-4xl font-bold">{status}</p>}
                        <div className="text-center">
                            <p>Win Streak: {score}</p>
                            <p>Best Win Streak: {highScore}</p>
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        {computerOption && <SelectedOption option={computerOption}/>}
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <RPSOptions options={options} handleSelection={handleSelection}/>
                </div>
            </div>
        </GamePage>
    );
}

export default RockPaperScissorsPage