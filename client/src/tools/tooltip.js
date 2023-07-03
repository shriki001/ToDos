import React from 'react';
import MuiTooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';

export const Tooltip = (props => {
    const { classes, title, start } = props;
    return (
        <MuiTooltip
            classes={classes}
            style={{ display: 'inline', fontSize: '50px; !important' }}
            title={title}
            placement="left-start">
            <IconButton onClick={start}
                style={{
                    color: 'white', margin: 20,
                    height: 50, width: 50, alignSelf: 'center',
                    background: '#0C79FA'
                }}  >
                <Add />
            </IconButton>
        </MuiTooltip>
    );
});