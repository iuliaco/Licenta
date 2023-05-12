import {useState, useEffect} from 'react';
import { Head, Link } from '@inertiajs/react';
import { Layout } from '@/Layouts/Layout';
import { Card, Container, Stack, CardActions, MenuItem, Button, Grid, CardHeader, Divider, TextField, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useForm } from '@inertiajs/react';
import AddTripForm from '@/Components/AddTripForm';


export default function CreateTripOld(props) {
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
                        Add a new trip
                        </Typography>
                        
                    </div>

                    <AddTripForm countries={props.countries} />
                </Stack>
            </Container>

            </Box>
            </>    
        </Layout>

    );
}
