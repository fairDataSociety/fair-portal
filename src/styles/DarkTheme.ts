import { createTheme } from "@mui/material";
import { colors } from "./colors";
import commonTheme from "./CommonTheme";

const darkTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: "dark",
    primary: {
      main: colors.shadeLight2Night,
      light: colors.shadeLight2Night,
      dark: colors.shadeDark3Night,
      contrastText: colors.shadeLight1Night,
    },
    secondary: {
      main: colors.shadeLight3Night,
      light: colors.shadeLight2Night,
      dark: colors.shadeDark2Night,
    },
    border: {
      main: "#ddd",
    },
    link: {
      main: colors.statusComponentsDay,
      dark: colors.statusComponentsDay,
    },
  },
});

export default darkTheme;
