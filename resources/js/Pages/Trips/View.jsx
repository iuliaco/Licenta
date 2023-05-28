import {useState, useEffect} from 'react';
import { Head, Link } from '@inertiajs/react';
import { Layout } from '@/Layouts/Layout';
import { Card, Container, Stack, CardActions, MenuItem, Button, Grid, CardHeader, Divider, TextField, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useForm } from '@inertiajs/react';
import CitySafetyFrom from '@/Components/CitySafetyForm';
import ValidationErrors from '@/Components/ValidationErrors';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import UpdateTrip from '@/Components/UpdateTrip';
import ShowTripFullDetails from '@/Components/ShowTripFullDetails';


  function Row(props) {
    const { row, countries } = props;
    const [open, setOpen] = useState(false);
    function consoleAndSetopen() {
      console.log(open);
      setOpen(!open);
    }

    return (
      <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => consoleAndSetopen()}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
          {row.country.name}
          </TableCell>
          <TableCell align="right">{row.origin_country? row.origin_country.name: "Not provided"}</TableCell>
          <TableCell align="right">{row.start_date ? row.start_date: "Not provided"}</TableCell>
          <TableCell align="right">{row.end_date}</TableCell>
          <TableCell align="right">{row.description ? row.description : "No description provided."}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                {/* <UpdateTrip trip={row} countries={props.countries} />                 */}
                <ShowTripFullDetails trip={row} countries={props.countries} />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }


  
export default function AllTrips(props) {

    useEffect(() => {
        console.log(props);
        console.log(props.trips);
    }, []);
    return (
        <Layout
            auth = {props.auth}
        >
            <>
            <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
            <Container maxWidth="lg">
                <Stack spacing={5}>
                    <div>
                        <Typography variant="h4">
                        All your trips
                        </Typography>
                    </div>

                    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Destination</TableCell>
            <TableCell align="right">Source country</TableCell>
            <TableCell align="right">Arrival date</TableCell>
            <TableCell align="right">Departure date</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {props.trips && props.trips.map((row) => (
            <Row key={row.name} row={row} countries={props.countries} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>

                </Stack>
            </Container>

            </Box>
            </>    
        </Layout>

    );
}
