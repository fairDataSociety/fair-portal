import React from "react";
import { styled } from "@mui/system";
import { LinkProps, NavLink } from "react-router-dom";

export const StyledLink = styled(NavLink)(({ theme }) => ({
  textTransform: "uppercase",
  textDecoration: "none",
  color: theme.palette.link.main,
  marginRight: "10px",
  fontWeight: "bolder",
  "&:hover": {
    color: theme.palette.link.dark,
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
