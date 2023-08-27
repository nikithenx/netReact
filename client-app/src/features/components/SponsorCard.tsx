import { Avatar, Box, Card, Divider, Stack, Typography } from "@mui/material";
import { Sponsor } from "../../app/models/sponsors/Sponsor"
import { LocationOn, Mail } from "@mui/icons-material";


interface PropsInterface {
    sponsor: Sponsor
}

const SponsorCard: React.FC<PropsInterface> = (props: PropsInterface) => {

    const fullname = props.sponsor.forename + ' ' + props.sponsor.surname;

    return (
        <Card>
            <Box sx={{ p: 2, display: 'flex' }}>
                <Avatar variant="rounded" sx={{ mt: 2, mr: 1 }} />
                <Stack spacing={0.5} sx={{ ml: 1 }}>
                    <Typography fontWeight={600}>{fullname}</Typography>
                    <Stack direction='row'>
                        <Mail color="secondary" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                            {props.sponsor.email}
                        </Typography>
                    </Stack>
                    <Stack direction='row'>
                        <LocationOn color="secondary" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                            {props.sponsor.region}
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
            <Divider />
        </Card>
    )
}

export default SponsorCard;