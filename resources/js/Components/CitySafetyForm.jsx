import {useState, useEffect} from 'react';
import { Head, Link } from '@inertiajs/react';
import { Layout } from '@/Layouts/Layout';
import { Card, Container, Stack, CardActions, MenuItem, Button, Grid, CardHeader, Divider, TextField, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useForm } from '@inertiajs/react';
import CitySafetyBars from './CitySafetyBars';
import ValidationErrors from '@/Components/ValidationErrors';

export default function CitySafetyFrom(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        country_id: '',
        city_id: '',
    });
    const [currentCountry, setCurrentCountry] = useState(0);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        let active = true;

        const fetchCities = async () => {
            const response = await fetch('/api/safety/' + currentCountry);
            const data = await response.json();
            if (active) {
                setCities(data);
            }
        }

        fetchCities();

        return () => {
            active = false;
        }

    }, [currentCountry]);

    
    const handleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
        if(event.target.name == "country_id"){
            setCurrentCountry(event.target.value);
        }
        console.log(event.target.name);
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
                subheader="Safety"
                title="Find out how safe a city is"
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
                name="country_id"
                value={data.country_id}
                onChange={handleChange}
                defaultValue={data.country_id}
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
                name="city_id"
                value={data.city_id}
                onChange={handleChange}
                defaultValue={data.city_id}
                helperText="Your origin city"
                >
                {cities.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                    {option.name}
                    </MenuItem>
                ))}
                </TextField>
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
        <CitySafetyBars />
        </>
    );
}

