import React from "react";
import { IconButton } from "@mui/material";
import Web from "@mui/icons-material/Web";
import GitHub from "@mui/icons-material/GitHub";
import Telegram from "@mui/icons-material/Telegram";
import Reddit from "@mui/icons-material/Reddit";
import Twitter from "@mui/icons-material/Twitter";

export interface DappLinksProps {
  website: string;
  github: string;
  reddit: string;
  twitter: string;
  telegram: string;
}

const DappLinks = ({
  website,
  github,
  reddit,
  twitter,
  telegram,
}: DappLinksProps) => {
  return (
    <>
      {website && (
        <IconButton component="a" href={website} target="_blank" size="small">
          <Web />
        </IconButton>
      )}
      {github && (
        <IconButton component="a" href={github} target="_blank" size="small">
          <GitHub />
        </IconButton>
      )}
      {reddit && (
        <IconButton component="a" href={reddit} target="_blank" size="small">
          <Reddit />
        </IconButton>
      )}
      {twitter && (
        <IconButton component="a" href={twitter} target="_blank" size="small">
          <Twitter />
        </IconButton>
      )}
      {telegram && (
        <IconButton component="a" href={telegram} target="_blank" size="small">
          <Telegram />
        </IconButton>
      )}
    </>
  );
};

export default DappLinks;
