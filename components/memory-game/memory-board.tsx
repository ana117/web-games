import { MemoryGameTile } from "@/types/memory-game-types";
import MemoryTile from "./memory-tile";
import { BiSolidCog } from "react-icons/bi";

export default function MemoryBoard({ tiles, onTileClick }: Readonly<{ tiles: MemoryGameTile[], onTileClick: (id: number) => void }>) {
  if (tiles.length) {
    return (
      <div className="grid grid-cols-4 gap-2 lg:gap-8">
        {tiles.map((tile) => (
          <MemoryTile key={tile.id} tile={tile} onTileClick={onTileClick} />
        ))}
      </div>
    );
  }

  return (
    <BiSolidCog className="animate-spin text-9xl"/>
  );
}