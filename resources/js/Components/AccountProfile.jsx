import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
  } from '@mui/material';
  

  
  export const AccountProfile = (props) => (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={props.user.id}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
          >
            {props.user.username}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {props.user.name} {props.user.surname} 
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {props.user.origin_country.name} 
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );