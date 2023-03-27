import React from "react";
import { IconButtonProps, IconButton } from "@mui/material";
import LightMode from "@mui/icons-material/LightMode";
import DarkMode from "@mui/icons-material/DarkMode";
import { useThemeContext } from "../../context/ThemeContext";

const ThemeToggle = (props: IconButtonProps) => {
  const { themeType, changeTheme } = useThemeContext();
  return (
    <IconButton
      color="secondary"
      onClick={() => changeTheme(themeType === "light" ? "dark" : "light")}
      {...props}
    >
      {themeType === "light" ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
};

export default ThemeToggle;
