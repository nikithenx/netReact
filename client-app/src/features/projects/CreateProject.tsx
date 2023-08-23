import { Edit, GroupAdd, Settings, Tag } from "@mui/icons-material";
import {
    Box,
    Button,
    Chip,
    Container,
    Stack,
    Step,
    StepConnector,
    StepIconProps,
    StepLabel,
    Stepper,
    Typography,
    stepConnectorClasses,
    styled
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { AppUser } from "../../app/models/appUsers/AppUser";
import { AppUserForSearch } from "../../app/models/appUsers/AppUserForSearch";
import { ProjectCreation } from "../../app/models/projects/ProjectCreation";
import { Sponsor } from "../../app/models/sponsors/Sponsor";
import { Endpoints } from "../../constants/Endpoints";
import { mapper } from "../../mappings/mapper";
import AppUserCard from "../components/AppUserCard";
import AutocompleteTags from "../components/AutocompleteTags";
import AutocompleteUsers from "../components/AutocompleteUsers";
import ProjectGeneral from "./ProjectGeneral";
import { ProjectTag } from "../../app/models/tags/ProjectTag";


const CreateProject = () => {

    const steps = ['General', 'Add Tags', 'Add Users'];
    const [activeStep, setActiveStep] = useState(0);

    const [sponsor, setSponsor] = useState<Sponsor | null>(null);
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState(new Date);
    const [endDate, setEndDate] = useState(new Date);
    const [description, setDescription] = useState('');

    // Tags assigned to the project
    const [tags, setTags] = useState<ProjectTag[]>([]);
    const tagIds = tags.map(({ id }) => id);

    const addTag = (tag: ProjectTag) => {
        setTags(tags => [...tags, { ...tag }]);
    };
    const removeTag = (toDelete: ProjectTag) => () => {
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

    const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 22,
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundImage:
                    'linear-gradient(95deg,rgb(33,113,255) 0%,rgb(87,64,233) 50%,rgb(35,35,135) 100%)',
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundImage:
                    'linear-gradient(95deg,rgb(33,113,255) 0%,rgb(87,64,233) 50%,rgb(35,35,135) 100%)',
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            height: 3,
            border: 0,
            backgroundColor:
                theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
            borderRadius: 1,
        },
    }));

    const ColorlibStepIconRoot = styled('div')<{
        ownerState: { completed?: boolean; active?: boolean };
    }>(({ theme, ownerState }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
            backgroundImage:
                'linear-gradient( 136deg, rgb(33,113,255) 0%,rgb(87,64,233) 50%,rgb(35,35,135) 100%)',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        }),
        ...(ownerState.completed && {
            backgroundImage:
                'linear-gradient( 136deg, rgb(33,113,255) 0%,rgb(87,64,233) 50%,rgb(35,35,135) 100%)',
        }),
    }));

    function ColorlibStepIcon(props: StepIconProps) {
        const { active, completed, className } = props;

        const icons: { [index: string]: React.ReactElement } = {
            1: <Settings />,
            2: <Tag />,
            3: <GroupAdd />,
        };

        return (
            <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
                {icons[String(props.icon)]}
            </ColorlibStepIconRoot>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Typography mb={4} mx={1} variant="h5">
                <Edit color="primary" /> Create Project ({activeStep + 1} / {steps.length})
            </Typography>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((label) => {
                    const stepProps: { completed?: boolean } = {};
                    return (
                        <Step key={label} {...stepProps}>                            
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
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