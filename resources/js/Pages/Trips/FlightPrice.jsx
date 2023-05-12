import {useState, useEffect} from 'react';
import { Head, Link } from '@inertiajs/react';
import { Layout } from '@/Layouts/Layout';
import { Card, Container, Stack, CardActions, MenuItem, Button, Grid, CardHeader, Divider, TextField, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useForm } from '@inertiajs/react';
import CitySafetyFrom from '@/Components/CitySafetyForm';
import ValidationErrors from '@/Components/ValidationErrors';
import CountryAirportForm from '@/Components/CountryAirportForm';

export default function CountrySafety(props) {
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
                <Stack spacing={3}>
                    <div>
                        <Typography variant="h4">
                        Flight Price
                        </Typography>
                    </div>

                    <CountryAirportForm countries={props.countries} />
                </Stack>
            </Container>

            </Box>
            </>    
        </Layout>

    );
}
