
export const Button = ({ text, onClick, isDisabled }) => {


    const disabledClasses = "opacity-50 cursor-not-allowed";

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`text-text  bg-button hover:bg-button-hover py-2 px-4 rounded transition-all duration-300 ${isDisabled
                ? disabledClasses
                : `cursor-pointer`
                }`}
        >
            {text}
        </button>
    )
}

