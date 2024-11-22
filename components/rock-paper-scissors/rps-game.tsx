"use client";

import ClickableIcon from "@/components/clickable-icon";
import RpsIcon from "@/components/rock-paper-scissors/rps-icon";
import { useEffect, useState } from "react";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";

interface RockPaperScissorsOption {
	name: string;
	defeat: string;
	icon: JSX.Element;
}

const OPTIONS: Map<string, RockPaperScissorsOption> = new Map([
	["rock", { name: "Rock", defeat: "Paper", icon: <FaHandRock /> }],
	["paper", { name: "Paper", defeat: "Scissors", icon: <FaHandPaper /> }],
	["scissors", { name: "Scissors", defeat: "Rock", icon: <FaHandScissors /> }],
]);

export default function RockPaperScissors() {
	const [playerChoice, setPlayerChoice] = useState<RockPaperScissorsOption | null>(null);
	const [computerChoice, setComputerChoice] = useState<RockPaperScissorsOption | null>(null);
	const [result, setResult] = useState<string | null>(null);
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);

	const handleChoiceSelection = (choice: string) => {
		const playerOption = OPTIONS.get(choice.toLowerCase())!;
		const computerOption = Array.from(OPTIONS.values())[Math.floor(Math.random() * 3)];

		setPlayerChoice(playerOption);
		setComputerChoice(computerOption);
	};

	useEffect(() => {
		if (playerChoice && computerChoice) {
			let resultText;
			if (playerChoice.name === computerChoice.name) {
				resultText = "It's a tie!";
			} else if (playerChoice.defeat === computerChoice.name) {
				resultText = "You win!";
				setScore((prev) => prev + 1);
			} else {
				resultText = "You lose!";
				setScore(0);
			}
			setResult(resultText);
		}
	}, [playerChoice, computerChoice]);

	useEffect(() => {
		const highScore = localStorage.getItem("rpsHighScore");
		if (highScore) {
			setHighScore(parseInt(highScore));
		}
	}, []);

	useEffect(() => {
		if (score > highScore) {
			setHighScore(score);
			localStorage.setItem("rpsHighScore", score.toString());
		}
	}, [score, highScore]);

	return (
		<div className="flex flex-col items-center gap-8 h-full">
			<div className="grow grid grid-cols-2 sm:grid-cols-3 place-content-center gap-16">
				<div>
					{playerChoice && <RpsIcon icon={playerChoice.icon} isPlayer={true} />}
				</div>

				<div className="flex flex-col items-center justify-center gap-4 order-last sm:order-none col-span-2 sm:col-span-1">
					{result && <p className="text-4xl font-bold">{result}</p>}
						<div className="text-center">
								<p>Win Streak: {score}</p>
								<p>Best Win Streak: {highScore}</p>
						</div>
				</div>

				<div>
					{computerChoice && <RpsIcon icon={computerChoice.icon} isPlayer={false} />}
				</div>
			</div>

			<div className="flex items-center justify-center gap-8">
				{Array.from(OPTIONS.values()).map((option) => (
					<ClickableIcon icon={option.icon} onClick={() => handleChoiceSelection(option.name)} key={option.name} />
				))}
			</div>
		</div>
	);
}