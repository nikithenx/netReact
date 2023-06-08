import { Edit, LocationOn } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Card,
    Divider,
    IconButton,
    Stack,
    Typography
} from "@mui/material";
import { purple } from "@mui/material/colors";
import { AppUser } from "../../app/models/appUsers/AppUser";

interface PropsInterface {
    user: AppUser
}

const AppUserCard: React.FC<PropsInterface> = (props: PropsInterface) => {

    const fullname = props.user.forename + ' ' + props.user.surname;
    const location = props.user.country + ', ' + props.user.city;

    return (
        <Card>
            <Box sx={{ p: 2, display: 'flex' }}>
                <Avatar variant="rounded" />
                <Stack spacing={0.5}>
                    <Typography fontWeight={700}>{fullname}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        <LocationOn sx={{ color: purple[500] }} /> {location}
                    </Typography>
                </Stack>
                <IconButton>
                    <Edit sx={{ fontSize: 14 }} />
                </IconButton>
            </Box>
            <Divider />
        </Card>
    )

}

export default AppUserCard;