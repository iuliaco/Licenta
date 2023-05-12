import React from 'react';
import { router } from '@inertiajs/react';
import { Layout } from '@/Layouts/Layout';
import { Container, Card, CardActions, Button, Grid, CardActionArea, CardMedia, CardContent, Typography, Box, Stack } from '@mui/material';
import travelPicture from '@/../assets/travel.jpg';

const cardData = [
    {
      id: 1,
      title: 'Card 1',
      description: 'This is the description for card 1',
      imageUrl: 'https://flagcdn.com/h120/ro.png',
    },
    {
      id: 2,
      title: 'Card 2',
      description: 'This is the description for card 2',
      imageUrl: 'https://flagcdn.com/h120/gb.png',
    },
    {
      id: 3,
      title: 'Card 3',
      description: 'This is the description for card 3',
      imageUrl: 'https://flagcdn.com/h120/za.png',
    },
];

function FutureTrip() {
    function handleClick() {
        router.get(route('add.trip.form'))
    }
    return (
    <Box
    component="main"
    display="flex" justifyContent="center"
    sx={{
        flexGrow: 1,
        my:{xs:2, md:10}
    }}
    >
        <Card  sx={{maxWidth:{xs:"100%", md:"80%"} , borderRadius: 5 , display:"flex", flexDirection:{xs:"column-reverse", md:"row"}}}>
            <Box sx={{minWidth:{xs:"100%", md:"50%"}, display:"flex", alignItems:"center" , direction:"row"}}>
            <CardContent sx={{ display:"flex", flexDirection:"column", maxWidth:"100%", justifyContent:"center", alignItems:"center"}}>
            <Typography component="div" variant="h5">
                You don't have any trips planned yet. Time to change that!
            </Typography>
        
            <Button size="large" variant="contained" sx={{my:5}} onClick={handleClick}>
                Add a new trip
            </Button>
            
            </CardContent>
        </Box>
            <CardMedia
            component="img"
            image={travelPicture}
            alt="Travel picture"
            sx={{maxWidth:{xs:"100%", md:"50%"}}}
            />
        </Card>
    </Box>
    )
}

function PastTrip() {
    function handleClick() {
        router.get(route('add.trip.form'))
    }
    return (
    <Box
    component="main"
    display="flex" justifyContent="center"
    sx={{
        flexGrow: 1,
        my: {xs:2, md:10}
    }}
    >
         <Card  sx={{maxWidth:{xs:"100%", md:"80%"} , borderRadius: 5 , display:"flex", flexDirection:{xs:"column-reverse", md:"row"}}}>
            <Box sx={{minWidth:{xs:"100%", md:"50%"}, display:"flex", alignItems:"center" , direction:"row"}}>
            <CardContent sx={{ display:"flex", flexDirection:"column", maxWidth:"100%", justifyContent:"center", alignItems:"center"}}>
            <Typography component="div" variant="h5">
                Have you been somewhere recently? Add a new trip!
            </Typography>
        
            <Button size="large" variant="contained" sx={{my:5}} onClick={handleClick}>
                Add a new trip
            </Button>
            
            </CardContent>
        </Box>
            <CardMedia
            component="img"
            image={travelPicture}
            alt="Travel picture"
            sx={{maxWidth:{xs:"100%", md:"50%"}}}
            />
        </Card>
    </Box>
    )
}

export default function Dashboard(props) {
    return (
        <Layout
            auth = {props.auth}
        >
            <>
            <Box
            component="main"
            display="flex" justifyContent="center"
            sx={{
                flexGrow: 1,
                py: 8
            }}
            >
            <Stack spacing={1}>
                <Typography variant="h4">
                    Hello, {props.auth.user.username} 
                </Typography>
                <Typography variant="h5">
                    What are your plans for today?
                </Typography>
            </Stack>

            </Box>
            
            <FutureTrip />
            <PastTrip />
 
            <Box
            component="main"
            display="flex" justifyContent="center"
            sx={{
                flexGrow: 1,
                my: 1
            }}
            >
            <Grid
              container
              spacing={1}
            >
            {cardData.map((card) => (
                <Grid
                xs={12}
                md={6}
                lg={4}
                align="center"
              >
                    <Card sx={{ maxWidth: 345 }} raised>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            image={card.imageUrl}
                            alt="green iguana"
                            sx={{ padding: "1em 1em 0 1em",
                                    height:"14em" }}
                            >
                            </CardMedia>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                            Share
                            </Button>
                        </CardActions>
                    </Card>
                 </Grid>
            ))}

            </Grid>
            </Box>
            </>    
        </Layout>

    );
}
