"use client";

import { useEffect, useState } from "react";
import { MemoryGameTile } from "@/types/memory-game-types";
import { BiSolidBook, BiSolidBot, BiSolidCastle, BiSolidCat, BiSolidDizzy, BiSolidGhost, BiSolidHardHat, BiSolidMask } from "react-icons/bi";
import Button from "../button";
import MemoryBoard from "./memory-board";


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

export default function MemoryGame() {
  const [tiles, setTiles] = useState<MemoryGameTile[]>([]);
  const [isFlipping, setIsFlipping] = useState(false);

  const [selectedTileOne, setSelectedTileOne] = useState<MemoryGameTile | null>(null);
  const [selectedTileTwo, setSelectedTileTwo] = useState<MemoryGameTile | null>(null);
  const [matchCount, setMatchCount] = useState(0);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const flipTile = (id: number) => {
    setTiles((prevTiles) =>
      prevTiles.map((tile) =>
        tile.id === id ? { ...tile, isFlipped: !tile.isFlipped, canFlip: !tile.canFlip } : tile
      )
    );
  }

  const handleTileClick = (id: number) => {
    if (isFlipping) return;
    setScore((prev) => prev + 1);

    flipTile(id); 

    const selectedTile = tiles.find((tile) => tile.id === id);
    if (!selectedTile) return;
    if (selectedTileOne) {
      setSelectedTileTwo(selectedTile);
    } else {
      setSelectedTileOne(selectedTile);
    }
  }

  const startGame = () => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("memoryHighScore", score.toString());
    }

    setTiles([]);
    const tilePairs = ICONS.concat(ICONS).map((icon, index) => ({
      id: index,
      icon: icon.icon,
      name: icon.name,
      isFlipped: false,
      canFlip: true,
    }));

    const shuffledTiles = tilePairs.toSorted(() => Math.random() - 0.5);
    setTiles(shuffledTiles);
    setMatchCount(0);
    setSelectedTileOne(null);
    setSelectedTileTwo(null);
    setScore(0);
  }
  
  useEffect(() => {
    const bestScore = localStorage.getItem("memoryHighScore");
    if (bestScore) {
      setHighScore(parseInt(bestScore));
    }

    const tilePairs = ICONS.concat(ICONS).map((icon, index) => ({
      id: index,
      icon: icon.icon,
      name: icon.name,
      isFlipped: false,
      canFlip: true,
    }));

    const shuffledTiles = tilePairs.toSorted(() => Math.random() - 0.5);
    setTiles(shuffledTiles);
    setMatchCount(0);
    setSelectedTileOne(null);
    setSelectedTileTwo(null);
    setScore(0);
  }, []);

  useEffect(() => {
    if (!selectedTileOne || !selectedTileTwo) return;
    setIsFlipping(true);
    if (selectedTileOne.name === selectedTileTwo.name) {
      setTiles((prevTiles) =>
        prevTiles.map((tile) =>
          tile.name === selectedTileOne.name ? { ...tile, canFlip: false } : tile
        )
      );
      setMatchCount((prevMatchCount) => prevMatchCount + 1);
    } else {
      setTimeout(() => {
        flipTile(selectedTileOne.id);
        flipTile(selectedTileTwo.id);
      }, 1000);
    }
    
    setSelectedTileOne(null);
    setSelectedTileTwo(null);
    
    setTimeout(() => {
      setIsFlipping(false);
    }, 1500);
  }, [selectedTileOne, selectedTileTwo]);

  return (
    <div className="h-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:px-2">
      <div className="lg:w-1/5 flex lg:flex-col items-center justify-between gap-8 text-3xl text-center order-1 lg:order-0">
        <div>Guess #{score}</div>
        <div className="flex gap-2">
          <span>Best Score</span>
          <span>{highScore}</span>
        </div>
      </div>

      <div className="order-0 lg:order-1 flex items-center justify-center h-full xl:w-2/5">
        {matchCount === ICONS.length ? (
          <div className="text-3xl text-center">
            <h2 className="text-4xl font-bold">
              You won!
            </h2>
          </div>
        ) : (
          <MemoryBoard tiles={tiles} onTileClick={handleTileClick} />
        )}
      </div>

      <div className="lg:w-1/5 flex flex-col items-center gap-4 order-2 ">
        <div className="text-3xl">
          {matchCount} / {ICONS.length}
        </div>
        <div>
          <Button onClick={startGame}>Restart</Button>
        </div>
      </div>
    </div>
  );
}