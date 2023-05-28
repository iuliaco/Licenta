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

export default function ConversationItem(props) {
  const [lastMessage, setLastMessage] = useState({});
  const [participant, setParticipant] = useState({});
  useEffect(() => {
    console.log(props);
    axios
      .get(
        `/chat/conversations/${props.conversation}/messages/?participant_id=${props.participant.id}&participant_type=${props.participant.type}&sorting=desc&perPage=1`
      )
      .then((response) => {
        // Handle the response data
        setLastMessage(response.data.data ? response.data.data[0] : null);
      })
      .catch((error) => {
        // Handle the error
      });
    axios
      .get(`/chat/conversations/${props.conversation}/participants`)
      .then((response) => {
        // Handle the response data
        if (response.data.length == 1) {
          setParticipant(response.data[0]);
        } else {
          response.data
            .filter((participant) => {
              return participant.id != props.auth.user.id;
            })
            .map((participant) => {
              console.log(participant);
              setParticipant(participant);
            });
        }
        // setLastMessage(response.data.data? response.data.data[0] : null);
      })
      .catch((error) => {
        // Handle the error
      });
  }, []);

  return (
    <>
    <Link href={`/messages/${participant.id}`}>

      <ListItem key={props.conversation} selected={props.principal_conversation && props.principal_conversation == props.conversation} alignItems="flex-start" divider={true}>
        
        <ListItemAvatar>
          <Avatar
            alt={participant.username}
            src={ "/storage/avatars/" + participant.profile_photo_url}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {participant.name} {participant.surname}{" "}
              {"(@" + participant.username + ")"}
            </Typography>
          }
          secondary={
            <>
              {lastMessage.body
                ? lastMessage.body.length > 20
                  ? `${lastMessage.body.substring(0, 20)}...`
                  : lastMessage.body
                : "No messages yet"}
            </>
          }
        />
      </ListItem>
      </Link>

    </>
  );
}
