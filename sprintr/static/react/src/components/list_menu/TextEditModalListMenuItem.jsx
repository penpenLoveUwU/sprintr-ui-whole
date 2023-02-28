import React from "react";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Edit as EditIcon } from "@mui/icons-material";
export const TextEditModalListMenuItem = ({ primaryLabel, secondaryLabel, icon, dialog, value, isLoading, }) => {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [editorValue, setEditorValue] = React.useState(value);
    return (<>
            <ListItem style={{
            userSelect: "none"
        }}>
                <ListItemAvatar>
                    <Avatar>
                        {icon}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={primaryLabel} secondary={secondaryLabel} style={{ marginRight: "2rem" }}/>
                <LoadingButton loading={isLoading} variant="outlined" onClick={() => {
            setEditorValue(value);
            setDialogOpen(true);
        }} sx={{
            mt: 1,
            mb: 1,
            minWidth: 0
        }}>
                    <EditIcon />
                </LoadingButton>
            </ListItem>

            <TextEditModal dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} title={dialog.title} description={dialog.description} value={editorValue} setValue={(newValue) => {
            if (typeof dialog.validatingTransformer === "function") {
                setEditorValue(dialog.validatingTransformer(newValue));
            }
            else {
                setEditorValue(newValue);
            }
        }} onSave={dialog.onSave}/>
        </>);
};
const TextEditModal = ({ dialogOpen, setDialogOpen, title, description, value, setValue, onSave }) => {
    return (<Dialog open={dialogOpen} onClose={() => {
            setDialogOpen(false);
        }}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {description && (<>
                        <DialogContentText style={{
                whiteSpace: "pre-wrap"
            }}>
                            {description}
                        </DialogContentText>
                        <br />
                    </>)}

                <Input type={"text"} fullWidth value={value} sx={{ mb: 1 }} onChange={(e) => {
            setValue(e.target.value);
        }}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
            onSave(value);
            setDialogOpen(false);
        }} autoFocus>
                    Save
                </Button>
                <Button onClick={() => {
            setDialogOpen(false);
        }}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>);
};
