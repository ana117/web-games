const Button = ({children, customClass, ...props}) => {
    return (
        <button {...props}
                className={`px-4 py-2 rounded-xl
                            theme-dark dark:theme text-xl font-bold
                            hover:bg-accent hover:dark:bg-accent-dark ${customClass}`}>
            {children}
        </button>
    );
}

export default Button;