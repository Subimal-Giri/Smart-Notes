import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('sn-theme');

        if (saved) return saved;

        return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');

        localStorage.setItem('sn-theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme((p) => (p === 'dark' ? 'light' : 'dark'));

    return (
        <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);

