import { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import { Layout } from "@/Layouts/Layout";
import {
  Card,
  Container,
  Stack,
  CardActions,
  MenuItem,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Grid,
  CardHeader,
  Divider,
  TextField,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Paper,
  Input,
  Box,
  IconButton,
} from "@mui/material";
import { useForm } from "@inertiajs/react";
import CitySafetyFrom from "@/Components/CitySafetyForm";
import ValidationErrors from "@/Components/ValidationErrors";
import CountryAirportForm from "@/Components/CountryAirportForm";
import { Scrollbar } from "@/Components/Scrollbar";
import { makeStyles } from "@mui/styles";
import SendIcon from "@mui/icons-material/Send";

export default function SendMessage({user, data, handleChange, sendMessage, classes}) {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      className={classes.footer}
      pt={2}
    >
      <Box ml={4}>
        <Avatar>
          <img
            src={ "/storage/avatars/" + user.profile_photo_url}
            alt="Avatar"
            className="MuiAvatar-img css-1hy9t21"
          />
        </Avatar>
      </Box>
      <Container fullWidth ml={1}>
        <Input
          fullWidth
          placeholder="Write a message"
          name="message"
          onChange={handleChange}
          type="message"
          value={data.message}
        />
      </Container>
      <Box m={4}>
        <IconButton aria-label="send" color="primary" onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Stack>
  );
}
