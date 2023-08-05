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
import { AppUser } from "../../app/models/appUsers/AppUser";

interface PropsInterface {
    user: AppUser
}

const AppUserCard: React.FC<PropsInterface> = (props: PropsInterface) => {

    const fullname = props.user.forename + ' ' + props.user.surname;
    const location = props.user.country;

    return (
        <Card>
            <Box sx={{ p: 2, display: 'flex' }}>
                <Avatar variant="rounded" />
                <Stack spacing={0.5} sx={{ ml: 1 }}>
                    <Typography fontWeight={600}>{fullname}</Typography>
                    <Stack direction='row'>
                        <LocationOn color="primary" />
                        <Typography variant="body2" color="text.secondary">
                            {location}
                        </Typography>
                    </Stack>
                </Stack>
                <IconButton>
                    <Edit sx={{ fontSize: 14, m: 1 }} />
                </IconButton>
            </Box>
            <Divider />
        </Card>
    )

}

export default AppUserCard;