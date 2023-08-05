import { Container, Grid } from "@mui/material";
import InfoCard from "./InfoCard";
import { CardModel } from "./CardModel";


const cards: CardModel[] = [
    { 
        image: "/images/project_management.jpeg", 
        header: "Project Management", 
        description: "Manage your projects by maintaining data such as timeline or budget" 
    },
    { 
        image: "images/staffing.jpg", 
        header: "Project Staffing", 
        description: "See who is available to be staffed on future projects"
    },
    { 
        image: "images/cost_management.jpg", 
        header: "Project Tracking", 
        description: "Keep an eye on your budget. See whether your charged efforts are still in budget"
    },
    { 
        image: "images/insights.jpg", 
        header: "Reporting", 
        description: "Derive the correct and most efficient results from your projects"
    },
    { 
        image: "images/admin.jpeg", 
        header: "Administration", 
        description: "Grant, update and revoke user rights. Maintain system settings"
    },
]

const LandingPage = () => {

    return (
        <Container maxWidth="xl">
            <Grid container spacing={3}>
                {cards?.length > 0 && cards.map((data) => (
                    <Grid item xs={6} md={4}>
                        <InfoCard card={data} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default LandingPage;