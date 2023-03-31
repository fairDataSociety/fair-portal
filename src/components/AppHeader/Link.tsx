import React from "react";
import { styled } from "@mui/system";
import { LinkProps, NavLink } from "react-router-dom";

export const StyledLink = styled(NavLink)(({ theme }) => ({
  textTransform: "uppercase",
  textDecoration: "none",
  marginRight: "10px",
  fontWeight: "bolder",
  color: theme.palette.primary.contrastText,
  "&:hover": {
    color: theme.palette.secondary.main,
  },
  "&.active": {
    textDecoration: "underline",
  },
}));

const HeaderLink = ({ children, ...props }: LinkProps) => {
  return (
    <StyledLink end {...props}>
      {children}
    </StyledLink>
  );
};

export default HeaderLink;
