import React, { useEffect, useState } from "react";
import intl from "react-intl-universal";
import { styled } from "@mui/system";
import { NavLink, useNavigate } from "react-router-dom";
import {
  filterExpiredRecords,
  getUserRecords,
} from "../../storage/dapp-registry";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {
  Button,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { useWalletContext } from "../../context/WalletContext";
import RouteCodes from "../../routes/RouteCodes";
import { DappRecord } from "@fairdatasociety/fdp-contracts-js/build/types/model/dapp-record.model";
import { shortenString } from "../../utils/strings";
import ClipboardButton from "../../components/ClipboardButton/ClipboardButton";

export const Wrapper = styled("div")({
  width: "100%",
  maxWidth: "800px",
  margin: "0 auto",
  paddingTop: "20px",
  display: "flex",
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ExpiredDapps = () => {
  const navigate = useNavigate();
  const { address } = useWalletContext();
  const [records, setRecords] = useState<DappRecord[] | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  const loadRecords = async () => {
    try {
      const records = await getUserRecords(address as string);

      const expiredRecords = await filterExpiredRecords(records);

      setRecords(expiredRecords);
    } catch (error) {
      console.error(error);

      setError(String(error));
    }
  };

  useEffect(() => {
    if (!address) {
      navigate(RouteCodes.home);
    }
    loadRecords();
  }, []);

  return (
    <Wrapper>
      {records ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>{intl.get("RECORD_HASH")}</StyledTableCell>
                <StyledTableCell align="right">
                  {intl.get("SWARM_LOCATION")}
                </StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map(({ recordHash, location, timestamp }) => (
                <StyledTableRow key={recordHash}>
                  <StyledTableCell>
                    {shortenString(recordHash)}
                    <ClipboardButton text={recordHash} />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {shortenString(location)}
                    <ClipboardButton text={location} />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      component={NavLink}
                      to={RouteCodes.editExpiredDapp.replace(
                        ":hash",
                        recordHash
                      )}
                    >
                      {intl.get("EDIT")}
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <LinearProgress
          color="secondary"
          sx={{ width: "100%", margin: "auto", mt: "50px" }}
        />
      )}
    </Wrapper>
  );
};

export default ExpiredDapps;
