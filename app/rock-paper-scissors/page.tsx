import RockPaperScissors from "@/components/rock-paper-scissors/rps-game";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rock Paper Scissors",
  description: "A simple rock paper scissors game",
};

export default function RockPaperScissorsPage() {
	return (
		<RockPaperScissors />
	)
}