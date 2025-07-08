import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function AdminPromotionListSkeleton() {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {Array.from({ length:8 }).map((_,i)=>(
              <TableCell key={i}><Skeleton variant="text" width={60} /></TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length:5 }).map((_,r)=>(
            <TableRow key={r}>
              {Array.from({ length:8 }).map((_,c)=>(
                <TableCell key={c}><Skeleton variant="text" /></TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
