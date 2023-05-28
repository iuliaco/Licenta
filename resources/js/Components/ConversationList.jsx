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
import ConversationItem from "./ConversationItem";
export default function ConversationList(props) {

useEffect(() => {
        console.log(props);
    }, []);

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >

        {props.conversations.conversations.map(( conversation, index) => (
            <ConversationItem key={index} conversation={conversation} participant={props.conversations.participant} principal_conversation={props.conversations.principal_conversation} auth={props.auth}/>
        ))}

      
    </List>
  );
}
