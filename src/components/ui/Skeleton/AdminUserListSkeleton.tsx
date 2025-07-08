import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export default function AdminUserListSkeleton() {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {["Nome","Email","Papel","Criado","Ativo","Ações"].map(h=>(
                <TableCell key={h}><Skeleton variant="text" width={60} /></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length:5 }).map((_,i)=>(
              <TableRow key={i}>
                {Array.from({ length:6 }).map((__,j)=>(
                  <TableCell key={j}><Skeleton variant="text" /></TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
