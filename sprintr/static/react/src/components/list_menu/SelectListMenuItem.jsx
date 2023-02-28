import React from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText, MenuItem, Select, Typography } from "@mui/material";
export const SelectListMenuItem = ({ options, currentValue, setValue, disabled, loadError, primaryLabel, secondaryLabel, icon }) => {
    let select;
    if (loadError) {
        select = <Typography variant="body2" color="error">Error</Typography>;
    }
    else {
        select = (<Select disabled={disabled} value={currentValue.value} onChange={(e) => {
                const selectedOption = options.find(option => option.value === e.target.value);
                if (selectedOption) {
                    setValue(selectedOption);
                }
            }}>
                {options.map((o, i) => {
                return (<MenuItem value={o.value} key={`${o}_${i}`}>
                                {o.label}
                            </MenuItem>);
            })}
            </Select>);
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
            {select}
        </ListItem>);
};
