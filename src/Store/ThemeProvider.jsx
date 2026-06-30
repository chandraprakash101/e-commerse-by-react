import React, { createContext, useEffect, useState } from 'react'
export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const defaultTheme = localStorage.getItem("theme") || "light";

    const [theme, setTheme] = useState(defaultTheme);
    const data = {theme, setTheme};
    useEffect(()=>{
        localStorage.setItem("theme", theme);
    },[theme])
  return (
    <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>
  )
}

export default ThemeProvider
