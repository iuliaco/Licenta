import {useState, useEffect} from 'react';
import { Head, Link } from '@inertiajs/react';
import { Layout } from '@/Layouts/Layout';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useForm } from '@inertiajs/react';
import ValidationErrors from '@/Components/ValidationErrors';
import { makeStyles } from '@mui/styles';

export default function GoodPriceTable(props) {

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Your sum</TableCell>
              <TableCell>Minimum</TableCell>
              <TableCell >First</TableCell>
              <TableCell>Medium</TableCell>
              <TableCell >Third</TableCell>
              <TableCell >Maximum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell ></TableCell>
              <TableCell >100$</TableCell>
              <TableCell >50</TableCell>
              <TableCell >75</TableCell>
              <TableCell >150</TableCell>
              <TableCell >300 </TableCell>
              <TableCell >400</TableCell>
            </TableRow>
            <TableRow>
            <TableCell colSpan={2}>Conclusion</TableCell>
            <TableCell >You purchased the flight at a very cheap price</TableCell>
          </TableRow>
            </TableBody>
      </Table>
    </TableContainer>

    );

}