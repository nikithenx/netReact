import { Box, CircularProgress, Dialog, DialogContent, Stack, Typography } from "@mui/material";

interface PropsInterface {
    open: boolean,
}

const LoadingDialog = (props: PropsInterface) => {

    return (
        <Dialog
            open={props.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <Box sx={{ display: 'flex' }}>
                    <Stack spacing={3} 
                           direction='row' 
                           sx={{ alignItems: "center" }}>
                        <CircularProgress />
                        <Typography fontWeight={600}>Loading...</Typography>
                    </Stack>                
                </Box>
            </DialogContent>
        </Dialog>
    )

}

export default LoadingDialog;