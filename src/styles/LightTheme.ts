import { createTheme } from "@mui/material";
import { colors } from "./colors";
import commonTheme from "./CommonTheme";

const lightTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: "light",
    primary: {
      main: colors.shadeLight3Day,
      light: colors.shadeLight3Day,
      dark: colors.shadeLight1Night,
      contrastText: colors.shadeLight3Night,
    },
    secondary: {
      main: colors.shadeLight1Night,
      light: colors.shadeWhiteNight,
      dark: colors.shadeLight2Night,
    },
    border: {
      main: "#ddd",
    },
    link: {
      main: "#eee",
      dark: "#888",
    },
  },
});

export default lightTheme;
