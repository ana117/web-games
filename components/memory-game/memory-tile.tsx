import { MemoryGameTile } from '@/types/memory-game-types';


interface MemoryTileProps {
  tile: MemoryGameTile;
  onTileClick: (id: number) => void;
}

export default function MemoryTile({ tile, onTileClick }: Readonly<MemoryTileProps>) {
  const handleTileClick = () => {
    if (tile.canFlip) onTileClick(tile.id);
  }

  return (
    <button
      className={`w-28 h-28 flex items-center justify-center relative hover:bg-accent bg-foreground text-background cursor-pointer ${!tile.canFlip && 'opacity-50'} ${tile.isFlipped && '[transform:rotateY(180deg)]'} transition-transform duration-500`}
      onClick={handleTileClick}
    >
      <div className={`absolute text-fore text-7xl lg:text-8xl ${!tile.isFlipped && '[transform:rotateY(180deg)]'} transition-transform duration-500`} style={{ backfaceVisibility: "hidden" }}>
        {tile.icon}
      </div>
    </button>
  );
}