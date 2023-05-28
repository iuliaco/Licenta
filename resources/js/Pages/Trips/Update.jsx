import { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import { Layout } from "@/Layouts/Layout";
import {
  Card,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Container,
  Stack,
  CardActions,
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
import AddTripForm from "@/Components/AddTripForm";
import { makeStyles } from "@mui/styles";
import dayjs, { Dayjs } from "dayjs";
import AddSubTripForm from "@/Components/AddSubTripForm";
import ValidationErrors from "@/Components/ValidationErrors";
import { router } from "@inertiajs/react";

export default function CreateTripNew(props) {
  const {
    data,
    setData,
    post,
    processing,
    transform: helper,
    errors,
    reset,
  } = useForm({
    id: props.trip.id,
    country_id: props.trip.country_id,
    rated: props.trip.rated ? props.trip.rated : "",
    description: props.trip.description ? props.trip.description : "",
    origin_country_id: props.trip.origin_country_id
      ? props.trip.origin_country_id
      : "",
    start_date: props.trip.start_date
      ? new Date(props.trip.start_date)
      : new Date(),
    end_date: props.trip.end_date ? new Date(props.trip.end_date) : new Date(),
    subtrips: [],
    departure_airport_id: props.trip.departure_airport_id
      ? "" + props.trip.departure_airport_id
      : "",
    returning_airport_id: props.trip.returning_airport_id
      ? "" + props.trip.returning_airport_id
      : "",
  });
  const [subtrips, setSubtrips] = useState([
    ...props.trip.subtrips.map((item) => {
      return {
        start_date: new Date(item.start_date ? item.start_date : new Date()),
        end_date: new Date(item.end_date ? item.end_date : new Date()),
        city_id: item.city_id,
        hotel: item.hotel? item.hotel : "",
        transport: item.transport? item.transport : "",
        liked: item.liked? item.liked : "",
        disliked: item.disliked? item.disliked : "",
        rated: item.rated? item.rated : "",
        description: item.description? item.description : "",
        id: item.id,
      };
    }),
  ]);

  const [subDates, setSubDates] = useState([
    ...props.trip.subtrips.map((item) => { 
        return {
            ArrivalDate: dayjs(
                item.start_date ? new Date(item.start_date) : new Date()
            ),
            DepartureDate: dayjs(
                item.end_date ? new Date(item.end_date) : new Date()
            ),
            pastTrip: item.end_date ? new Date(item.end_date) < new Date() : false,
            };
        }),
  ]);
  const [currentCountry, setCurrentCountry] = useState(props.trip.country_id);
  const [initalCountry, setInitialCountry] = useState(
    props.trip.origin_country_id ? props.trip.origin_country_id : 0
  );
  const [cities, setCities] = useState([]);
  const [arrivalDate, setArrivalDate] = useState(
    dayjs(props.trip.start_date ? new Date(props.trip.start_date) : new Date())
  );
  const [departureDate, setDepartureDate] = useState(
    dayjs(props.trip.end_date ? new Date(props.trip.end_date) : new Date())
  );
  const [pastTrip, setPastTrip] = useState(
    props.trip.end_date ? new Date(props.trip.end_date) < new Date() : false
  );
  const [activeStep, setActiveStep] = useState(0);
  const [airports, setAirports] = useState([]);
  const [initialAirports, setInitialAirports] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    // This will run only once on the initial render
    const fetchCities = async () => {
      console.log(currentCountry);
      const response = await fetch("/api/safety/" + currentCountry);
      const data = await response.json();
      setCities(data);
    };
    const fetchAirports = async () => {
      const response = await fetch("/api/iata-codes/" + currentCountry);
      const data = await response.json();
      console.log("set airports");
      setAirports(data);
    }
    
    const fetchInitialAirports = async () => {
        const response = await fetch("/api/iata-codes/" + initalCountry);
        const data = await response.json();
        console.log("set airports");
        setInitialAirports(data);
    }


    fetchAirports();
    fetchCities();
    fetchInitialAirports();

    console.log("fetch cities");
    console.log(props);
    console.log(subtrips);
    console.log(steps);
    
  }, []);

  useEffect(() => {
    let active = true;
    console.log(data);

    const fetchCities = async () => {
      console.log(currentCountry);
      const response = await fetch("/api/safety/" + currentCountry);
      const data = await response.json();
      if (active) {
        setCities(data);
        const updatedSubtrips = [...subtrips];
        updatedSubtrips.map((item) => (item.city_id = ""));
        setSubtrips(updatedSubtrips);
      }
    };
    const fetchAirports = async () => {
      const response = await fetch("/api/iata-codes/" + currentCountry);
      const data = await response.json();
      if (active) {
        console.log("set airports");
        setAirports(data);
      }
    };

    if(isFirstRender){
        console.log("first render");
        setIsFirstRender(false);
        return;
    }
    fetchAirports();
    fetchCities();

    console.log("fetch cities");

    return () => {
      active = false;
    };
  }, [currentCountry]);

  useEffect(() => {
    let active = true;
    console.log(data);

    const fetchAirports = async () => {
      const response = await fetch("/api/iata-codes/" + initalCountry);
      const data = await response.json();
      if (active) {
        console.log("set airports");
        setInitialAirports(data);
      }
    };

    console.log("initial country " + initalCountry);
    fetchAirports();

    return () => {
      active = false;
    };
  }, [initalCountry]);

  const handleNext = () => {
    if (activeStep === 0) {
      console.log("active step 0");
      post(route("trip.checkCountry"), {
        onSuccess: () => {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          errors.country_id = null;
        },
      });
    } else {
      console.log("active step " + activeStep);
      router.post(
        route("subtrip.check"),
        { ...data, subtrips: [subtrips[activeStep - 1]] },
        {
          preserveState: true,
          preserveScroll: true,
          onSuccess: () => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            errors.country_id = null;
          },
          onError: () => {
            console.log(props);
          },
        }
      );
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    reset();
  };

  const handleDelete = (index) => {
    console.log("delete");
    const updatedSubtrips = subtrips.filter((item, i) => i !== index - 1);
    const updatedSubDates = subDates.filter((item, i) => i !== index - 1);
    const updatedSteps = steps.filter((item, i) => i !== index);
    setSubtrips(updatedSubtrips);
    setSubDates(updatedSubDates);
    setSteps(updatedSteps);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event) => {
    console.log("test Handle Change");
    console.log(event.target.name);
    console.log(event.target.value);
    setData(event.target.name, event.target.value);

    if (event.target.name == "country_id") {
      console.log("setear current country");
      setCurrentCountry(event.target.value);
      console.log(event.target.value);
    }
    if (event.target.name == "origin_country_id") {
      console.log("setear current country");
      setInitialCountry(event.target.value);
      console.log(event.target.value);
    }
    console.log(data.country_id);
    console.log(currentCountry);
  };

  const handleChangeSubtrip = (event, key) => {
    console.log("test Handle Change Subtrip");
    let subtripIndex = subtrips[key - 1];
    console.log(event.target.value);
    console.log(event.target.name);
    console.log(key);
    const updatedSubtrips = [...subtrips];
    updatedSubtrips[key - 1][event.target.name] = event.target.value;
    setSubtrips(updatedSubtrips);
    console.log(subtrips);
  };

  const handleChangeRating = (event, key, value) => {
    console.log("test Handle Change Subtrip");
    let subtripIndex = subtrips[key - 1];
    console.log(subtripIndex);
    console.log(key);
    const updatedSubtrips = [...subtrips];
    updatedSubtrips[key - 1][event.target.name] = value;
    setSubtrips(updatedSubtrips);
  };

  const handleChangeArrivalDateSubtrip = (event, key) => {
    console.log("test Handle Change Subtrip");
    let subtripIndex = subtrips[key - 1];
    console.log(subtripIndex);
    console.log(key);
    console.log(event.toDate());
    const updatedSubtrips = [...subtrips];
    updatedSubtrips[key - 1].start_date = event.toDate();
    setSubtrips(updatedSubtrips);
    const updatedSubDates = [...subDates];
    updatedSubDates[key - 1].ArrivalDate = event;
    setSubDates(updatedSubDates);
  };

  const handleChangeDepartureDateSubtrip = (event, key) => {
    console.log("test Handle Change Subtrip");
    let subtripIndex = subtrips[key - 1];
    console.log(subtripIndex);
    console.log(key);
    const updatedSubtrips = [...subtrips];
    updatedSubtrips[key - 1].end_date = event.toDate();
    setSubtrips(updatedSubtrips);
    const updatedSubDates = [...subDates];
    updatedSubDates[key - 1].DepartureDate = event;
    setSubDates(updatedSubDates);
    if (event.toDate() < new Date()) {
      updatedSubDates[key - 1].pastTrip = true;
    } else {
      updatedSubDates[key - 1].pastTrip = false;
    }

    setSubDates(updatedSubDates);
  };

  const handleChangeArrivalDate = (event) => {
    console.log("test");
    console.log(event);
    setArrivalDate(event);
    console.log(event.toDate());
    setData("start_date", event.toDate());
    const updatedSubDates = [...subDates];
    updatedSubDates.map((item) => (item.ArrivalDate = event));
    const updatedSubtrips = [...subtrips];
    updatedSubtrips.map((item) => (item.start_date = event.toDate()));
    setSubtrips(updatedSubtrips);
    setSubDates(updatedSubDates);
  };

  const handleChangeDepartureDate = (event) => {
    console.log("test");
    console.log(event);
    setDepartureDate(event);
    console.log(event.toDate());
    setData("start_date", event.toDate());
    const updatedSubDates = [...subDates];
    updatedSubDates.map((item) => (item.DepartureDate = event));
    const updatedSubtrips = [...subtrips];
    updatedSubtrips.map((item) => (item.end_date = event.toDate()));
    setSubtrips(updatedSubtrips);
    if (event.toDate() < new Date()) {
      setPastTrip(true);
      updatedSubDates.map((item) => (item.pastTrip = true));
    } else {
      setPastTrip(false);
      updatedSubDates.map((item) => (item.pastTrip = true));
    }

    setSubDates(updatedSubDates);
  };

  const addSubTrip = () => {
    setSteps([
      ...steps,
      {
        label: "Add a new destination",
        description: "Add a city you are going to visit on your trip.",
      },
    ]);
    setSubtrips([
      ...subtrips,
      {
        start_date: subDates[subDates.length - 1].DepartureDate.toDate(),
        end_date: subDates[subDates.length - 1].DepartureDate.toDate(),
        city_id: "",
        hotel: "",
        transport: "",
        liked: "",
        disliked: "",
        rated: "",
        description: "",
      },
    ]);
    setSubDates([
      ...subDates,
      {
        ArrivalDate: subDates[subDates.length - 1].DepartureDate,
        DepartureDate: subDates[subDates.length - 1].DepartureDate,
        pastTrip: false,
      },
    ]);
  };

  const [steps, setSteps] = useState([
    {
      label: "Add a new trip",
      description: `Wonderful, you are planning a trip! Let's get started!`,
    }, 
    ...props.trip.subtrips.map((item) => {
        return {
            label: "Add a new trip",
            description: `Wonderful, you are planning a trip! Let's get started!`,
        }
    })
    
  ]);

  const finishForm = () => {
    console.log("finish form");
    console.log(data);
    console.log(subtrips);
    console.log(subDates);
    router.post(
      route("subtrip.check"),
      { ...data, subtrips: [subtrips[activeStep - 1]] },
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
          router.put(
            route("trip.modify", { id: data.id }),
            { ...data, subtrips: subtrips },
            {
              preserveState: true,
              preserveScroll: true,
            }
          );
        },
        onError: () => {
          console.log(props);
        },
      }
    );
  };

  return (
    <Layout auth={props.auth}>
      <>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step>
                  <StepLabel
                    optional={
                      index === steps.length ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <Typography>{step.description}</Typography>
                    {index === 0 ? (
                      <AddTripForm
                        countries={props.countries}
                        data={data}
                        setData={setData}
                        handleChange={handleChange}
                        arrivalDate={arrivalDate}
                        departureDate={departureDate}
                        handleChangeArrivalDate={handleChangeArrivalDate}
                        handleChangeDepartureDate={handleChangeDepartureDate}
                        pastTrip={pastTrip}
                        airports={airports}
                        initialAirports={initialAirports}
                      />
                    ) : (
                      <AddSubTripForm
                        index={index}
                        cities={cities}
                        data={subtrips[index - 1]}
                        setData={setData}
                        handleChangeRating={handleChangeRating}
                        handleChange={handleChangeSubtrip}
                        arrivalDate={subDates[index - 1].ArrivalDate}
                        departureDate={subDates[index - 1].DepartureDate}
                        handleChangeArrivalDate={handleChangeArrivalDateSubtrip}
                        handleChangeDepartureDate={
                          handleChangeDepartureDateSubtrip
                        }
                        pastTrip={subDates[index - 1].pastTrip}
                      />
                    )}
                    {/* <ValidationErrors errors={errors} /> */}
                    <ValidationErrors errors={props.errors} />

                    <Box
                      sx={{
                        mb: 2,
                      }}
                    >
                      <div>
                        {index === steps.length - 1 ? (
                          <Button
                            variant="contained"
                            onClick={finishForm}
                            sx={{
                              mt: 1,
                              mr: 1,
                            }}
                          >
                            Finish
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{
                              mt: 1,
                              mr: 1,
                            }}
                          >
                            Continue
                          </Button>
                        )}

                        {index === steps.length - 1 && (
                          <Button
                            variant="contained"
                            onClick={addSubTrip}
                            sx={{
                              mt: 1,
                              mr: 1,
                            }}
                          >
                            {" "}
                            Add another destination
                          </Button>
                        )}
                        <Button
                          disabled={index === 0 || steps.length === 2}
                          onClick={() => handleDelete(index)}
                          variant="contained"
                          color="error"
                          sx={{
                            mt: 1,
                            mr: 1,
                          }}
                        >
                          Delete this city
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{
                            mt: 1,
                            mr: 1,
                          }}
                        >
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper
                square
                elevation={0}
                sx={{
                  p: 3,
                }}
              >
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button
                  onClick={handleReset}
                  sx={{
                    mt: 1,
                    mr: 1,
                  }}
                >
                  Reset
                </Button>
              </Paper>
            )}
          </Container>
        </Box>
      </>
    </Layout>
  );
}
