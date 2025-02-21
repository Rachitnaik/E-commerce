import { createContext, useContext, useState, ReactNode } from "react";

// Step 1: Create the context
const ThemeContext = createContext({
    theme: "light",         // Default theme is light
    toggleTheme: () => { },  // Placeholder function
});

// Step 2: Create the provider component
export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState("light");

    // Toggle function to switch themes
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme); // Apply theme to root
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Step 3: Custom hook for easy usage
export function useTheme() {
    return useContext(ThemeContext);
}
