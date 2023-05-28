import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
  MenuItem
} from '@mui/material';
import { useForm } from '@inertiajs/react';
import ValidationErrors from './ValidationErrors';

export const SettingsUser = (props) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: props.user.name,
    surname: props.user.surname,
    username: props.user.username,
    origin_country_id: props.user.origin_country.id,
    languages: props.user.languages,
    age: props.user.age,
    gender: props.user.gender,
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
      <Card>
    <form onSubmit={handleSubmit}>

        <CardHeader
          subheader="Update informations"
          title="Account details"
        />
        <Divider />
        <CardContent>
          <Stack
            spacing={3}
            sx={{ maxWidth: 400 }}
          >

        
            <TextField
              fullWidth
              label="Your name"
              name="name"
              onChange={handleChange}
              type="text"
              value={data.name}
            />
            <TextField
              fullWidth
              label="Your surname"
              name="surname"
              onChange={handleChange}
              type="text"
              value={data.surname}
            />
            <TextField
              fullWidth
              label="Your username"
              name="username"
              onChange={handleChange}
              type="username"
              value={data.username}
            />

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

          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" disabled={processing} type="submit"> 
            Update
          </Button>
        </CardActions>
    </form>

      </Card>
  );
};