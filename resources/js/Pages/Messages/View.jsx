import { useState, useEffect, useRef } from "react";
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
import axios from 'axios';
import MessageBox from "@/Components/MessageBox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {},
  cardRoot: {},
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  bodyText: {
    margin: `10px 0`,
  },
  timeText: {},
}));

export default function ViewMessages(props) {
  const classes = useStyles();
  const { data, setData, post, processing, errors, reset } = useForm({
    message: "",
  });
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState();
  const messagesEndRef = useRef(null)

  const handleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    );

  };

  const sendMessage = (event) => {
    axios.post(`/chat/conversations/${props.conversations.principal_conversation}/messages`, {
        message: {
          body: data.message,
        },
        participant_id: props.conversations.participant.id,
        participant_type: 	props.conversations.participant.type,
      })
      .then((response) => {
        reset();
      })
      .catch((error) => {
        // Handle error
      });
  }

  const enablePusher = () => {
    console.log("enable pusher");
    let channel = window.Echo.private(
      `mc-chat-conversation.${props.conversations.principal_conversation}`
    ).listen(".Musonza\\Chat\\Eventing\\MessageWasSent", data => {
      console.log("bind pusher");
      console.log(data.message);
      setLastMessage(data.message);
      // //setMessages(messages => [...messages, data]);
    });
    console.log(import.meta.env.VITE_PUSHER_APP_KEY);
  
    return () => {
      // Unsubscribe from the channel
      channel.unsubscribe();
    };
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  
  useEffect(() => {
    console.log(props);
    enablePusher();
    axios.get(`/chat/conversations/${props.conversations.principal_conversation}/messages/?participant_id=${props.conversations.participant.id}&participant_type=${props.conversations.participant.type}`)
      .then(response => {
        // Handle the response data
        setMessages(response.data.data);

        // Perform additional actions with the messages
      })
      .catch(error => {
        // Handle the error
      });
  }, []);

  useEffect(() => {
    if(lastMessage)
      setMessages(messages => [...messages, lastMessage]);
    console.log(messages);
  }, [lastMessage]);

  return (
    <Layout auth={props.auth}>
      <>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 0,
            minHeight: "92vh",
          }}
        >
          <Grid container >
            <Grid item xs={12} md={3}>
              <Stack>
                <Card>
                  <CardHeader title="Messages" />
                  <Divider />
                  <CardContent sx={{p:0}}>
                  <Scrollbar
                  sx={{
                    height: '81vh',
                    '& .simplebar-content': {
                      height: '81vh'
                    },
                    '& .simplebar-placeholder': {
                      display: 'none'
                    }
                  //   "& .simplebar-content": {
                  //     maxHeight: "100%",
                  //   },
                  }}
                >
                    <Stack>
                      <ConversationList conversations={props.conversations} auth={props.auth} />
                    </Stack>
                </Scrollbar>

                  </CardContent>
                </Card>
              </Stack>
            </Grid>
           {props.conversations.principal_conversation && <Grid item xs={12} md={9} >
              <Stack >
                <Scrollbar
                  sx={{
                    height: '85vh',
                    '& .simplebar-content': {
                      height: '85vh'
                    },
                    '& .simplebar-placeholder': {
                      display: 'none'
                    }
                  //   "& .simplebar-content": {
                  //     maxHeight: "100%",
                  //   },
                  }}
                >
                  {messages.map((message, index) => (  
                    <MessageBox key={index} message={message} auth={props.auth}/>
                  ))}
                    <div ref={messagesEndRef} />
                </Scrollbar>
                <SendMessage
                  user={props.auth.user}
                  data={data}
                  handleChange={handleChange}
                  classes={classes}
                  sendMessage={sendMessage}
                />
              </Stack>
            </Grid> }
          </Grid>
        </Box>
      </>
    </Layout>
  );
}
