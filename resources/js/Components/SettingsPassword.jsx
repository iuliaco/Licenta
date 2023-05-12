import { useCallback, useEffect } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField
} from '@mui/material';
import { useForm } from '@inertiajs/react';
import ValidationErrors from './ValidationErrors';

export const SettingsPassword = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    old_password: '',
    password: '',
    password_confirmation: '',
});


  const handleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
        console.log(event.target.name);
  };

  const handleSubmit = (event) => {
      console.log("Am apasat");
      console.log(data);

      event.preventDefault();
      console.log(event);
      post(route('change.password'));
    
  };

  return (
      <Card>
    <form onSubmit={handleSubmit}>

        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <Stack
            spacing={3}
            sx={{ maxWidth: 400 }}
          >
        
            <TextField
              fullWidth
              label="Old Password"
              name="old_password"
              onChange={handleChange}
              type="password"
              value={data.old_password}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              onChange={handleChange}
              type="password"
              value={data.password}
            />
            <TextField
              fullWidth
              label="Password (Confirm)"
              name="password_confirmation"
              onChange={handleChange}
              type="password"
              value={data.confirm}
            />
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