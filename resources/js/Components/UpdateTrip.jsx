import {useState, useEffect} from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, Container, Stack, CardActions, Rating, MenuItem, Button, CardHeader, Divider, TextField, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useForm } from '@inertiajs/react';
import ValidationErrors from '@/Components/ValidationErrors';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { validateDate } from '@mui/x-date-pickers/internals';
import { makeStyles } from '@mui/styles';
import StarIcon from '@mui/icons-material/Star';
import { set } from 'lodash';
import Grid from '@mui/material/Unstable_Grid2';
import { Margin } from '@mui/icons-material';

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
        <Grid xs={12} md={12} display="flex" justifyContent={"center"} py={2}>
        <div>
        <Typography variant="h5">
            Wonderful, you did it!
        </Typography>
        <Typography variant="h6">
            Rate your recent trip!
        </Typography>
        </div>
        </Grid>
        <Grid xs={12} md={6}>
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
        </Grid>
        <Grid display="flex" flexDirection={"column"} xs={12} md={6}>
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
        </Grid>
        </>
    )
}

export default function UpdateTrip(props) {
    const { data, setData, put, delete: destroy, processing, errors, reset } = useForm({
        country_id: props.trip.country_id,
        city_id: props.trip.city_id,
        description: props.trip.description,
        story: props.trip.story,
        start_date: props.trip.start_date,
        end_date: props.trip.end_date,
        rated: props.trip.rated,
    });
    const classes = useStyles();
    const [currentCountry, setCurrentCountry] = useState(props.trip.country_id);
    const [cities, setCities] = useState([]);
    const [arrivalDate, setArrivalDate] = useState(dayjs(new Date(props.trip.start_date)));
    const [departureDate, setDepartureDate] = useState(dayjs(new Date(props.trip.end_date)));
    const [pastTrip, setPastTrip] = useState(false);



    useEffect(() => {
        let active = true;
        console.log(props.trip);
        const fetchCities = async () => {
            const response = await fetch('/api/safety/' + currentCountry);
            const data = await response.json();
            if (active) {
                setCities(data);
            }
        }

        console.log("test");
        fetchCities();
        if(new Date(data.end_date) <= new Date()){
            setPastTrip(true);
        } else {
            console.log("wat??");
            console.log(data.end_date);
            console.log(new Date(data.end_date));
            console.log(new Date());
        }

        return () => {
            active = false;
        }

    },[]);


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

        console.log(props);
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
        put(route('trip.modify', { id: props.trip.id }));
    
    };

    const handleDelete = (event) => {
        console.log("Am apasat delete");
        console.log(arrivalDate.toDate());
        event.preventDefault();
        console.log(data);
        destroy(route('trip.delete', { id: props.trip.id }));
    
    };
    
    return (
        <>
        <Card>
            <form onSubmit={handleSubmit}>

            <CardHeader
                title="Trip details"
                />
                <Divider />
                <CardContent>
                <Grid container spacing={2}>
                <Grid display="flex" flexDirection={"column"}  xs={12} md={6}>
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
                </Grid>
                <Grid display="flex" flexDirection={"column"} xs={12} md={6}>
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
                </Grid>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid display="flex" flexDirection={"column"} xs={12} md={6}>
                    
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
                    </Grid>
                    <Grid display="flex" flexDirection={"column"} xs={12} md={6}>

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
                    </Grid>
                    </LocalizationProvider>
                <Grid xs={12} display="flex" flexDirection={"column"}>
                    <TextField
                    id="outlined-multiline-flexible"
                    sx={{ p: 0, m: 0 }}
                    multiline
                    variant="outlined"
                    rows={2}
                    name="description"
                    className={classes.root}
                    value={data.description}
                    onChange={handleChange}
                    helperText="Tell us more about your trip, why you're going, what you want to see"
                    />

                </Grid>
                {pastTrip && <StarRating rated={data.rated} setData={setData} story={data.story} handleChange={handleChange} />}

                <ValidationErrors errors={errors} />
                </Grid>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="contained" disabled={processing} onClick={handleDelete} color="error" sx={{marginRight:"auto"}}> 
                    Delete
                </Button>
                <Button variant="contained" disabled={processing} type="submit"> 
                    Update
                </Button>
                </CardActions>
            </form>
        </Card>
        </>
    );
}

