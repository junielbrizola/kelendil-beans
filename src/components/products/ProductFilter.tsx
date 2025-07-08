// src/components/product/ProductFilter.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ProductFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [page, setPage] = useState(Number(searchParams.get('page') || '1'));
  const [pageCount, setPageCount] = useState(1);

  const updateUrl = (newPage = page) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (type) params.set('type', type);
    params.set('page', String(newPage));
    router.push(`/?${params.toString()}`);
  };

  useEffect(() => {
    setPage(1);
    updateUrl(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, type]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    updateUrl(value);
  };

  useEffect(() => {
    const total = Number(searchParams.get('totalPages'));
    if (total > 0) setPageCount(total);
  }, [searchParams]);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
      <TextField
        label="Buscar"
        value={search}
        onChange={e => setSearch(e.target.value)}
        size="small"
      />
      <FormControl size="small">
        <InputLabel id="type-filter-label">Tipo</InputLabel>
        <Select
          labelId="type-filter-label"
          label="Tipo"
          value={type}
          onChange={e => setType(e.target.value)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="COFFEE">Café</MenuItem>
          <MenuItem value="COCOA">Cacau</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ flexGrow: 1 }} />
      <Pagination
        count={pageCount}
        page={page}
        onChange={handlePageChange}
        color="primary"
        shape="rounded"
        size="small"
      />
    </Box>
  )
}
