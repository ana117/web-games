const SelectedOption = ({ option, isPlayer }) => {
    return (
        <div className={`text-[12rem] ${isPlayer ? "rotate-90" : "-rotate-90 -scale-x-100"}`}>
            {option.icon}
        </div>
    );
}

export default SelectedOption;