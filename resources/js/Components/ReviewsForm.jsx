import {useState, useEffect} from 'react';
import { Head, Link } from '@inertiajs/react';
import { Layout } from '@/Layouts/Layout';
import { Card, Container, Stack, CardActions, MenuItem, Button, Grid, CardHeader, Divider, TextField, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useForm } from '@inertiajs/react';
import CitySafetyBars from './CitySafetyBars';
import ValidationErrors from '@/Components/ValidationErrors';

export default function ReviewsForm(props) {
    const { data, setData, get, processing, errors, reset } = useForm({
        country_name: props.country? props.country.name : '',
        city_name: props.city? props.city.name : '',
    });
    const [currentCountry, setCurrentCountry] = useState(props.country? props.country.name : '');
    const [cities, setCities] = useState(props.cities? props.cities : []);

    useEffect(() => {
        let active = true;

        const fetchCities = async () => {
            const response = await fetch('/api/safety/' + props.countries.find(country => country.name == currentCountry).id);
            const data = await response.json();
            if (active) {
                setCities(data);
            }
        }

        if(currentCountry != '') {
            fetchCities();

        }
        
        return () => {
            active = false;
        }

    }, [currentCountry]);

    
    const handleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
        if(event.target.name == "country_name"){
            setCurrentCountry(event.target.value);
        }
        console.log(event.target.name);
    };

    const handleSubmit = (event) => {
        console.log("Am apasat");
        console.log(data);

        event.preventDefault();route
        console.log(event);
        get(route('reviews.show'));
    
    };
    
    return (
        <>
        <Card>
            <form onSubmit={handleSubmit}>

                <CardHeader
                // subheader="Safety"
                title="Check what another user said about this city"
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
                name="country_name"
                value={data.country_name}
                onChange={handleChange}
                defaultValue={data.country_name}
                helperText="The country of the city"
                >
                {props.countries.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                    {option.name}
                    </MenuItem>
                ))}
                </TextField>
                <TextField
                id="outlined-select-origin-country"
                select
                label="Select"
                name="city_name"
                value={data.city_name}
                onChange={handleChange}
                defaultValue={data.city_name}
                helperText="The city"
                >
                {cities.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
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
                    Find reviews
                </Button>
                </CardActions>
            </form>
        </Card>
        </>
    );
}

