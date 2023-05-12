import React, {useRef, useMemo, useState, useEffect} from 'react';
import mapboxgl from 'mapbox-gl'; 
import Map, {Marker, Popup} from 'react-map-gl';
import Pin from '@/Components/Pin';
import { Head, Link } from '@inertiajs/react';
import { Layout } from '@/Layouts/Layout';
import { Card, Container, Stack, Chip, CardActions, MenuItem, Button, Grid, CardHeader, Divider, TextField, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useForm } from '@inertiajs/react';
import ValidationErrors from '@/Components/ValidationErrors';
import travelPicture from '@/../assets/travel.jpg';
import 'mapbox-gl/dist/mapbox-gl.css'
import interestPoints from '@/Pages/Trips/interest-points';

mapboxgl.accessToken = 'pk.eyJ1IjoiaXVtYWNvIiwiYSI6ImNsaDB5ZGx6cDB5Y2YzZ3BjNTkzamUzMnIifQ.2egcxKPy3NuRaNLGyHLP2A';

export default function InterestPoints(props) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    const [popupInfo, setPopupInfo] = useState(null);
    const pins = useMemo(
        () =>
          interestPoints.map((pin, index) => (
            <Marker
              key={`marker-${index}`}
              longitude={pin.geoCode.longitude}
              latitude={pin.geoCode.latitude}
              anchor="bottom"
              onClick={e => {
                // If we let the click event propagates to the map, it will immediately close the popup
                // with `closeOnClick: true`
                console.log(pin);
                e.originalEvent.stopPropagation();
                setPopupInfo(pin);
              }}
            >
              <Pin />
            </Marker>
          )),
        []
      );
    

    useEffect(() => {
    if(!mapContainer.current) return; // wait for mapContainer to initialize
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [lng, lat],
    zoom: zoom
    });
    });
    
    useEffect(() => {
    if(!mapContainer.current) return; // wait for mapContainer to initialize
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    });
    });

    function handleClick() {
        router.get(route('add.trip.form'))
    }
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
                        Our top picks for you:
                        </Typography>
                    </div>
                </Stack>

                <Card  sx={{maxWidth:{xs:"100%", md:"80%"}, pt:3, borderRadius: 5 , display:"flex", flexDirection:{xs:"column", md:"row"}}}>
                    <CardMedia
                        component="img"
                        image={travelPicture}
                        alt="Travel picture"
                        sx={{maxWidth:{xs:"100%", md:"40%"}}}
                    />
                    <Box sx={{minWidth:{xs:"100%", md:"60%"}, display:"flex" , direction:"row", pb:0}}>
                    <CardContent sx={{ display:"flex", flexDirection:"column",maxWidth:"100%", py:1}}>
                    <Stack 
                    spacing={2}
                    sx={{ mb: 1 }}
                    >
                    <Typography  variant="h5">
                        Palatul Schonburnn
                    </Typography>
                    <Typography variant="body1">
                        Category: Restaurant
                    </Typography>
                    </Stack>

                    <Container sx={{ mt:"auto"}}>
                    <Chip label="Chip Outlined" variant="outlined" sx={{ m:0.25}}/>
                    <Chip label="Chip Outlined" variant="outlined" sx={{ m:0.25}} />
                    <Chip label="Chip Outlined" variant="outlined" sx={{ m:0.25}} />
                    <Chip label="Chip Outlined" variant="outlined" sx={{ m:0.25}} />
                    <Chip label="Chip Outlined" variant="outlined" sx={{ m:0.25}} />
                    <Chip label="Chip Outlined" variant="outlined" sx={{ m:0.25}} />
                    </Container>
                    
                    </CardContent>
                </Box>
                    
                </Card>

            </Container>
            <Container maxWidth="lg">
            <Box sx={{ py: 5 }}>
            <Typography variant="h4">
                    All our interest points for you:
                </Typography>
            </Box>
            </Container>
            <Box
            sx={{
                flexGrow: 1,
                py: 3,
                display: 'flex',
                justifyContent: 'center'
              }}
            >
                 
                <Map
                initialViewState={{
                longitude: interestPoints[0].geoCode.longitude,
                latitude: interestPoints[0].geoCode.latitude,
                zoom: 12
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                style={{width: '75vw', height: '70vh'}}
                >
                {interestPoints.map((pin, index) => {
                <Marker key={`marker-${index}`} longitude={pin.geoCode.longitude} latitude={pin.geoCode.latitude}>
                <Pin size={20} onClick={() => setSelectedPin(pin)} />
                </Marker>
                })}
                {pins}
                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={Number(popupInfo.geoCode.longitude)}
                        latitude={Number(popupInfo.geoCode.latitude)}
                        onClose={() => setPopupInfo(null)}
                    >
                        <Box>
                        <Stack spacing={1}>
                        <Typography variant="subtitle1">
                        {popupInfo.name}
                        </Typography>
                        <Typography variant="subtitle2">
                        Category: {popupInfo.category}
                        </Typography>
                        <Box sx={{ mt:"auto", px:0}}>
                            {popupInfo.tags.map((tag, index) => (
                                <Chip key={`chip-${index}`} label={tag} variant="outlined" sx={{ m:0.25}}/>
                            ))}
                        </Box>
                        </Stack>
                        </Box>
                    </Popup>
                    )}
                </Map>
           </Box> 
            </Box>
            </>    

         
        </Layout>

    );
}
