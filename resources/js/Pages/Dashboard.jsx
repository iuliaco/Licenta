import React, { useEffect, useRef, useMemo, useState } from "react";
import { router } from "@inertiajs/react";
import { Layout } from "@/Layouts/Layout";
import mapboxgl from 'mapbox-gl'; 
import Map, {Marker, Popup} from 'react-map-gl';
import Pin from '@/Components/Pin';
import 'mapbox-gl/dist/mapbox-gl.css'

import {
  Card,
  CardActions,
  Button,
  Grid,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import travelPicture from "@/../assets/travel.jpg";


mapboxgl.accessToken = 'pk.eyJ1IjoiaXVtYWNvIiwiYSI6ImNsaDB5ZGx6cDB5Y2YzZ3BjNTkzamUzMnIifQ.2egcxKPy3NuRaNLGyHLP2A';

function FutureTrip({ futureTrips }) {
  function handleClick() {
    router.get(route("add.trip.form"));
  }
  return (
    <>
      {futureTrips && futureTrips.length > 0 ? (
        <>
          <Box ml={6} my={4}>
            <Typography variant="h4">Your future trips</Typography>
          </Box>
          <Box
            component="main"
            display="flex"
            justifyContent="center"
            sx={{
              flexGrow: 1,
              my: 1,
              ml: 6,
            }}
          >
            <Grid container alignItems="stretch" spacing={1}>
              {futureTrips.map((card) => (
                <Grid item xs={12} md={4} lg={4} align="center" style={{display: 'flex'}}>
                  <Card sx={{ maxWidth: 345 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}} raised>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={`https://flagcdn.com/h120/${card.country.code.toLowerCase()}.png`}
                        alt="green iguana"
                        sx={{ padding: "1em 1em 0 1em", height: "14em" }}
                      ></CardMedia>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Trip to {card.country.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {card.start_date + " - " + card.start_date}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {card.description}
                        </Typography>
                        {card.subtrips.map((subtrip, index) => (
                          <Typography
                            key={index}
                            color="text.secondary"
                            variant="body2"
                          >
                            {subtrip.city.name} - {subtrip.start_date} -{" "}
                            {subtrip.end_date}
                          </Typography>
                        ))}
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
      ) : (
        <Box
          component="main"
          display="flex"
          justifyContent="center"
          sx={{
            flexGrow: 1,
            my: { xs: 2, md: 10 },
          }}
        >
          <Card
            sx={{
              maxWidth: { xs: "100%", md: "80%" },
              borderRadius: 5,
              display: "flex",
              flexDirection: { xs: "column-reverse", md: "row" },
            }}
          >
            <Box
              sx={{
                minWidth: { xs: "100%", md: "50%" },
                display: "flex",
                alignItems: "center",
                direction: "row",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography component="div" variant="h5">
                  You don't have any trips planned yet. Time to change that!
                </Typography>

                <Button
                  size="large"
                  variant="contained"
                  sx={{ my: 5 }}
                  onClick={handleClick}
                >
                  Add a new trip
                </Button>
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              image={travelPicture}
              alt="Travel picture"
              sx={{ maxWidth: { xs: "100%", md: "50%" } }}
            />
          </Card>
        </Box>
      )}
    </>
  );
}

function PastTrip({ pastTrips }) {
  function handleClick() {
    router.get(route("add.trip.form"));
  }
  return (
    <>
      {pastTrips && pastTrips.length > 0 ? (
        <>
          <Box ml={6} my={4}>
            <Typography variant="h4">Your past trips</Typography>
          </Box>
          <Box
            component="main"
            display="flex"
            justifyContent="center"
            sx={{
              flexGrow: 1,
              my: 1,
              ml: 6,
            }}
          >
            <Grid container alignItems="stretch" spacing={1}>
              {pastTrips.map((card) => (
                <Grid item xs={12} md={4} lg={4} align="center" style={{display: 'flex'}}>
                  <Card style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}} sx={{ maxWidth: 345 }} raised>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={`https://flagcdn.com/h120/${card.country.code.toLowerCase()}.png`}
                        alt="green iguana"
                        sx={{ padding: "1em 1em 0 1em", height: "14em" }}
                      ></CardMedia>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Trip to {card.country.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {card.start_date + " - " + card.start_date}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {card.description}
                        </Typography>
                        {card.subtrips.map((subtrip, index) => (
                          <Typography
                            key={index}
                            color="text.secondary"
                            variant="body2"
                          >
                            {subtrip.city.name} - {subtrip.start_date} -{" "}
                            {subtrip.end_date}
                          </Typography>
                        ))}
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
      ) : (
        <Box
          component="main"
          display="flex"
          justifyContent="center"
          sx={{
            flexGrow: 1,
            my: { xs: 2, md: 10 },
          }}
        >
          <Card
            sx={{
              maxWidth: { xs: "100%", md: "80%" },
              borderRadius: 5,
              display: "flex",
              flexDirection: { xs: "column-reverse", md: "row" },
            }}
          >
            <Box
              sx={{
                minWidth: { xs: "100%", md: "50%" },
                display: "flex",
                alignItems: "center",
                direction: "row",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography component="div" variant="h5">
                  Have you been somewhere recently? Add a new trip!
                </Typography>

                <Button
                  size="large"
                  variant="contained"
                  sx={{ my: 5 }}
                  onClick={handleClick}
                >
                  Add a new trip
                </Button>
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              image={travelPicture}
              alt="Travel picture"
              sx={{ maxWidth: { xs: "100%", md: "50%" } }}
            />
          </Card>
        </Box>
      )}
    </>
  );
}

function AllPlacesMap({ allTrips }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [popupInfo, setPopupInfo] = useState(null);
  const pins = useMemo(
    () => {
        let overallIndex = 0;
        return  (
        allTrips.map((pin) =>
        pin.subtrips.map((subtrip) => {
            const currentOverallIndex = overallIndex++;
            return (
          <Marker
            key={`marker-${currentOverallIndex}`}
            longitude={subtrip.city.lon}
            latitude={subtrip.city.lat}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(subtrip);
              console.log(subtrip);
            }}
          >
            <Pin />
          </Marker>
        )}
        )
      )
    )}
      ,
    []
  );

  useEffect(() => {
    if (!mapContainer.current) return; // wait for mapContainer to initialize
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!mapContainer.current) return; // wait for mapContainer to initialize
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <>
    <Box ml={6}  sx={{ py: 5 }}>
            <Typography variant="h4">
                    All the cities you've been to:
                </Typography>
            </Box>
      <Box
        sx={{
          flexGrow: 1,
          py: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Map
          initialViewState={{
            longitude: 0,
            latitude: 0,
            zoom: 1,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          style={{ width: "75vw", height: "70vh" }}
        >
          {pins}
          {popupInfo && (
            <Popup
              anchor="top"
              longitude={Number(popupInfo.city.lon)}
              latitude={Number(popupInfo.city.lat)}
              onClose={() => setPopupInfo(null)}
            >
              <Box>
                <Stack spacing={1}>
                  <Typography variant="subtitle1">{popupInfo.name}</Typography>
                  <Typography variant="subtitle2">
                    City:{" "}
                    {popupInfo.city.name}
                  </Typography>
                  <Box sx={{ mt: "auto", px: 0 }}>
                    {popupInfo.description && (
                      <Typography variant="body2">
                        {" "}
                        {popupInfo.description}{" "}
                      </Typography>
                    )}
                    {popupInfo.rating && (
                      <Typography variant="body2">
                        {" "}
                        Rating: {popupInfo.rating}/10{" "}
                      </Typography>
                    )}
                  </Box>
                </Stack>
              </Box>
            </Popup>
          )}
        </Map>
      </Box>
    </>
  );
}

export default function Dashboard(props) {
  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <Layout auth={props.auth}>
      <>
        <Box
          component="main"
          display="flex"
          justifyContent="center"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Stack spacing={1}>
            <Typography variant="h4">
              Hello, {props.auth.user.username}
            </Typography>
            <Typography variant="h5">What are your plans for today?</Typography>
          </Stack>
          </Box>

        <FutureTrip futureTrips={props.futureTrips} />
        <PastTrip pastTrips={props.pastTrips} />

        <AllPlacesMap allTrips={props.allTrips} />
      </>
    </Layout>
  );
}
