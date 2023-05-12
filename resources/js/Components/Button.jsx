import { Button as BasicButton} from '@mui/material';
import React from 'react';

export default function Button({ type = 'submit', className = '', size = 'large', color = 'primary', fullWidth = false, disableElevation = true,  processing, children }) {
    return (
        <BasicButton
            variant="outlined" color={color} size={size} 
            fullWidth={fullWidth}
            disableElevation={disableElevation}
            type={type}
            className={className}
            disabled={processing}
        >
            {children}
        </BasicButton>
    );
}
