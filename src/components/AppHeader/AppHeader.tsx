import React from "react";
import { styled } from "@mui/system";
import { Paper } from "@mui/material";
import Logo from "./Logo";
import AccountSection from "./AccountSection";
import Links from "./Links";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export interface AppHeaderProps {}

export const InnerWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  margin: "auto",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
}));

export const LinksWrapper = styled("div")({
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
});

const AppHeader = (props: AppHeaderProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        padding: "10px",
        margin: 0,
        borderRadius: 0,
        zIndex: 1,
      }}
    >
      <InnerWrapper>
        <Logo />
        <LinksWrapper>
          <Links />
          <AccountSection />
          <ThemeToggle />
        </LinksWrapper>
      </InnerWrapper>
    </Paper>
  );
};

export default AppHeader;
