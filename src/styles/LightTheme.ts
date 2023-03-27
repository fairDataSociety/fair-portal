import { createTheme } from "@mui/material";
import { colors } from "./colors";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.shadeDark1Day,
      light: colors.shadeDark2Day,
      dark: colors.shadeDark3Day,
    },
    secondary: {
      main: colors.shadeLight1Night,
      light: colors.shadeLight2Night,
      dark: colors.shadeLight3Night,
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
