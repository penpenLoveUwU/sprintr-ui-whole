import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
const ConfirmationDialog = ({ title, text, open, children, onClose, onAccept, }) => {
    return (<Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                {text && (<DialogContentText style={{
                whiteSpace: "pre-wrap"
            }}>
                        {text}
                    </DialogContentText>)}
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
            onAccept();
            onClose();
        }} autoFocus>
                    Yes
                </Button>
                <Button onClick={() => {
            onClose();
        }}>No</Button>
            </DialogActions>
        </Dialog>);
};
export default ConfirmationDialog;
