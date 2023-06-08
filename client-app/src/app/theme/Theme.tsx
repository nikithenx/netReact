import { createTheme } from "@mui/material";
import { grey, purple } from "@mui/material/colors";


const Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: purple,
        divider: grey[500],
        background: {
            default: grey[900],
            paper: grey[900],
        },
        text: {
            primary: '#fff',
            secondary: grey[500],
        },
    },
    typography: {
        fontSize: 12,
    },
});

export default Theme;