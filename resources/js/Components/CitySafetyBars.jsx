import {useState, useEffect} from 'react';
import { Head, Link } from '@inertiajs/react';
import { Layout } from '@/Layouts/Layout';
import { Card, Container, LinearProgress, Stack, CardActions, MenuItem, Button, Grid, CardHeader, Divider, TextField, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useForm } from '@inertiajs/react';
import ValidationErrors from '@/Components/ValidationErrors';

export default function CitySafetyBars(props) {
    
    return (
        <Card>
                <CardHeader
                subheader="Safety"
                title="City raport"
                />
                <Divider />
                <CardContent>
                <Stack 
                    direction="row"
                    spacing={3}
                    sx={{ maxWidth: 400 }}
                >
                    <Grid container alignItems="center" justifyContent="center">
                        <LinearProgress variant="determinate" value="15" style={{ flexGrow: 1 }} />
                    </Grid>
                    <Typography variant="h6">
                        69%
                    </Typography>
                    
                </Stack>
                </CardContent>
        </Card>

    );
}