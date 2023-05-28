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
import SendMessage from "@/Components/SendMessage";
import ConversationList from "@/Components/ConversationList";
import axios from "axios";

export default function MessageBox(props) {

    const dir = props.message.sender.id == props.auth.user.id ? "row-reverse" : "row";
    const mr = props.message.sender.id == props.auth.user.id ? 0 : 4;
    const ml = props.message.sender.id == props.auth.user.id ? 4 : 0;
    const name = props.message.sender.id == props.auth.user.id ? "Me" : props.message.sender.name;

    useEffect(() => {
        console.log(props);
    }, []);

  return (
    <Box  ml={ml} mr={mr}>
      <Stack direction={dir} spacing={2} alignItems="center">
        <Box mx={2}>
          <Avatar>
            <img
              src={ "/storage/avatars/" + props.message.sender.profile_photo_url}
              alt="Avatar"
              className="MuiAvatar-img css-1hy9t21"
            />
          </Avatar>
        </Box>
        <Box  ml={2}>
          <Paper elevation={5}>
            <Box my={1} px={2} pt={1}>
              <Link href={`/profile/${props.message.sender.id}`}>{name}</Link>
            </Box>
            <Box my={1} p={2}>
              <Typography variant="body2">
                {props.message.body}
              </Typography>
            </Box>
          </Paper>
          <Box container  display="flex" sx={{flexDirection: dir}}>
            <Typography variant="subtitle2">4 days ago</Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
