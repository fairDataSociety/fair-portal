import { Theme, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { createContext, useContext } from "react";
import lightTheme from "../styles/LightTheme";
import darkTheme from "../styles/DarkTheme";
import { isDarkThemeActive } from "../utils/system";

export interface ThemeContext {
  theme: Theme;
  changeTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContext>({
  theme: lightTheme,
  changeTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export type ThemeType = "light" | "dark";

export interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState<Theme>(
    isDarkThemeActive() ? darkTheme : lightTheme
  );

  const changeTheme = (theme: ThemeType) => {
    setTheme(theme === "light" ? lightTheme : darkTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
