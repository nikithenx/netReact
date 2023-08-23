import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Project } from "../../app/models/projects/Project";
import { Endpoints } from "../../constants/Endpoints";
import axios from 'axios';

const UpdateProject = () => {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState<null | Project>(null);

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
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
                {loading ? (
                    <div>loading</div>
                ) : (
                    <div>{project?.name}</div>
                )}
            </Grid>
        </Grid>
    );

}

export default UpdateProject;