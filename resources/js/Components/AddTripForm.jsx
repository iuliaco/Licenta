import { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import {
  Card,
  Container,
  Stack,
  CardActions,
  Rating,
  MenuItem,
  Button,
  Grid,
  CardHeader,
  Divider,
  TextField,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { useForm } from "@inertiajs/react";
import ValidationErrors from "@/Components/ValidationErrors";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { validateDate } from "@mui/x-date-pickers/internals";
import { makeStyles } from "@mui/styles";
import StarIcon from "@mui/icons-material/Star";
import OrButton from "./OrButton";
import MapsButton from "./MapsButton";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .Mui-root": {
      padding: 0,
    },
    "& .Mui-focused": {
      borderColor: "transparent!important",
      outline: "0!important",
    },
  },
}));

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

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

function StarRating(props) {
  const [hover, setHover] = useState(-1);
  return (
    <>
      <Typography variant="h5">Wonderful, you did it!</Typography>
      <Typography mt={2} variant="h6">Rate your recent trip!</Typography>
      <Box
      mt={2} 
        sx={{
          width: 200,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Rating
          name="rated"
          value={props.rated}
          precision={0.5}
          onChange={(event, newValue) => {
            console.log(props.rated);
            console.log(newValue);
            console.log(event);
            props.setData(event.target.name, newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {props.rated !== "" && (
          <Box fullWidth sx={{ ml: 2, minWidth: "100%" }}>
            {labels[hover !== -1 ? hover : props.rated]}
          </Box>
        )}
      </Box>
      {/* <TextField
        id="outlined-multiline-flexible"
        sx={{ p: 0, m: 0 }}
        multiline
        variant="outlined"
        rows={3}
        name="story"
        value={props.story}
        onChange={props.handleChange}
        helperText="Tell us an overview of the trip"
      /> */}
    </>
  );
}

export default function AddTripForm({
  countries,
  data,
  setData,
  handleChange,
  arrivalDate,
  departureDate,
  handleChangeArrivalDate,
  handleChangeDepartureDate,
  pastTrip,
  airports,
  initialAirports,
}) {
  const classes = useStyles();

  useEffect(() => {
    console.log(data);
    console.log(arrivalDate);
  });

  return (
    <>
      <Card>
        <Divider />
        <CardContent>
          <Grid container>
            <MapsButton message={"Need help with transportation?"} link={"https://www.google.com/maps/place/"} country={data.city_id? cities[data.city_id].name : ''}  />
            <Grid
              container
              flexDirection={"column"}
              mt={2}
              xs={12}
              md={6}
            >
              <TextField
                id="outlined-select-origin-country"
                select
                label="Select"
                name="origin_country_id"
                value={data.origin_country_id}
                key={data.origin_country_id}
                onChange={handleChange}
                defaultValue={data.origin_country_id}
                helperText="The country you are leaving from"
              >
                {countries.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              container
              flexDirection={"column"}
              mt={2}
              xs={12}
              md={6}
            >
              <TextField
                id="outlined-select-origin-country"
                select
                label="Select"
                name="departure_airport_id"
                value={data.departure_airport_id}
                key={data.departure_airport_id}
                onChange={handleChange}
                defaultValue={data.departure_airport_id}
                helperText="The airport you are leaving from"
              >
                {initialAirports.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name} - {option.iata_code}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              container
              flexDirection={"column"}
              mt={2}
              xs={12}
              md={6}
            >
              <TextField
                id="outlined-select-origin-country"
                select
                label="Select"
                name="country_id"
                value={data.country_id}
                key={data.country_id}
                onChange={handleChange}
                defaultValue={data.country_id}
                helperText="The country you are traveling to"
              >
                {countries.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              container
              flexDirection={"column"}
              mt={2}
              xs={12}
              md={6}
            >
              <TextField
                id="outlined-select-origin-country"
                select
                label="Select"
                name="returning_airport_id"
                value={data.returning_airport_id}
                key={data.returning_airport_id}
                onChange={handleChange}
                defaultValue={data.returning_airport_id}
                helperText="The airport you are returning to from"
              >
                {airports.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name} - {option.iata_code}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container flexDirection={"column"} mt={2} xs={12} md={6}>
                <DatePicker
                  onChange={handleChangeArrivalDate}
                  name="start_date"
                  format="DD/MM/YYYY"
                  defaultValue={arrivalDate}
                  label="The date you are arriving"
                  slotProps={{
                    textField: {
                      helperText: "DD/MM/YYYY",
                    },
                  }}
                />
              </Grid>
              <Grid container flexDirection={"column"} mt={2} xs={12} md={6}>
                <DatePicker
                  onChange={handleChangeDepartureDate}
                  name="end_date"
                  format="DD/MM/YYYY"
                  defaultValue={departureDate}
                  label="The date you are leaving"
                  minDate={arrivalDate}
                  slotProps={{
                    textField: {
                      helperText: "DD/MM/YYYY",
                    },
                  }}
                />
              </Grid>
            </LocalizationProvider>
            <Grid
              item
              container
              flexDirection={"column"}
              mt={2}
              xs={12}
              md={12}
            >
              <TextField
                id="outlined-multiline-flexible"
                sx={{ p: 0, m: 0 }}
                multiline
                variant="outlined"
                rows={3}
                name="description"
                className={classes.root}
                value={data.description}
                onChange={handleChange}
                helperText="Tell us more about your trip, why you're going, what you want to see"
              />
            </Grid>
            {pastTrip && (
               <Grid
               container
               flexDirection={"column"}
               mt={2}
               xs={12}
             >
              <StarRating
                rated={data.rated}
                setData={setData}
                story={data.story}
                handleChange={handleChange}
              />
              </Grid>
            )}
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </>
  );
}
