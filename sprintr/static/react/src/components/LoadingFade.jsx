import { CircularProgress, Fade } from "@mui/material";
import React from "react";
const LoadingFade = ({ in: fadeIn = true, transitionDelay = "500ms", size }) => {
    return (<Fade in={fadeIn} style={{
            transitionDelay,
        }} unmountOnExit>
            <CircularProgress size={size}/>
        </Fade>);
};
export default LoadingFade;
