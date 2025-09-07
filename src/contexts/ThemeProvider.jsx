import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [selectedTheme, setSelectedTheme] = useState("clean-light");
    const [selectedFont, setSelectedFont] = useState("georgia");


    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const savedFont = localStorage.getItem("font");
        if (savedTheme) setSelectedTheme(savedTheme);
        if (savedFont) setSelectedFont(savedFont);
    }, []);


    useEffect(() => {
        document.documentElement.setAttribute("data-font", selectedFont);
        localStorage.setItem("font", selectedFont);
    }, [selectedFont]);


    useEffect(() => {
        document.documentElement.setAttribute("data-theme", selectedTheme);
        localStorage.setItem("theme", selectedTheme);
    }, [selectedTheme]);



    return (
        <ThemeContext.Provider value={{ selectedTheme, setSelectedTheme, selectedFont, setSelectedFont }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);