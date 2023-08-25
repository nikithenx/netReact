import { Grid, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Project } from "../../app/models/projects/Project";
import { Endpoints } from "../../constants/Endpoints";
import axios from 'axios';
import SponsorCard from "../components/SponsorCard";
import AutocompleteSponsors from "../components/AutocompleteSponsors";
import { Sponsor } from "../../app/models/sponsors/Sponsor";

const UpdateProject = () => {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState<Project>({} as Project);

    const updateSponsor = (sponsor: Sponsor) => {
        setProject({ ...project, sponsor: sponsor });
    };

    useEffect(() => {
        async function getProject() {
            await axios.get(`${Endpoints.Projects}/${id}`)
                .then(response => {
                    setProject(response.data);
                    setLoading(false);
                })
        }
        getProject();
    }, [])

    return (
        <div>
            {loading && <div>Loading</div>}
            {!loading && project.id > 0 && 
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8} md={8}>

                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Stack spacing={4} direction='column'>
                                <SponsorCard sponsor={project.sponsor} />
                                <AutocompleteSponsors
                                    label={"Update Sponsor"}
                                    value={project.sponsor}
                                    isRequired={false}
                                    onValueChanged={updateSponsor} />
                            </Stack>
                        </Paper>                    
                    </Grid>
                </Grid>
            }
        </div>      
    );

}

export default UpdateProject;