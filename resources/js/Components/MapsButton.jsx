import React, { useEffect, useRef } from 'react';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function MapsButton({country, link, message}) {

    return (
        <Grid item xs={12}  my={1}>
            <Box sx={{ display: 'flex', alignItems:'center'}}>
                <Divider sx={{  flexShrink:0, flexGrow:1}} />
                <Button
                    sx={{margin:1, px:6, fontSize: 20}} 
                    variant="filled"
                    href={link + country}
                    target="_blank"
                >
                    {message}
                </Button>
                <Divider sx={{flexShrink:0, flexGrow:1 }} />
            </Box>
        </Grid>
    );
}
