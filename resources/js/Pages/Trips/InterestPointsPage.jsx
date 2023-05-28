import React, {useRef, useMemo, useState, useEffect} from 'react';
import { Head, Link } from '@inertiajs/react';
import { Layout } from '@/Layouts/Layout';
import { Card, Container, Stack, Chip, CardActions, MenuItem, Button, Grid, CardHeader, Divider, TextField, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useForm } from '@inertiajs/react';
import ValidationErrors from '@/Components/ValidationErrors';
import InterestPoints from '../../Components/InterestPoints';
import InterestPointsForm from '@/Components/InterestPointsForm';

export default function InterestPointsPage(props) {

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
            <InterestPointsForm {...props}/>
            {props.places && <InterestPoints {...props}/>}

        </Box>
        </>
        </Layout>

    );
}