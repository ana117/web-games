const Tile = ({tile, handleFlip, disableClick, flipped}) => {

    const handleClick = () => {
        if (disableClick || flipped || tile.matched) return;
        handleFlip(tile.id);
    }

    return (
        <div key={tile.id} aria-label={tile.name} onClick={handleClick}
             className={`w-[4rem] h-[4rem] lg:w-[7rem] lg:h-[7rem] flex items-center justify-center relative 
                         hover:bg-accent hover:dark:bg-accent-dark theme-dark dark:theme cursor-pointer 
                         ${tile.matched && 'opacity-50'} 
                         ${flipped && 'rotate-y-180'} transition-transform duration-500`}>

            <div className={`absolute text-[4rem] lg:text-[7rem] backface-hidden 
                             ${!flipped && 'rotate-y-180'} transition-transform duration-500`}>
                {tile.icon}
            </div>
        </div>
    )
}

export default Tile;