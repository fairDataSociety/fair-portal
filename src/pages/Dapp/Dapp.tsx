import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { Dapp as DappModel } from "../../model/Dapp";
import { useParams } from "react-router-dom";
import { getDapp } from "../../storage/dapp-registry";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Button, Chip, Typography } from "@mui/material";
import DappLinks from "../../components/DappLinks/DappLinks";
import { useWalletContext } from "../../context/WalletContext";

export const Wrapper = styled("div")(({ theme }) => ({
  maxWidth: "800px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "row",
  paddingTop: "20px",
}));

export const Logo = styled("img")({
  width: "100px",
  height: "100px",
  objectFit: "cover",
  flexShrink: 0,
});

export const Content = styled("div")(({ theme }) => ({
  display: "flex",
  marginLeft: "50px",
  flexDirection: "column",
}));

const Dapp = () => {
  const { hash } = useParams();
  const { connected, isValidator } = useWalletContext();
  const [dapp, setDapp] = useState<DappModel | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  const loadDapp = async () => {
    try {
      const dapp = await getDapp(hash as string);
      setDapp(dapp);
    } catch (error) {
      setError(String(error));
    }
  };

  useEffect(() => {
    loadDapp();
  }, []);

  return (
    <Wrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {dapp && (
        <>
          <Logo src={dapp.logo} />
          <Content>
            <Typography variant="h3">{dapp.name}</Typography>
            <Typography variant="h6" color="silver">
              {dapp.authorName}
            </Typography>
            <Chip
              sx={{
                width: "fit-content",
                padding: "4px 20px",
                marginTop: "10px",
                marginBottom: "30px",
              }}
              label={dapp.category}
            />
            <Typography sx={{ marginBottom: "20px" }} variant="body1">
              {dapp.longDescription}
            </Typography>
            <div>
              <DappLinks
                website={dapp.website}
                github={dapp.github}
                reddit={dapp.reddit}
                twitter={dapp.twitter}
                telegram={dapp.telegram}
              />
            </div>
            {connected && isValidator && (
              <Button>{dapp.verified ? "Unverify" : "Verify"}</Button>
            )}
          </Content>
        </>
      )}
    </Wrapper>
  );
};

export default Dapp;
