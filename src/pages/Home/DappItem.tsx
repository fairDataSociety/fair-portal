import React from "react";
import { styled } from "@mui/system";
import { Dapp } from "../../model/Dapp";
import { CardContent, IconButton, Paper, Typography } from "@mui/material";
import Web from "@mui/icons-material/Web";
import GitHub from "@mui/icons-material/GitHub";
import Telegram from "@mui/icons-material/Telegram";
import Reddit from "@mui/icons-material/Reddit";
import Twitter from "@mui/icons-material/Twitter";

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

export const Links = styled("div")({
  position: "absolute",
  left: 0,
  bottom: 0,
});

const DappItem = ({
  dapp: {
    name,
    authorName,
    logo,
    shortDescription,
    website,
    github,
    reddit,
    twitter,
    telegram,
  },
}: DappItemProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        height: { xs: "auto", sm: "200px" },
        backgroundColor: "#8888881c",
      }}
    >
      <Header>
        <Logo src={logo} />
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
        <Links>
          {website && (
            <IconButton
              component="a"
              href={website}
              target="_blank"
              size="small"
            >
              <Web />
            </IconButton>
          )}
          {github && (
            <IconButton
              component="a"
              href={github}
              target="_blank"
              size="small"
            >
              <GitHub />
            </IconButton>
          )}
          {reddit && (
            <IconButton
              component="a"
              href={reddit}
              target="_blank"
              size="small"
            >
              <Reddit />
            </IconButton>
          )}
          {twitter && (
            <IconButton
              component="a"
              href={twitter}
              target="_blank"
              size="small"
            >
              <Twitter />
            </IconButton>
          )}
          {telegram && (
            <IconButton
              component="a"
              href={telegram}
              target="_blank"
              size="small"
            >
              <Telegram />
            </IconButton>
          )}
        </Links>
      </CardContent>
    </Paper>
  );
};

export default DappItem;
