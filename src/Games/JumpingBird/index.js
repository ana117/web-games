import GamePage from "../index";
import React, { useEffect, useState } from 'react';
import JumpingBirdGame from "./game";

const JumpingBirdPage = () => {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    useEffect(() => {
        const localHighScore = localStorage.getItem("jumpingBirdHighScore");
        if (localHighScore) {
            setHighScore(localHighScore);
        }
    }, []);

    useEffect(() => {
        if (score > highScore) {
            localStorage.setItem("jumpingBirdHighScore", score);
            setHighScore(score);
        }
    }, [score, highScore]);

    return (
        <GamePage game="Jumping Bird">
            <div className="flex flex-col gap-[2rem] w-full mx-[2rem]">
                <JumpingBirdGame setScore={setScore} />
                <div className="flex justify-between gap-[2rem]">
                    <p className="text-xl lg:text-2xl lg:text-right font-semibold">
                        Score: <span>{score}</span>
                    </p>
                    <p className="text-xl lg:text-2xl lg:text-right font-semibold">
                        High Score: <span>{highScore}</span>
                    </p>
                </div>
            </div>
        </GamePage>
    );
};

export default JumpingBirdPage;