import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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

export function TableHeader() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ width: "10%" }}>ID</StyledTableCell>
            <StyledTableCell style={{ width: "30%" }}>
              Candidate Name
            </StyledTableCell>
            <StyledTableCell style={{ width: "30%" }}>Party</StyledTableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}

export function CustomizedTables(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableBody>
          <StyledTableRow key={props.name}>
            <StyledTableCell style={{ width: "10%" }}>
              {props.idd}
            </StyledTableCell>
            <StyledTableCell
              component="th"
              scope="row"
              style={{ width: "30%" }}
            >
              {props.name}
            </StyledTableCell>
            <StyledTableCell style={{ width: "30%" }}>
              {props.party}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
