import {useState, useEffect} from 'react';
import { Head, Link } from '@inertiajs/react';
import { Layout } from '@/Layouts/Layout';
import { Card, Stepper, Step, StepLabel, StepContent, Paper ,Container, Stack, CardActions, MenuItem, Button, Grid, CardHeader, Divider, TextField, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useForm } from '@inertiajs/react';
import AddTripForm from '@/Components/AddTripForm';



export default function CreateTripNew(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        country_id: '',
        description: '',
        start_date: '',
        end_date: '',
        subtrips: []
    });
    const classes = useStyles();
    const [currentCountry, setCurrentCountry] = useState(0);
    const [cities, setCities] = useState([]);
    const [arrivalDate, setArrivalDate] = useState(dayjs(new Date()));
    const [departureDate, setDepartureDate] = useState(dayjs(new Date()));
    const [activeStep, setActiveStep] = useState(0);
    const [steps, setSteps] = useState([
        {
          label: 'Add a new trip',
          description: `Wonderful, you are planning a trip! Let's get started!`,
          component: (<AddTripForm/>)
        },
        {
          label: 'Add a new destination',
          description:
            'Add a city you are going to visit on your trip.',
          component: (<AddNewCitySubForm />)

        },
      ]);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        reset();
    };


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
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                        optional={
                            index === 2 ? (
                            <Typography variant="caption">Last step</Typography>
                            ) : null
                        }
                        >
                        {step.label}
                        </StepLabel>
                        <StepContent>
                        <Typography>{step.description}</Typography>
                        <Box sx={{ mb: 2 }}>
                            <div>
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{ mt: 1, mr: 1 }}
                            >
                                {index === steps.length - 1 ? 'Finish' : 'Continue'}
                            </Button>
                            <Button
                                disabled={index === 0}
                                onClick={handleBack}
                                sx={{ mt: 1, mr: 1 }}
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
                    <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
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
