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
  useEffect(() => {
    console.log(props);
  });
  return (
    <>
      <Typography variant="h5">Wonderful, you did it!</Typography>
      <Typography variant="h6">Rate your recent trip!</Typography>
      <Box
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
            props.handleChangeRating(event, props.index, newValue);
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
      <TextField
        id="outlined-multiline-flexible"
        sx={{ p: 0, m: 0 }}
        multiline
        variant="outlined"
        rows={3}
        name="liked"
        value={props.liked}
        defaultValue={props.liked}
        onChange={(event) => props.handleChange(event, props.index)}
        helperText="Tell us what you liked about the trip"
      />
      
      <TextField
        id="outlined-multiline-flexible"
        sx={{ p: 0, m: 0 }}
        multiline
        variant="outlined"
        rows={3}
        name="disliked"
        value={props.disliked}
        defaultChecked={props.disliked}
        onChange={(event) => props.handleChange(event, props.index)}
        helperText="Tell us what you disliked about the trip"
      />
    </>
  );
}

export default function AddSubTripForm({
  index,
  cities,
  data,
  setData,
  handleChange,
  handleChangeRating,
  handleChangeArrivalDate,
  handleChangeDepartureDate,
  pastTrip,
  arrivalDate,
  departureDate,
})
{
    useEffect(() => {
        console.log("AddSubTripForm.jsx useEffect " + index);
        console.log(cities);
        console.log(data.city_id);
        console.log(data);
    });

  return (
    <>
      <Card>
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 400 }}>
            <MapsButton message={"Need help with accomodation or transportation?"} link={"https://www.google.com/maps/place/"} country={cities.find((c) => c.id === data.city_id)? cities.find((c) => c.id === data.city_id).name : ''} 
            
            />
            <TextField
              id="outlined-select-origin-country"
              select
              label="Select"
              name="city_id"
              value={data.city_id}
              onChange={(event) => handleChange(event, index)}
              defaultValue={data.city_id}
              helperText="The city you are visiting"
            >
              {cities.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                onChange={(event) => handleChangeArrivalDate(event, index)}
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
              <DatePicker
                onChange={(event) => handleChangeDepartureDate(event, index)}
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
            </LocalizationProvider>

            <TextField
              id="outlined-multiline-flexible"
              sx={{ p: 0, m: 0 }}
              multiline
              variant="outlined"
              rows={3}
              name="hotel"
              value={data.hotel}
              onChange={(event) => handleChange(event, index)}
              helperText="At what hotel are you staying?"
            />

            <TextField
              id="outlined-multiline-flexible"
              sx={{ p: 0, m: 0 }}
              multiline
              variant="outlined"
              rows={3}
              name="transport"
              value={data.transport}
              onChange={(event) => handleChange(event, index)}
              helperText="How do you want to travel in the city?"
            />

            <TextField
              id="outlined-multiline-flexible"
              sx={{ p: 0, m: 0 }}
              multiline
              variant="outlined"
              rows={3}
              name="description"
              value={data.description}
              onChange={(event) => handleChange(event, index)}
              helperText="Tell us more about your trip, why you're going, what you want to see"
            />
            {pastTrip && (
              <StarRating
                rated={data.rated}
                setData={setData}
                liked={data.liked}  
                disliked={data.disliked}
                index={index}
                handleChangeRating={handleChangeRating}
                handleChange={(event) => handleChange(event, index)}
              />
            )}

            {/* <ValidationErrors errors={errors} /> */}
          </Stack>
        </CardContent>
        <Divider />
      </Card>
    </>
  );
}
