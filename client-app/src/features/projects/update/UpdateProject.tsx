import { Grid, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Project } from "../../../app/models/projects/Project";
import { Endpoints } from "../../../constants/Endpoints";
import axios from 'axios';
import SponsorCard from "../../components/SponsorCard";
import AutocompleteSponsors from "../../components/AutocompleteSponsors";
import { Sponsor } from "../../../app/models/sponsors/Sponsor";
import LoadingDialog from "../../dialogs/LoadingDialog";
import TextFieldGeneric from "../../components/TextFieldGeneric";
import DatePickerGeneric from "../../components/DatePickerGeneric";

const UpdateProject = () => {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState<Project>({} as Project);

    const updateSponsor = (sponsor: Sponsor) => {
        setProject({ ...project, sponsor: sponsor });
    };
    const updateName = (name: string) => {
        setProject({ ...project, name: name});
    };
    const updateStartDate = (startDate: Date) => {
        setProject({ ...project, startDate: startDate})
    };
    const updateEndDate = (endDate: Date) => {
        setProject({ ...project, endDate: endDate})
    };
    const updateDescription = (description: string) => {
        setProject({ ...project, description: description })
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
            <LoadingDialog
                open={loading}
            />
            {!loading && project.id !== 0 && 
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8} md={8}>
                        <Stack spacing={4}>
                            <Typography fontWeight={800}>General Data</Typography>
                            <Stack spacing={4} direction='row'>
                                <TextFieldGeneric
                                    value={project.nr}
                                    label={"Project ID"}
                                    isRequired={false}
                                    isDisabled />
                                <TextFieldGeneric
                                    value={project.name}
                                    label={"Project Name"}
                                    isRequired
                                    isDisabled={false}
                                    onValueChanged={updateName} />
                            </Stack>
                            <Stack spacing={4} direction='row'>
                                <DatePickerGeneric
                                    value={project.startDate}
                                    label={"Start Date"}
                                    isDisabled={false}
                                    onValueChanged={updateStartDate} />
                                <DatePickerGeneric
                                    value={project.endDate}
                                    label={"End Date"}
                                    isDisabled={false}
                                    onValueChanged={updateEndDate} />
                            </Stack>
                            <TextFieldGeneric
                                value={project.description}
                                label={"Project Description"}
                                isRequired                                
                                isDisabled={false}
                                onValueChanged={updateDescription} />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <Stack spacing={4}>
                            <Typography fontWeight={800}>Sponsor Data</Typography>
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
                        </Stack>                                        
                    </Grid>
                </Grid>
            }
        </div>      
    );

}

export default UpdateProject;