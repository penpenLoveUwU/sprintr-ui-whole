import React from "react";
import { Grid, Typography } from "@mui/material";
const TextInformationGrid = ({ items }) => {
    return (<Grid container spacing={2} style={{ wordBreak: "break-all" }}>
            {items.map((item) => {
            return (<Grid item key={item.header}>
                        <Typography variant="caption" color="textSecondary">
                            {item.header}
                        </Typography>
                        <Typography variant="body2">{item.body}</Typography>
                    </Grid>);
        })}
        </Grid>);
};
export default TextInformationGrid;
