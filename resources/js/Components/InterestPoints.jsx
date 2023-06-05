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
    let topPlaces = props.places.slice(0, 3);
    const pins = useMemo(
        () =>
          props.places.map((pin, index) => (
            <Marker
              key={`marker-${index}`}
              longitude={pin.geoCode.lon}
              latitude={pin.geoCode.lat}
              anchor="bottom"
              onClick={e => {
                // If we let the click event propagates to the map, it will immediately close the popup
                // with `closeOnClick: true`
                e.originalEvent.stopPropagation();
                setPopupInfo(pin);
                console.log(pin);

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

    useEffect(() => {
        console.log(popupInfo);
    }, [popupInfo]);

    function handleClick() {
        router.get(route('add.trip.form'))
    }
    return (
             <Box mt={5}>
            <Container maxWidth="lg">
                <Stack spacing={3}>
                    <div>
                        <Typography variant="h4">
                        Our top picks for you:
                        </Typography>
                    </div>
                </Stack>

                {topPlaces.map((place, index) =>  <Card key={index}  sx={{maxWidth:{xs:"100%", md:"80%"}, pt:3, borderRadius: 5 , display:"flex", flexDirection:{xs:"column", md:"row"}}}>
                    <CardMedia
                        component="img"
                        image={place.photoUrl}
                        alt="Travel picture"
                        sx={{maxWidth:{xs:"100%", md:"40%", padding: "1em 1em 0 1em", objectFit: "cover" , height:"17rem"}}}
                    />
                    <Box sx={{minWidth:{xs:"100%", md:"60%"}, display:"flex" , direction:"row", pb:0}}>
                    <CardContent sx={{ display:"flex", flexDirection:"column",maxWidth:"100%", py:1}}>
                    <Stack 
                    spacing={2}
                    sx={{ mb: 1 }}
                    >
                    <Typography  variant="h5">
                        {place.name}
                    </Typography>
                    <Typography variant="body1">
                        Category: {place.category ? place.category : "No category available"}
                    </Typography>
                    
                    </Stack>

                    <Container sx={{ mt:"auto"}}>
                    {place.description && <Typography variant="body2"> {place.description} </Typography> }
                    {place.rating && <Typography variant="body2"> Rating: {place.rating}/10 </Typography> }
                    {place.address && <Typography variant="body2"> Address: {place.address} </Typography> }
                    </Container>
                    
                    </CardContent>
                </Box>
                    
                </Card>)} 

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
                longitude: props.places[0].geoCode.lon,
                latitude: props.places[0].geoCode.lat,
                zoom: 12
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                style={{width: '75vw', height: '70vh'}}
                >
               
                {pins}
                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={Number(popupInfo.geoCode.lon)}
                        latitude={Number(popupInfo.geoCode.lat)}
                        onClose={() => setPopupInfo(null)}
                    >
                        <Box>
                        <Stack spacing={1}>
                        <Typography variant="subtitle1">
                        {popupInfo.name}
                        </Typography>
                        <Typography variant="subtitle2">
                        Category: {popupInfo.category ? popupInfo.category : "No category available"}
                        </Typography>
                        <Box sx={{ mt:"auto", px:0}}>
                            {popupInfo.description && <Typography variant="body2"> {popupInfo.description} </Typography> }
                            {popupInfo.rating && <Typography variant="body2"> Rating: {popupInfo.rating}/10 </Typography> }
                            {popupInfo.address && <Typography variant="body2"> Address: {popupInfo.address} </Typography> }
                        </Box>
                        </Stack>
                        </Box>
                    </Popup>
                    )}
                </Map>
           </Box> 
            </Box>
         
       

    );
}
