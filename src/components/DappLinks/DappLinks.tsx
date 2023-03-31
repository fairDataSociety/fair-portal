import React, { ReactElement } from "react";
import { IconButton, Tooltip } from "@mui/material";
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
  const renderDappLink = (href: string, image: ReactElement) => (
    <Tooltip title={href} arrow>
      <IconButton component="a" href={href} target="_blank" size="small">
        {image}
      </IconButton>
    </Tooltip>
  );

  return (
    <>
      {website && renderDappLink(website, <Web />)}
      {github && renderDappLink(github, <GitHub />)}
      {reddit && renderDappLink(reddit, <Reddit />)}
      {twitter && renderDappLink(twitter, <Twitter />)}
      {telegram && renderDappLink(website, <Telegram />)}
    </>
  );
};

export default DappLinks;
