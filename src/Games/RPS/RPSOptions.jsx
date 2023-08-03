const RPSOptions = ({ options, handleSelection }) => {
    return (
        <div className="flex gap-[2rem]">
            {Object.values(options).map((option) => {
                return (
                    <button key={option.name} onClick={() => handleSelection(option)}
                         className="text-6xl theme-dark dark:theme p-[1rem] rounded-full
                                    hover:bg-accent hover:scale-125
                                    transition-transform duration-300">
                        {option.icon}
                    </button>
                );
            })}
        </div>
    );
}

export default RPSOptions;