import React from "react";
import { styled } from "@mui/system";
import { Dapp } from "../../model/Dapp";
import {
  Button,
  CardActions,
  CardContent,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";

export interface DappItemProps {
  dapp: Dapp;
}

export const Logo = styled("img")({
  width: "70px",
  height: "70px",
  objectFit: "cover",
  flexShrink: 0,
});

export const Header = styled("div")({
  display: "flex",
});

export const Title = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: "0 20px",
  overflow: "hidden",
});

const DappItem = ({
  dapp: { name, authorName, shortDescription, longDescription },
}: DappItemProps) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        height: { xs: "auto", sm: "200px" },
        backgroundColor: "#8888881c",
      }}
    >
      <Header>
        <Logo src="https://picsum.photos/200/300" />
        <Title>
          <Typography variant="h6" component="div">
            {name}
          </Typography>
          <Typography variant="caption" component="div">
            {authorName}
          </Typography>
        </Title>
      </Header>
      <CardContent>
        <Typography
          sx={{
            overflow: "hidden",
            "-webkit-line-clamp": "3",
            "-webkit-box-orient": "vertical",
            display: "-webkit-box",
          }}
          color="text.secondary"
        >
          {shortDescription}
        </Typography>
      </CardContent>
    </Paper>
  );
};

export default DappItem;
