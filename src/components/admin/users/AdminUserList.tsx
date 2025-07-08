'use client';
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/icons-material/ToggleOn";
import IconButtonOff from "@mui/icons-material/ToggleOff";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import type { ActionResult } from "@/actions/types";
import { toggleUserActiveAction } from "@/actions/users/toggleUserActive";

type UserData = { id:string; name?:string; email:string; role:string; createdAt:string; active:boolean };

interface Props {
  usersResult: ActionResult<{ users:UserData[]; totalCount:number; page:number; pageSize:number }>;
}

export default function AdminUserList({ usersResult }:Props) {
  const router = useRouter();
  const { success, data, error } = usersResult;
  const [toggling, setToggling] = useState<string|null>(null);

  if (!success) return <Typography color="error">{error.message}</Typography>;
  if (data.users.length === 0) return <Typography>Nenhum usuário.</Typography>;

  const handleToggle = async (id:string, active:boolean) => {
    setToggling(id);
    const fd = new FormData();
    fd.append("id", id);
    fd.append("active", String(active));
    await toggleUserActiveAction(fd);
    setToggling(null);
    router.refresh();
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {["Nome","Email","Papel","Criado em","Ativo","Ações"].map(h=>(
              <TableCell key={h}>{h}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.users.map(u=>(
            <TableRow key={u.id} hover>
              <TableCell>{u.name||"—"}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.role}</TableCell>
              <TableCell>{new Date(u.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                {u.active ? "Sim" : "Não"}
              </TableCell>
              <TableCell>
                <Box display="flex" gap={1} justifyContent="flex-end">
                  <Button size="small" onClick={()=>router.push(`/admin/users/${u.id}`)}>
                    Editar
                  </Button>
                  <IconButton
                    size="small"
                    disabled={toggling===u.id}
                    onClick={()=>handleToggle(u.id, !u.active)}
                  >
                    {u.active ? <IconButtonOff /> : <IconButton />}
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
