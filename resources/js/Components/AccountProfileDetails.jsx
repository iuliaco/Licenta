import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  MenuItem
} from '@mui/material';
import ReactPhoneInput from 'react-phone-input-material-ui';
import { useForm } from '@inertiajs/react';
import ValidationErrors from './ValidationErrors';

export const AccountProfileDetails = (props) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: props.user.name,
        surname: props.user.surname,
        username: props.user.username,
        origin_country_id: props.user.origin_country.id,
        phone_number:''
    });

    const handleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
        console.log(event.target.name);
        console.log(props.user);
        console.log(event)
  };

  const handleSubmit = (event) => {
      console.log("Am apasat");
      console.log(data);

      event.preventDefault();
      console.log(event);
      post(route('update.user'));
    
  };


  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                    fullWidth
                    label="Your name"
                    name="name"
                    onChange={handleChange}
                    type="text"
                    value={data.name}
                 />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
            <TextField
              fullWidth
              label="Your surname"
              name="surname"
              onChange={handleChange}
              type="text"
              value={data.surname}
            />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
              fullWidth
              label="Your username"
              name="username"
              onChange={handleChange}
              type="username"
              value={data.username}
            />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <ReactPhoneInput
                value={data.phone_number}
                label="Phone number"
                onChange={(value) => setData("phone_number", value)} // passed function receives the phone value
                component={TextField}
              />

              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                id="outlined-select-origin-country"
                select
                label="Select"
                name="origin_country_id"
                value={data.origin_country_id}
                onChange={handleChange}
                defaultValue={props.user.origin_country.id}
                helperText="Your origin country"
                >
                {props.countries.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                    {option.name}
                    </MenuItem>
                ))}
                </TextField>
                <ValidationErrors errors={errors} />

              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};