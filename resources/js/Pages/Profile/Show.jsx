import { useState, useEffect, cloneElement } from "react";
import { Head, Link } from "@inertiajs/react";
import { Layout } from "@/Layouts/Layout";
import {
  Card,
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
  Avatar,
  Drawer,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BadgeIcon from '@mui/icons-material/Badge';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LanguageIcon from '@mui/icons-material/Language';
import CakeIcon from '@mui/icons-material/Cake';
import HomeIcon from '@mui/icons-material/Home';
import { router } from '@inertiajs/react';


const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(3),
  },
  avatar: {
    // width: theme.spacing(12),
    // height: theme.spacing(12),
    // marginBottom: theme.spacing(2),
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    cloneElement(element, {
      key: value,
    })
  );
}

export default function ShowProfile(props) {
  const classes = useStyles();
  const [secondary, setSecondary] = useState(false);

  function onButtonClick(event) {
    router.get(route('conversation.show', props.user.id));
  }

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
          <Grid container >

          <Grid item xs={12} md={6}>
            <Stack>

            <Paper elevation={3}  >
                <CardHeader
                title={"About " + props.user.username}
                titleTypographyProps={{
                    variant: 'h4',
                  }}
                />
             
                <CardContent >
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <BadgeIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={props.user.name + " " + props.user.surname}
                        secondary="Full name"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AlternateEmailIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={props.user.email}
                        secondary="Email"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LanguageIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={props.user.languages? props.user.languages : "Not provided."}
                        secondary="Languages"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CakeIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={props.user.age? props.user.age : "Not provided."}
                        secondary="Age"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={props.user.origin_country? props.user.origin_country.name : "Not provided"}
                        secondary="Origin country"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Paper>
              </Stack>
              </Grid>
              <Grid item container xs={12} md={6} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                
              <Avatar
                    sx={{ width: "15rem", height: "15rem"}}
                    alt="Profile Picture"
                    src={ "/storage/avatars/" + props.user.profile_photo_url}
                  />

                 {props.user.id != props.auth.user.id && <Box sx={{mt:3}}>
                  <Button variant="contained"  onClick={onButtonClick}> Send message </Button>
                  </Box> }
              </Grid>

            </Grid>

          </Container>
        </Box>
      </>
    </Layout>
  );
}
