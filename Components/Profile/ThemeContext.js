import React, { useContext, useState, createContext } from 'react';


export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState({
        backgroundColor: '#ffffff',
        fontColor: '#000000'
    });

    const themes = {
        light: { backgroundColor: '#ffffff', fontColor: '#000000' },
        dark: { backgroundColor: '#000000', fontColor: '#ffffff' },
    };

    const changeTheme = (selectedTheme) => {
        setTheme(themes[selectedTheme]);
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
