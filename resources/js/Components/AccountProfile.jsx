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
  import { useForm } from '@inertiajs/react'
import { useRef } from 'react';

  
  export const AccountProfile = (props) => {
    const { data, setData, post, progress } = useForm({
      avatar: null,
    })
    
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
      fileInputRef.current.click();
    };
    
    function handleUpload(e) {
      e.preventDefault()
      post('/api/upload-avatar')
    }

    return (
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
            src={ "/storage/avatars/" + props.user.profile_photo_url}
            // src={ "/storage/avatars/1_avatar1685209706.png" }
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
      {data.avatar && (
        <div>
          <Typography gutterBottom variant="body2" sx={{textAlign:"center"}}>
          Selected file: {data.avatar.name}
          </Typography>
          <Button
          fullWidth
          variant="text"
           onClick={handleUpload}> Upload </Button>
        </div>
      )}
      <CardActions>
        <Button
          fullWidth
          variant="text"
          onClick={handleButtonClick}
        >
          { !data.avatar ?
          "Upload picture" : "Change picture"
          }
        </Button>
        <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={e => setData('avatar', e.target.files[0])}
      />
      {progress && (
      <progress value={progress.percentage} max="100">
        {progress.percentage}%
      </progress>
    )}
      
      </CardActions>
    </Card>
  )}
  ;