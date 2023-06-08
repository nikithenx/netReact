import { Edit } from "@mui/icons-material";
import {
    Box,
    Button,
    Chip,
    Container,
    Stack,
    Step,
    StepLabel,
    Stepper,
    Typography
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { AppUser } from "../../app/models/appUsers/AppUser";
import { AppUserForSearch } from "../../app/models/appUsers/AppUserForSearch";
import { ProjectCreation } from "../../app/models/projects/ProjectCreation";
import { Sponsor } from "../../app/models/sponsors/Sponsor";
import { TagBase } from "../../app/models/tags/TagBase";
import { Endpoints } from "../../constants/Endpoints";
import { mapper } from "../../mappings/mapper";
import AppUserCard from "../templates/AppUserCard";
import AutocompleteTags from "../templates/AutocompleteTags";
import AutocompleteUsers from "../templates/AutocompleteUsers";
import ProjectGeneral from "./ProjectGeneral";


const CreateProject = () => {

    const steps = ['General', 'Add Tags', 'Add Users'];
    const [activeStep, setActiveStep] = useState(0);

    const [sponsor, setSponsor] = useState<Sponsor | null>(null);
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState(new Date);
    const [endDate, setEndDate] = useState(new Date);
    const [description, setDescription] = useState('');

    // Tags assigned to the project
    const [tags, setTags] = useState<TagBase[]>([]);
    const tagIds = tags.map(({ id }) => id);

    const addTag = (tag: TagBase) => {
        setTags(tags => [...tags, { ...tag }]);
    };
    const removeTag = (toDelete: TagBase) => () => {
        setTags((tags) => tags.filter((tag) => tag.id !== toDelete.id));
    };

    const [users, setUsers] = useState<AppUser[]>([]);

    const addUser = (user: AppUserForSearch) => {
        const appUser = mapper.map<AppUserForSearch, AppUser>(
            user, 'AppUserSearch', 'AppUser' 
        ); 
        setUsers(users => [...users, { ...appUser }])
    }

    const project: ProjectCreation =
    {
        sponsorId: sponsor?.id ?? 0,
        name: name,
        startDate: startDate,
        endDate: endDate,
        description: description,
        tags: tags.map(({ id }) => {
            return { tagId: id };
        }),
        appUsers: users.map((user) => {
            return { appUserId: user.id, startDate: startDate, endDate: endDate };
        })
    };

    async function createProject() {
        await axios.post(Endpoints.Projects, project)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Typography mb={4} mx={1} variant="h5">
                <Edit color="primary" /> Create Project ({activeStep + 1} / {steps.length})
            </Typography>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === 0 && 
                <form onSubmit={handleNext}>
                    <ProjectGeneral
                        sponsor={sponsor}
                        sponsorChanged={setSponsor}
                        name={name}
                        nameChanged={setName}
                        startDate={startDate}
                        startDateChanged={setStartDate}
                        endDate={endDate}
                        endChanged={setEndDate}
                        description={description}
                        descriptionChanged={setDescription}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button
                            type="submit">
                            Next
                        </Button>
                    </Box>
                </form>
            }
            {activeStep === 1 &&
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                        <AutocompleteTags
                            onValueChanged={addTag}
                            tagIds={tagIds} />
                        <Stack sx={{ my: 4 }} direction="row" spacing={1}>
                            {tags?.length > 0 && tags.map((tag) => (
                                <Chip
                                    key={tag.id}
                                    color="primary"
                                    label={tag.name}
                                    onDelete={removeTag(tag)}
                                />
                            ))}
                        </Stack>
                    </Container>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button
                            color="primary"
                            onClick={handleNext}
                            sx={{ mr: 1 }}
                        >
                            Next
                        </Button>
                    </Box>
                </Box>             
            }
            {activeStep === 2 &&
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                        <AutocompleteUsers
                            onValueChanged={addUser}
                            />
                        <Stack sx={{ my: 2 }} direction="row" spacing={1}>
                            {users?.length > 0 && users.map((user) => (
                                <AppUserCard
                                    key={user.id}
                                    user={user} />
                            ))}
                        </Stack>
                    </Container>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={createProject}
                            sx={{ mr: 1 }}
                        >
                            Create
                        </Button>
                    </Box>
                </Box>
            }
        </Box>
    );
}

export default CreateProject;