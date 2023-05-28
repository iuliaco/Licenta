import {useState, useEffect} from 'react';
import { Head, Link } from '@inertiajs/react';
import { Layout } from '@/Layouts/Layout';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useForm } from '@inertiajs/react';
import ValidationErrors from '@/Components/ValidationErrors';
import { makeStyles } from '@mui/styles';

function getPriceMessage(fullPrice, priceData) {
  const rankings = {
    MINIMUM: "cheap",
    FIRST: "good",
    MEDIUM: "average",
    THIRD: "above average",
    MAXIMUM: "expensive",
  };
  // Sort the price data array based on the absolute difference from the fullPrice
  const sortedPriceData = priceData.sort(
    (a, b) => Math.abs(parseFloat(a.amount) - parseFloat(fullPrice)) - Math.abs(parseFloat(b.amount) - parseFloat(fullPrice))
  );

  if (sortedPriceData.length > 0) {
    // Get the closest price object
    const closestPrice = sortedPriceData[0];
    const closestAmount = closestPrice.amount;
    const quartileRanking = closestPrice.quartileRanking;

    // Get the descriptive message
    const message = `You purchased your flight at a price close to ${closestAmount}€. It is ${rankings[quartileRanking]}.`;

    return message;
  }

  return "Price information not available.";
}


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
              <TableCell >{props.price.original_price} €</TableCell>
              <TableCell >{props.price.price[1].amount} €</TableCell>
              <TableCell >{props.price.price[0].amount} €</TableCell>
              <TableCell >{props.price.price[2].amount} €</TableCell>
              <TableCell >{props.price.price[3].amount} €</TableCell>
              <TableCell >{props.price.price[4].amount} €</TableCell>
            </TableRow>
            <TableRow>
            <TableCell colSpan={2}>Conclusion</TableCell>
            <TableCell > {getPriceMessage(props.price.original_price, props.price.price)} </TableCell>
          </TableRow>
            </TableBody>
      </Table>
    </TableContainer>

    );

}