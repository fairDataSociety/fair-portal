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
  width: "100%",
  height: "100px",
  objectFit: "cover",
});

const DappItem = ({
  dapp: { name, shortDescription, longDescription },
}: DappItemProps) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "0",
        paddingBottom: "10px",
        height: { xs: "auto", sm: "300px" },
      }}
    >
      <Logo src="https://picsum.photos/200/300" />
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ margin: "10px 0" }} color="text.secondary">
          {shortDescription}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            height: "60px",
            overflow: "hidden",
            "-webkit-line-clamp": "3",
            "-webkit-box-orient": "vertical",
            display: "-webkit-box",
          }}
        >
          {longDescription}
        </Typography>
        <CardActions sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Button
            size="small"
            sx={{ margin: 0, padding: "5px 10px", fontWeight: "bold" }}
          >
            Learn More
          </Button>
        </CardActions>
      </CardContent>
    </Paper>
  );
};

export default DappItem;
