import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid, Rating, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { router } from '@inertiajs/react'

const labels = {
  0.5: "Hated it",
  1: "Hated it",
  1.5: "Didn't like it",
  2: "Didn't like it",
  2.5: "It was ok",
  3: "It was ok",
  3.5: "It was good",
  4: "It was good",
  4.5: "It was excellent",
  5: "It was excellent",
};

function ShowTripOverwiew({ trip, handleDelete, handleUpdate }) {
  useEffect(() => {
    console.log(trip);
  });
  return (
    <>
      <Grid container>
        <Grid item my={2} xs={12} sm={12} md={12}>
          <Typography variant="h5">Trip to: {trip.country.name}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Typography variant="subtitle1">
            Source country:{" "}
            {trip.origin_country ? trip.origin_country.name : "Not specified."}
          </Typography>
          <Typography variant="subtitle1">
            Arrive: {trip.start_date ? trip.start_date : "Not specified."}
          </Typography>
          <Typography variant="subtitle1">
            Return: {trip.end_date ? trip.end_date : "Not specified."}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Typography variant="subtitle1">
            Source airport:{" "}
            {trip.departure_airport
              ? trip.departure_airport.name +
                " - " +
                trip.departure_airport.iata_code
              : "Not specified."}
          </Typography>
          {trip.departure_airport && (
            <Typography variant="subtitle1">
              Source airport size:{" "}
              {trip.departure_airport.size
                ? trip.departure_airport.size
                : "Not specified."}
            </Typography>
          )}
          <Typography variant="subtitle1">
            Destionation airport:{" "}
            {trip.returning_airport
              ? trip.returning_airport.name +
                " - " +
                trip.returning_airport.iata_code
              : "Not specified."}
          </Typography>
          {trip.returning_airport && (
            <Typography variant="subtitle1">
              Source airport size:{" "}
              {trip.returning_airport.size
                ? trip.returning_airport.size
                : "Not specified."}
            </Typography>
          )}
        </Grid>
        
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="subtitle1">
            Description:{" "}
            {trip.description ? trip.description : "Not specified."}
          </Typography>
        </Grid>
        {trip.rated && <Grid item xs={12} sm={12} md={12} >
        <Box
      mt={2} 
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box  sx={{ ml: 2}}>
            <Typography variant="body1">
              {labels[trip.rated]}
            </Typography>
            </Box>
          <Rating
            name="rated"
            value={trip.rated}
            readOnly
            size="large"
            emptyIcon={
              <StarIcon style={{ opacity: 1, fontSize: "1.875rem" }}/>
            }
          />
            
        </Box>
        </Grid> 
        }
         <Grid mt={2} item container xs={12} sm={12} md={12} sx={{ justifyContent: 'flex-end' }}>
         <Button variant="contained" onClick={handleDelete} color="error" sx={{marginRight:"auto"}}> 
            Delete
        </Button>
        <Button variant="contained"  onClick={handleUpdate} > 
            Update
        </Button>
        </Grid>
      </Grid>
    </>
  );
}

function ShowSubTripOverwiew({ subtrip, handleDelete, handleUpdate }) {
    useEffect(() => {
      console.log(subtrip);
    });
    return (
      <>
        <Grid container>
          <Grid item my={2} xs={12} sm={12} md={12}>
            <Typography variant="h5">City: {subtrip.city.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="subtitle1">
              Arrive: {subtrip.start_date ? subtrip.start_date : "Not specified."}
            </Typography>
            <Typography variant="subtitle1">
              Return: {subtrip.end_date ? subtrip.end_date : "Not specified."}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="subtitle1">
              Transport:
              {subtrip.transport
                ? subtrip.transport
                : "Not specified."}
            </Typography>
            
            <Typography variant="subtitle1">
              Hotel:
              {subtrip.hotel
                ? subtrip.hotel
                : "Not specified."}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="subtitle1">
              Description:
              {subtrip.description ? subtrip.description : "Not specified."}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="subtitle1">
              What I liked about the trip:
              {subtrip.liked ? subtrip.liked : "Not specified."}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="subtitle1">
            What I disliked about the trip: 
              {subtrip.disliked ? subtrip.disliked : "Not specified."}
            </Typography>
          </Grid>
          {subtrip.rated && <Grid item xs={12} sm={12} md={12} >
          <Box
        mt={2} 
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box  sx={{ ml: 2}}>
              <Typography variant="body1">
                {labels[subtrip.rated]}
              </Typography>
              </Box>
            <Rating
              name="rated"
              value={subtrip.rated}
                size="large"

              readOnly
              emptyIcon={
                <StarIcon style={{ opacity: 1, fontSize: "1.875rem" }}/>
              }
            />
              
          </Box>
          </Grid> 
          }
           <Grid mt={2} item container xs={12} sm={12} md={12} sx={{ justifyContent: 'flex-end' }}>
           <Button variant="contained" onClick={handleDelete} color="error" sx={{marginRight:"auto"}}> 
              Delete
          </Button>
          <Button variant="contained"  onClick={handleUpdate} > 
              Update
          </Button>
          </Grid>
        </Grid>
      </>
    );
  }
  

function TabPanel(props) {
  const { children, value, index, trip, handleDelete, handleUpdate, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && index == 0 && (
        <Box sx={{ p: 3 }}>
          <ShowTripOverwiew trip={trip} handleDelete={handleDelete} handleUpdate={handleUpdate} />
        </Box>
      )}
      {value === index && index != 0 && (
        <Box sx={{ p: 3 }}>
          <ShowSubTripOverwiew subtrip={trip} handleDelete={handleDelete} handleUpdate={handleUpdate} />
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ShowTripFullDetails({ trip }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDelete = (event) => {
    console.log("Am apasat delete");
    event.preventDefault();
    router.delete(route('trip.delete', { id: trip.id }));

};


const handleUpdate = (event) => {
    console.log("Am apasat update");
    event.preventDefault();
    router.get(route('edit.trip.form', { id: trip.id }));

};

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Overwiew" {...a11yProps(0)} />
          {trip.subtrips.map((subtrip, index) => (
            <Tab label={subtrip.city.name} {...a11yProps(index + 1)} />
            ))}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} trip={trip} handleDelete={handleDelete} handleUpdate={handleUpdate}>
        Overwiew
      </TabPanel>
      {trip.subtrips.map((subtrip, index) => (
        <TabPanel value={value} index={index + 1} trip={subtrip} handleDelete={handleDelete} handleUpdate={handleUpdate}>
            {subtrip.city.name}
        </TabPanel>
        ))}
    </Box>
  );
}
