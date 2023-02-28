import React from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText, Switch, Typography } from "@mui/material";
export const ToggleSwitchListMenuItem = ({ value, setValue, disabled, loadError, primaryLabel, secondaryLabel, icon }) => {
    let toggle;
    if (loadError) {
        toggle = <Typography variant="body2" color="error">Error</Typography>;
    }
    else {
        toggle = (<Switch disabled={disabled} checked={value ?? false} onChange={(e) => {
                setValue(e.target.checked);
            }}/>);
    }
    return (<ListItem style={{
            userSelect: "none"
        }}>
            <ListItemAvatar>
                <Avatar>
                    {icon}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={primaryLabel} secondary={secondaryLabel} style={{ marginRight: "2rem" }}/>
            {toggle}
        </ListItem>);
};
