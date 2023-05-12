import React from 'react';
import { Link, Head } from '@inertiajs/react';
import { GuestNav } from '@/Layouts/GuestNav';
import Grid from "@mui/material/Grid";
import { Layout } from '@/Layouts/Layout';
import { Box,
         Container,
         Typography,
         Button,
         Card
} from '@mui/material';
import travelPicture from '@/../assets/travel.jpg';
import map from '@/../assets/map.jpg';
import Information from '@/Components/Information';
import Featuring from '@/Components/Featuring';


export default function Welcome(props) {

    React.useEffect(() => {
        document.body.style.backgroundColor = "rgb(240, 242, 245)";
        
    })

    return (
        <>
            <Head title="Welcome" />
            {/* background-color: rgb(240, 242, 245); */}
            <Layout 
            auth = {props.auth}
            >
            <Box
                minHeight="75vh"
                width="100%"
                sx={{
                    backgroundColor: "#FAACA8",
                    // backgroundImage: `linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)`,
                    backgroundImage: `linear-gradient(195deg, rgba(66, 66, 74, 0.6), rgba(25, 25, 25, 0.6)), url(${map})`,

                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "grid",
                    placeItems: "center",
                  }}
            >  
                <Container fluid>
                    <Grid
                        container
                        item
                        xs={12}
                        lg={8}
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        sx={{ mx: "auto", textAlign: "center" }}
                    >
                        <Typography
                        variant="h1"
                        color="white"
                        >
                        Travel solo, but never alone.
                        </Typography>
                        <Typography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
                        We&apos;re constantly trying to express ourselves and actualize our dreams. Explore without limits or compromises.
                        </Typography>
                    </Grid>
                </Container>
            </Box>    
            <Card
                sx={{
                p: 2,
                mx: { xs: 2, lg: 3 },
                mt: -8,
                mb: 4,
                }}
            >
                <Information />
                <Featuring />
            </Card>
            <Grid>
                <Grid item container justifyContent="center" alignItems="center" my={4}>
                &copy; SoloTravel
                </Grid>
            </Grid>
            </Layout>
        
        </>
    );
}
