import React from "react";
import { styled } from "@mui/system";
import { Paper, useTheme } from "@mui/material";
import SearchInput from "../SearchInput/SearchInput";
import Logo from "./Logo";
import { useDappContext } from "../../context/DappContext";

export interface AppHeaderProps {}

export const InnerWrapper = styled("div")(({ theme }) => ({
  width: "1200px",
  margin: "auto",
  display: "flex",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
}));

export const SearchWrapper = styled("div")({
  marginLeft: "auto",
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
        marginBottom: "20px",
        backgroundColor: palette.primary[palette.mode],
      }}
    >
      <InnerWrapper>
        <Logo />
        <SearchWrapper>
          <SearchInput onChange={(e) => onSearch(e.target.value)} />
        </SearchWrapper>
      </InnerWrapper>
    </Paper>
  );
};

export default AppHeader;
