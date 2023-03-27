import React from "react";
import { Typography, useTheme } from "@mui/material";

const Logo = () => {
  const { palette } = useTheme();
  return (
    <Typography variant="h4" fontWeight="bold">
      Fair Portal
    </Typography>
  );
};

export default Logo;
