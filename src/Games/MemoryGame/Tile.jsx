const Tile = ({tile, handleFlip, disableClick, flipped}) => {

    const handleClick = () => {
        if (disableClick || flipped || tile.matched) return;
        handleFlip(tile.id);
    }

    return (
        <div key={tile.id} aria-label={tile.name} onClick={handleClick}
             className={`w-[7rem] h-[7rem] flex items-center justify-center relative 
                         hover:bg-accent hover:dark:bg-accent-dark bg-background-dark dark:bg-background 
                         ${tile.matched && 'opacity-50'}
                         text-text-dark dark:text-text cursor-pointer 
                         ${flipped && 'rotate-y-180'} transition-transform duration-500`}>

            <div className={`absolute text-[7rem] backface-hidden 
                             ${!flipped && 'rotate-y-180'} transition-transform duration-500`}>
                {tile.icon}
            </div>
        </div>
    )
}

export default Tile;