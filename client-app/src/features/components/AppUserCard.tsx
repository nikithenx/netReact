import { LocationOn, PersonRemove } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Card,
    Divider,
    IconButton,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import { AppUser } from "../../app/models/appUsers/AppUser";

interface PropsInterface {
    user: AppUser
    identifier: number
    onRemoveUser: (identifier : number) => void
}

const AppUserCard: React.FC<PropsInterface> = (props: PropsInterface) => {

    const fullname = props.user.forename + ' ' + props.user.surname;

    return (
        <Card>
            <Box sx={{ p: 2, display: 'flex' }}>
                <Avatar variant="rounded" />
                <Stack spacing={0.5} sx={{ ml: 1 }}>
                    <Typography fontWeight={600}>{fullname}</Typography>
                    <Stack direction='row'>
                        <LocationOn color="primary" />
                        <Typography variant="body2" color="text.secondary">
                            {props.user.country}
                        </Typography>
                    </Stack>
                </Stack>
                <Tooltip title="Remove user">
                    <IconButton
                        onClick={() => props.onRemoveUser(props.identifier)}>
                        <PersonRemove 
                            color="error"
                            sx={{ fontSize: 14, m: 1 }} 
                        />
                    </IconButton>
                </Tooltip>                
            </Box>
            <Divider />
        </Card>
    )

}

export default AppUserCard;