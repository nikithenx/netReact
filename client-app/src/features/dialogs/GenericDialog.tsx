import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import React from "react";


interface PropsInterface {
    title: string,
    content: string,
    open: boolean,
    onClose: (value: boolean) => any;
}

export const GenericDialog: React.FC<PropsInterface> = (props: PropsInterface) => {

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.onClose(false)}>Cancel</Button>
                <Button onClick={() => props.onClose(true)} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
};