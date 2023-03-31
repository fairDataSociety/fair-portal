import React from "react";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import RouteCodes from "../../routes/RouteCodes";

export const LogoLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.contrastText,
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));

const Logo = () => {
  return (
    <LogoLink to={RouteCodes.home}>
      <Typography variant='h5' fontWeight='normal'>
        Fair Portal
      </Typography>
    </LogoLink>
  )
};

export default Logo;
