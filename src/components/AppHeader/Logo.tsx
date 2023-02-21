import React from "react";
import { Typography, useTheme } from "@mui/material";

const Logo = () => {
  const { palette } = useTheme();
  return (
    <Typography
      variant="h4"
      fontStyle={["bold", "italic"]}
      sx={{ color: palette.primary.main }}
    >
      FDP Portal
    </Typography>
  );
};

export default Logo;
