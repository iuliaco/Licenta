import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { GuestNav } from './GuestNav';
import { Layout } from './Layout';

export default function Guest({ children, auth }) {
    return (
        <Layout auth={auth}>
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            
            

            <Box m={7} sx={{width: { xs: '90%', md: '25%' }, minHeight: { xs: '50vh', md: 'auto' }  }} >
                <Paper rounded sx={{ overflow: 'hidden' }} elevation={3} >
                    <Card>
                        

                        <CardContent>
                        {children}
                        </CardContent>
                    </Card>
                </Paper>

            </Box>
           
    
           
        </div>
        </Layout>
        
    );
}
