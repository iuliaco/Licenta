import React, { useEffect, useRef } from 'react';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Grid';

export default function OrButton() {

    return (
        <Grid item xs={12} md={10} my={3}>
            <Box sx={{ display: 'flex', alignItems:'center'}}>
                <Divider sx={{  flexShrink:0, flexGrow:1}} />
                <Button
                    sx={{margin:1, px:6, fontSize: 20}} 

                    variant="outlined"
                    disabled
                    
                >
                    OR
                </Button>
                <Divider sx={{flexShrink:0, flexGrow:1 }} />
            </Box>
        </Grid>
    );
}
