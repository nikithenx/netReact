import { ErrorOutline } from "@mui/icons-material";
import { Box, Dialog, DialogContent, Stack, Typography } from "@mui/material";

interface PropsInterface {
    open: boolean,
}

const ErrorDialog = (props: PropsInterface) => {

    return (
        <Dialog
            open={props.open}
            aria-describedby="error-dialog-description"
        >
            <DialogContent id="error-dialog-description">
                <Box sx={{ display: 'flex' }}>
                    <Stack spacing={3} 
                           direction='row' 
                           sx={{ alignItems: "center" }}>
                        <ErrorOutline fontSize="large" color="error" />
                        <Typography fontWeight={600}>Something went wrong</Typography>
                    </Stack>                
                </Box>
            </DialogContent>
        </Dialog>
    )

}

export default ErrorDialog;