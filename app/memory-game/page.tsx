import MemoryGame from "@/components/memory-game/memory-game";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MemoryGame",
  description: "A simple memory game",
};

export default function MemoryGamePage() {
	return (
		<MemoryGame />
	)
}