import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { CardModel } from "./CardModel";

interface PropsInterface {
    card: CardModel
}

const InfoCard: React.FC<PropsInterface> = (props: PropsInterface) => {
    return (
        <Card sx={{ width: '100%', height: '100%' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="150"
                    image={props.card.image}
                    alt=""
                />
                <CardContent>
                    <Typography color="primary" gutterBottom variant="h4" component="div">
                        {props.card.header}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {props.card.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default InfoCard;