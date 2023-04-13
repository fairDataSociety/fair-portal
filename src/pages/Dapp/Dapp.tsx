import React, { useEffect, useState } from "react";
import intl from "react-intl-universal";
import { styled } from "@mui/system";
import { LocalDapp } from "../../model/Dapp";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import dappRegistry, { getDapp } from "../../storage/dapp-registry";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {
  Button,
  Chip,
  CircularProgress,
  LinearProgress,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import DappLinks from "../../components/DappLinks/DappLinks";
import { useWalletContext } from "../../context/WalletContext";
import { useDappContext } from "../../context/DappContext";
import RouteCodes from "../../routes/RouteCodes";

export const Wrapper = styled("div")(({ theme }) => ({
  maxWidth: "800px",
  margin: "0 auto",
  display: "flex",
  paddingTop: "20px",
  flexDirection: "row",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

export const Logo = styled("img")({
  width: "100px",
  height: "100px",
  objectFit: "cover",
  flexShrink: 0,
});

export const Content = styled("div")(({ theme }) => ({
  display: "flex",
  margin: "0 50px",
  flexDirection: "column",
}));

export const StyledLink = styled("a")(({ theme }) => ({
  color: theme.palette.link.main,
  marginBottom: "10px",
}));

const Dapp = () => {
  const { hash } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { connected, isAdmin, address } = useWalletContext();
  const { validatedRecords, userValidatedRecords, isDappValidated, reload } =
    useDappContext();
  const [dapp, setDapp] = useState<LocalDapp | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const userValidated =
    address === import.meta.env.VITE_FDP_ADDRESS
      ? dapp?.validated
      : Boolean(userValidatedRecords[hash as string]);

  const loadDapp = async () => {
    try {
      const dapp = await getDapp(hash as string);
      dapp.validated = isDappValidated(
        dapp,
        validatedRecords,
        userValidatedRecords
      );
      setDapp(dapp);
    } catch (error) {
      setError(String(error));
    }
  };

  const onValidateChange = async (): Promise<void> => {
    try {
      setLoading(true);

      await (userValidated
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
        validated: isDappValidated(
          dapp,
          validatedRecords,
          userValidatedRecords
        ),
      });
    }
  }, [validatedRecords, userValidatedRecords]);

  useEffect(() => {
    loadDapp();
  }, []);

  return (
    <Wrapper>
      {dapp ? (
        <>
          <Logo
            src={dapp.logo}
            sx={{ marginLeft: { md: 0, sm: "50px", xs: "50px" } }}
          />
          <Content>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Typography variant="h3">
              {dapp.name}
              {dapp.validated && validatedRecords[dapp.hash] && (
                <Tooltip
                  title={intl.get("VALIDATED_BY_FDS")}
                  placement="bottom-start"
                >
                  <VerifiedUser sx={{ ml: "5px" }} />
                </Tooltip>
              )}
            </Typography>
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
            <Typography variant="body1">
              <StyledLink href={dapp.url} target="_blank">
                {dapp.url}
              </StyledLink>
            </Typography>
            <Typography
              variant="body1"
              fontStyle="italic"
              sx={{ marginBottom: "10px" }}
            >
              ENS: {dapp.ens}
            </Typography>
            <Typography
              sx={{ marginBottom: "20px", overflowWrap: "anywhere" }}
              variant="body1"
            >
              {dapp.shortDescription}
            </Typography>
            <Typography
              sx={{ marginBottom: "20px", overflowWrap: "anywhere" }}
              variant="body1"
            >
              {dapp.longDescription}
            </Typography>
            <div>
              <DappLinks
                website={dapp.website}
                github={dapp.github}
                discord={dapp.discord}
                reddit={dapp.reddit}
                twitter={dapp.twitter}
                telegram={dapp.telegram}
              />
            </div>
            {connected && (
              <Button
                onClick={onValidateChange}
                variant="contained"
                disabled={loading}
                color={userValidated ? "success" : "error"}
                sx={{ fontWeight: "bold", marginTop: "20px" }}
              >
                {loading ? (
                  <CircularProgress />
                ) : (
                  intl.get(userValidated ? "UNVALIDATE" : "VALIDATE")
                )}
              </Button>
            )}
            {connected && (address === dapp.authorAddress || isAdmin) && (
              <Button
                component={NavLink}
                to={RouteCodes.editDapp.replace(":hash", dapp.hash)}
                fullWidth={false}
                color="secondary"
                variant="contained"
                sx={{ marginTop: "20px" }}
              >
                {intl.get("EDIT")}
              </Button>
            )}
          </Content>
        </>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <LinearProgress color="secondary" sx={{ width: "100%", mt: "50px" }} />
      )}
    </Wrapper>
  );
};

export default Dapp;
