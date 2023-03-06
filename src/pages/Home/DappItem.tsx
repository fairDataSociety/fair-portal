import React from "react";
import { styled } from "@mui/system";
import { Dapp } from "../../model/Dapp";
import { CardContent, Paper, Typography } from "@mui/material";
import DappLinks from "../../components/DappLinks/DappLinks";
import RouteCodes from "../../routes/RouteCodes";
import { Link } from "react-router-dom";

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

export const StyledLink = styled(Link)({
  textDecoration: "none",
});

const DappItem = ({
  dapp: {
    name,
    authorName,
    logo,
    shortDescription,
    hash,
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
        height: "200px",
        backgroundColor: "#8888881c",
      }}
    >
      <StyledLink to={RouteCodes.dapp.replace(":hash", hash as string)}>
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
      </StyledLink>
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
          <DappLinks
            website={website}
            github={github}
            reddit={reddit}
            twitter={twitter}
            telegram={telegram}
          />
        </Links>
      </CardContent>
    </Paper>
  );
};

export default DappItem;
