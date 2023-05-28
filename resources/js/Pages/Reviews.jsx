import {useState, useEffect} from 'react';
import { Head, Link } from '@inertiajs/react';
import { Layout } from '@/Layouts/Layout';
import { Card, Container, Stack, CardActions, MenuItem, Button, Grid, CardHeader, Divider, TextField, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useForm } from '@inertiajs/react';
import ReviewsForm from '@/Components/ReviewsForm';
import ValidationErrors from '@/Components/ValidationErrors';
import ReviewTable from '@/Components/ReviewTable';
export default function Reviews(props) {
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
                        Find reviews for the city you are traveling to
                        </Typography>
                    </div>

                    <ReviewsForm {...props}/>

                    {props.reviews && props.reviews.length == 0 && <Typography variant="h6">No reviews found</Typography>}
                    {props.reviews && props.reviews.length > 0 && <ReviewTable reviews={props.reviews}/>}
                </Stack>
            </Container>

            </Box>
            </>    
        </Layout>

    );
}
