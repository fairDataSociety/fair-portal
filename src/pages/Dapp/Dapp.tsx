import React, { useEffect, useState } from "react";
import intl from "react-intl-universal";
import { styled } from "@mui/system";
import { LocalDapp } from "../../model/Dapp";
import { useNavigate, useParams } from "react-router-dom";
import dappRegistry, { getDapp } from "../../storage/dapp-registry";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {
  Button,
  Chip,
  CircularProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import DappLinks from "../../components/DappLinks/DappLinks";
import { useWalletContext } from "../../context/WalletContext";
import { useDappContext } from "../../context/DappContext";
import RouteCodes from "../../routes/RouteCodes";

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
  const navigate = useNavigate();
  const { connected, isValidator } = useWalletContext();
  const { validatedRecords, reload } = useDappContext();
  const [dapp, setDapp] = useState<LocalDapp | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const loadDapp = async () => {
    try {
      const dapp = await getDapp(hash as string);
      dapp.validated = Boolean(validatedRecords[hash as string]);

      setDapp(dapp);
    } catch (error) {
      setError(String(error));
    }
  };

  const onValidateChange = async () => {
    try {
      setLoading(true);

      await (dapp?.validated
        ? dappRegistry.unvalidateRecord(dapp?.hash as string)
        : dappRegistry.validateRecord(dapp?.hash as string));

      reload();

      navigate(RouteCodes.home);
    } catch (error) {
      setError(String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dapp) {
      setDapp({
        ...dapp,
        validated: Boolean(validatedRecords[hash as string]),
      });
    }
  }, [validatedRecords]);

  useEffect(() => {
    loadDapp();
  }, []);

  return (
    <Wrapper>
      {dapp && (
        <>
          <Logo src={dapp.logo} />
          <Content>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Typography variant="h3">{dapp.name}</Typography>
            <Tooltip title={dapp.authorAddress} placement="bottom-start">
              <Typography variant="h6" color="silver">
                {dapp.authorName}
              </Typography>
            </Tooltip>
            <Chip
              sx={{
                width: "fit-content",
                padding: "4px 20px",
                marginTop: "10px",
                marginBottom: "30px",
              }}
              label={dapp.category}
            />
            <a href="dapp.url" target="_blank">
              <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                {dapp.url}
              </Typography>
            </a>
            <Typography
              variant="body1"
              fontStyle="italic"
              sx={{ marginBottom: "10px" }}
            >
              ENS: {dapp.ens}
            </Typography>
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
              <Button
                onClick={onValidateChange}
                variant="contained"
                color={dapp.validated ? "success" : "error"}
                sx={{ fontWeight: "bold", marginTop: "20px" }}
              >
                {loading ? (
                  <CircularProgress />
                ) : (
                  intl.get(dapp.validated ? "UNVALIDATE" : "VALIDATE")
                )}
              </Button>
            )}
          </Content>
        </>
      )}
    </Wrapper>
  );
};

export default Dapp;
