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
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import type { ActionResult } from "@/actions/types";
import { deleteCouponAction } from "@/actions/promotions/deleteCoupon";

interface Props {
  result: ActionResult<{
    coupons: Array<{
      id: string;
      code: string;
      discountType: string;
      value: number;
      validFrom: string;
      validUntil: string;
      maxUses?: number;
      usesCount: number;
      active: boolean;
    }>;
    totalCount: number;
    page: number;
    pageSize: number;
  }>;
}

export default function AdminPromotionList({ result }: Props) {
  const router = useRouter();
  const { success, data, error } = result;
  const [deleting, setDeleting] = useState<string|null>(null);

  if (!success) return <Typography color="error">{error.message}</Typography>;
  if (data.coupons.length === 0) return <Typography>Nenhum cupom ativo.</Typography>;

  const handleDelete = async (id: string) => {
    setDeleting(id);
    const fd = new FormData();
    fd.append("id", id);
    await deleteCouponAction(fd);
    setDeleting(null);
    router.refresh();
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {["Código","Tipo","Valor","Válido de","até","Usos/Max","Ativo","Ações"].map(h=>(
              <TableCell key={h}>{h}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.coupons.map(c=>(
            <TableRow key={c.id} hover>
              <TableCell>{c.code}</TableCell>
              <TableCell>{c.discountType}</TableCell>
              <TableCell>
                {c.discountType==="PERCENTAGE" ? `${c.value}%` : `R$ ${c.value.toFixed(2)}`}
              </TableCell>
              <TableCell>{new Date(c.validFrom).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(c.validUntil).toLocaleDateString()}</TableCell>
              <TableCell>
                {c.usesCount}/{c.maxUses ?? "∞"}
              </TableCell>
              <TableCell>{c.active ? "Sim" : "Não"}</TableCell>
              <TableCell>
                <Box display="flex" gap={1} justifyContent="flex-end">
                  <Button size="small" onClick={()=>router.push(`/admin/promotions/${c.id}`)}>
                    Editar
                  </Button>
                  <IconButton
                    size="small"
                    color="error"
                    disabled={deleting===c.id}
                    onClick={()=>handleDelete(c.id)}
                  >
                    <DeleteIcon />
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
