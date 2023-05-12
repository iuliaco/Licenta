import {useState, useEffect} from 'react';
import { Head, Link } from '@inertiajs/react';
import { Layout } from '@/Layouts/Layout';
import { Card, Container, InputAdornment, FormControl, OutlinedInput, InputLabel, Stack, CardActions, MenuItem, Button, Grid, CardHeader, Divider, TextField, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useForm } from '@inertiajs/react';
import ValidationErrors from '@/Components/ValidationErrors';
import { makeStyles } from '@mui/styles';
import GoodPriceTable from './GoodPriceTable';

const useStyles = makeStyles((theme) => ({
    root: {
      "& .Mui-root": {
          padding: 0,
      },
      "& .Mui-focused": {
          borderColor: "transparent!important",
          outline: "0!important",
        }
    }
  }));

export default function CountryAirportForm(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        country_id_from: '',
        iata_code_from: '',
        country_id_to: '',
        iata_code_to: '',
        amount: ''
    });

    const [currentCountryFrom, setCurrentCountryFrom] = useState(0);
    const [iataCodesFrom, setIataCodesFrom] = useState([]);
    const [currentCountryTo, setCurrentCountryTo] = useState(0);
    const [iataCodesTo, setIataCodesTo] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        let active = true;

        const fetchAirports = async () => {
            const response = await fetch('/api/iata-codes/' + currentCountryFrom);
            const data = await response.json();
            if (active) {
                setIataCodesFrom(data);
            }
        }

        fetchAirports();

        return () => {
            active = false;
        }

    }, [currentCountryFrom]);

    useEffect(() => {
        let active = true;

        const fetchAirports = async () => {
            const response = await fetch('/api/iata-codes/' + currentCountryTo);
            const data = await response.json();
            if (active) {
                setIataCodesTo(data);
            }
        }

        fetchAirports();

        return () => {
            active = false;
        }

    }, [currentCountryTo]);

    
    const handleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
        if(event.target.name == "country_id_from"){
            setCurrentCountryFrom(event.target.value);
        }
        if(event.target.name == "country_id_to"){
            setCurrentCountryTo(event.target.value);
        }
    };

    const handleSubmit = (event) => {
        console.log("Am apasat");
        console.log(data);

        event.preventDefault();
        console.log(event);
        post(route('city.safety'));
    
    };
    
    return (
        <>
        <Card>
            <form onSubmit={handleSubmit}>

                <CardHeader
                subheader="Price analyser"
                title="Find if your plane ticket is expensive or not"
                />
                <Divider />
                <CardContent>
                <Stack
                    spacing={3}
                    sx={{ maxWidth: 400 }}
                >
        
                <TextField
                id="outlined-select-origin-country"
                select
                label="Select"
                name="country_id_from"
                value={data.country_id_from}
                onChange={handleChange}
                defaultValue={data.country_id_from}
                helperText="Your origin country"
                >
                {props.countries.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                    {option.name}
                    </MenuItem>
                ))}
                </TextField>
                <TextField
                id="outlined-select-origin-country"
                select
                label="Select"
                name="iata_code_from"
                value={data.iata_code_from}
                onChange={handleChange}
                defaultValue={data.iata_code_from}
                helperText="Your origin airport"
                >
                {iataCodesFrom.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                    {option.name}
                    </MenuItem>
                ))}
                </TextField>
                <TextField
                id="outlined-select-origin-country"
                select
                label="Select"
                name="country_id_to"
                value={data.country_id_to}
                onChange={handleChange}
                defaultValue={data.country_id_to}
                helperText="Your destination country"
                >
                {props.countries.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                    {option.name}
                    </MenuItem>
                ))}
                </TextField>
                <TextField
                id="outlined-select-origin-country"
                select
                label="Select"
                name="iata_code_to"
                value={data.iata_code_to}
                onChange={handleChange}
                defaultValue={data.iata_code_to}
                helperText="Your destination airport"
                >
                {iataCodesTo.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                    {option.name}
                    </MenuItem>
                ))}
                </TextField>
                <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                <OutlinedInput
                    name="amount"
                    value={data.amount}
                    onChange={handleChange}
                    className={classes.root}
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">€</InputAdornment>}
                    label="Amount"
                />
                </FormControl>
                <ValidationErrors errors={errors} />
                </Stack>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="contained" disabled={processing} type="submit"> 
                    Update
                </Button>
                </CardActions>
            </form>
        </Card>
        <GoodPriceTable />
        </>
    );
}

