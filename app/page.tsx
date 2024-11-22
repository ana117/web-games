import Card from "@/components/card";
import Image from "next/image";

interface GameData {
	name: string;
	imagePath: string;
	url: string;
}

export default function Home() {
	const data: GameData[] = [
		{ name: "Rock Paper Scissors", imagePath: "rps.png", url: "/rock-paper-scissors" },
		{ name: "Memory Game", imagePath: "memory-game.png", url: "/memory-game" },
	];

	return (
		<div className="h-full flex flex-wrap items-center justify-center gap-8">
			{data.map((game) => (
				<Card 
					key={game.name} 
					content={<Image src={`/web-games/images/${game.imagePath}`} alt={game.name} fill />}
					linkUrl={game.url}
					linkText={game.name}
				/>
			))}
		</div>
	);
}
