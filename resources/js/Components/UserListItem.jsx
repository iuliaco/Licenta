import { useState, useEffect } from "react";
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
} from "@mui/material";
import { useForm } from "@inertiajs/react";
import CitySafetyFrom from "@/Components/CitySafetyForm";
import ValidationErrors from "@/Components/ValidationErrors";
import CountryAirportForm from "@/Components/CountryAirportForm";

export default function UserListItem(props) {
  return (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Box mt={4} mb={4}>
              <Grid
                container
                spacing={3}
                alignItems="center"
                justifyContent="center"
              >
                <Stack spacing={3} direction={"row"}>
                <Grid item xs={12} md={4} py={0}>
                  <Avatar
                    sx={{ width: "6rem", height: "6rem"}}
                    alt="Profile Picture"
                    src="/path/to/profile-picture.jpg"
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" align="center" gutterBottom>
                    John Doe
                  </Typography>
                  <Typography
                    variant="h6"
                    align="center"
                    color="textSecondary"
                    gutterBottom
                  >
                    Frontend Developer
                  </Typography>
                  <Typography variant="body2" align="center" gutterBottom>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis consectetur rutrum nunc, id ullamcorper metus cursus
                    eget.
                  </Typography>
                  <Divider sx={{ mt: 3, mb: 3 }} />
                </Grid>
                </Stack>
              </Grid>
            </Box>
          </Container>
        </Box>
  );
}
