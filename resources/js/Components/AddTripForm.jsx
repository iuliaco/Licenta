import {useState, useEffect} from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, Container, Stack, CardActions, Rating, MenuItem, Button, Grid, CardHeader, Divider, TextField, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useForm } from '@inertiajs/react';
import ValidationErrors from '@/Components/ValidationErrors';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { validateDate } from '@mui/x-date-pickers/internals';
import { makeStyles } from '@mui/styles';
import StarIcon from '@mui/icons-material/Star';

const useStyles = makeStyles((theme) => ({
  root: {
    "& .Mui-root": {
        padding: 0,
    },
    "& .Mui-focused": {
        borderColor: "transparent!important",
        outline: "0!important",
      }
  }
}));

const labels = {
    0.5: 'Hated it',
    1: 'Hated it',
    1.5: 'Didn\'t like it',
    2: 'Didn\'t like it',
    2.5: 'It was ok',
    3: 'It was ok',
    3.5: 'It was good',
    4: 'It was good',
    4.5: 'It was excellent',
    5: 'It was excellent',
  };

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

function StarRating(props) {
    const [hover, setHover] = useState(-1);
    return (
        <>
        <Typography variant="h5">
            Wonderful, you did it!
        </Typography>
        <Typography variant="h6">
            Rate your recent trip!
        </Typography>
        <Box
        sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
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
            {props.rated !== '' && (
                <Box fullWidth sx={{ ml: 2, minWidth:"100%" }}>{labels[hover !== -1 ? hover : props.rated]}</Box>
            )}
        </Box>
        <TextField
                id="outlined-multiline-flexible"
                sx={{ p: 0, m: 0 }}
                multiline
                variant="outlined"
                rows={3}
                name="story"
                value={props.story}
                onChange={props.handleChange}
                helperText="Tell us some stories from the trip, how it was and how you felt"
                />
        </>
    )
}

export default function AddTripForm(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        country_id: '',
        city_id: '',
        description: '',
        story: '',
        start_date: '',
        end_date: '',
        rated: 0,
    });
    const classes = useStyles();
    const [currentCountry, setCurrentCountry] = useState(0);
    const [cities, setCities] = useState([]);
    const [arrivalDate, setArrivalDate] = useState(dayjs(new Date()));
    const [departureDate, setDepartureDate] = useState(dayjs(new Date()));
    const [pastTrip, setPastTrip] = useState(false);


    useEffect(() => {
        let active = true;

        const fetchCities = async () => {
            const response = await fetch('/api/safety/' + currentCountry);
            const data = await response.json();
            if (active) {
                setCities(data);
            }
        }

        fetchCities();

        return () => {
            active = false;
        }

    }, [currentCountry]);

    
    const handleChange = (event) => {
        console.log("test")
        console.log(event);
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
        if(event.target.name == "country_id"){
            setCurrentCountry(event.target.value);
        }
        console.log(event.target.name);
    };

    const handleChangeArrivalDate = (event) => {
        console.log("test")
        console.log(event);
        setArrivalDate(event);
        console.log(event.toDate());
        setData("start_date", event.toDate());

    };

    const handleChangeDepartureDate = (event) => {
        console.log("test")
        console.log(event);
        setDepartureDate(event);
        console.log(event.toDate());
        setData("end_date", event.toDate());
        if(event.toDate() < new Date()){
            setPastTrip(true);
        } else {
            setPastTrip(false);
        }
    };

    const handleSubmit = (event) => {
        console.log("Am apasat");
        console.log(arrivalDate.toDate());
        event.preventDefault();
        console.log(data);
        post(route('trip.add'));
    
    };
    
    return (
        <>
        <Card>
            <form onSubmit={handleSubmit}>

                <CardHeader
                subheader="Add the details of your trip"
                title="Wonderful, you are planning a trip!"
                />
                <Divider />
                <CardContent>
                <Stack
                    spacing={3}
                    sx={{ maxWidth: 400 }}
                >
        
                <TextField
                id="outlined-select-origin-country"
                select
                label="Select"
                name="country_id"
                value={data.country_id}
                onChange={handleChange}
                defaultValue={data.country_id}
                helperText="The country you are traveling to"
                >
                {props.countries.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                    {option.name}
                    </MenuItem>
                ))}
                </TextField>
                <TextField
                id="outlined-select-origin-country"
                select
                label="Select"
                name="city_id"
                value={data.city_id}
                onChange={handleChange}
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
                <DatePicker onChange={handleChangeArrivalDate} 
                
                name="start_date"
                format="DD/MM/YYYY"
                defaultValue={arrivalDate}
                label="The date you are arriving" 
                slotProps={{
                    textField: {
                      helperText: 'DD/MM/YYYY',
                    },
                  }}
                
                />
                <DatePicker onChange={handleChangeDepartureDate}
                name="end_date"
                format="DD/MM/YYYY"
                defaultValue={departureDate}
                label="The date you are leaving"
                minDate={arrivalDate}
                slotProps={{
                    textField: {
                      helperText: 'DD/MM/YYYY',
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
                name="description"
                className={classes.root}
                value={data.description}
                onChange={handleChange}
                helperText="Tell us more about your trip, why you're going, what you want to see"
                />
                {pastTrip && <StarRating rated={data.rated} setData={setData} story={data.story} handleChange={handleChange} />}

                <ValidationErrors errors={errors} />
                </Stack>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="contained" disabled={processing} type="submit"> 
                    Add new trip
                </Button>
                </CardActions>
            </form>
        </Card>
        </>
    );
}

