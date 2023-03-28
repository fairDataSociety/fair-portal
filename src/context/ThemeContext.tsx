import { Theme, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { createContext, useContext } from "react";
import lightTheme from "../styles/LightTheme";
import darkTheme from "../styles/DarkTheme";
import { isDarkThemeActive } from "../utils/system";

export type ThemeType = "light" | "dark";
export interface ThemeContext {
  theme: Theme;
  themeType: ThemeType;
  changeTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContext>({
  theme: lightTheme,
  themeType: "light",
  changeTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const [themeType, setThemeType] = useState<ThemeType>(
    isDarkThemeActive() ? "dark" : "light"
  );
  const [theme, setTheme] = useState<Theme>(
    themeType === "light" ? lightTheme : darkTheme
  );

  const changeTheme = (theme: ThemeType) => {
    setTheme(theme === "light" ? lightTheme : darkTheme);
    setThemeType(theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeType,
        changeTheme,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
