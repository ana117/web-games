const Button = ({children, customClass, ...props}) => {
    return (
        <button {...props}
                className={`px-4 py-2 rounded-xl
                            bg-background-dark dark:bg-background
                            text-text-dark dark:text-text text-xl font-bold
                            hover:bg-accent hover:dark:bg-accent-dark ${customClass}`}>
            {children}
        </button>
    );
}

export default Button;