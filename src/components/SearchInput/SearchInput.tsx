import React from "react";
import {
  Divider,
  IconButton,
  InputBase,
  InputProps,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = (props: InputProps) => {
  return (
    <Paper
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: { sm: "auto", md: 400 },
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ "aria-label": "search google maps" }}
        {...props}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
