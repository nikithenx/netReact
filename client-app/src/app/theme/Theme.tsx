import { createTheme } from "@mui/material";
import { blue, grey } from "@mui/material/colors";


const Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: blue,
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