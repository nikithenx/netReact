import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";


const Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: 'rgb(33,113,255)'
        },
        divider: grey[300],
        background: {
            default: '#2D3033'
        },
        text: {
            primary: grey[300],
            secondary: '#FFFFFF',
        },
    },
    typography: {
        fontSize: 12,
    },
});

export default Theme;