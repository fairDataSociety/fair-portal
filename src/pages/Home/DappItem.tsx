import React from "react";
import { styled } from "@mui/system";
import { LocalDapp } from "../../model/Dapp";
import { CardContent, Chip, Paper, Typography } from "@mui/material";
import DappLinks from "../../components/DappLinks/DappLinks";
import RouteCodes from "../../routes/RouteCodes";
import { Link } from "react-router-dom";

export interface DappItemProps {
  dapp: LocalDapp;
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
  color: "inherit",
});

const DappItem = ({
  dapp: {
    name,
    authorName,
    logo,
    shortDescription,
    category,
    hash,
    website,
    github,
    reddit,
    twitter,
    telegram,
    validated,
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
        height: "220px",
        backgroundColor: validated ? "#8888881c" : "#87004d",
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
          variant="body1"
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
        <Chip
          sx={{
            width: "fit-content",
            padding: "0",
            marginLeft: "auto",
            position: "absolute",
            right: "5px",
            bottom: "5px",
          }}
          label={category}
        />
      </CardContent>
    </Paper>
  );
};

export default DappItem;
