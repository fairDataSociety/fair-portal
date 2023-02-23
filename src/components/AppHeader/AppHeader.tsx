import React from "react";
import { styled } from "@mui/system";
import { Paper, useTheme } from "@mui/material";
import Logo from "./Logo";
import { useDappContext } from "../../context/DappContext";
import AccountSection from "./AccountSection";
import Links from "./Links";

export interface AppHeaderProps {}

export const InnerWrapper = styled("div")(({ theme }) => ({
  width: "1200px",
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
  const { palette } = useTheme();
  const { onSearch } = useDappContext();
  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        padding: "10px",
        margin: 0,
        borderRadius: 0,
        zIndex: 1,
        backgroundColor: palette.primary[palette.mode],
      }}
    >
      <InnerWrapper>
        <Logo />
        <LinksWrapper>
          <Links />
          {/* <SearchInput onChange={(e) => onSearch(e.target.value)} /> */}
          <AccountSection />
        </LinksWrapper>
      </InnerWrapper>
    </Paper>
  );
};

export default AppHeader;
