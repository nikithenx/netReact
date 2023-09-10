import { Stack, Typography } from "@mui/material";
import AppUserCard from "../../components/AppUserCard";
import { ProjectAppUserBase } from "../../../app/models/projectsAppUsers/ProjectAppUserBase";
import { Constants } from "../../../constants/Constants";
import axios from "axios";
import { Endpoints } from "../../../constants/Endpoints";
import { Mappings } from "../../../mappings/Mappings";

interface PropsInterface {
    users: ProjectAppUserBase[]
    onRemoveUser: (identifier: number) => void
}

const AreaAppUsers = (props: PropsInterface) => {

    const dateFormat = Constants.DateFormat;

    async function update(projectUser: ProjectAppUserBase)
    {
        var appUser = Mappings.toProjectAppUserUpdate(projectUser, 1);

        await axios.post(Endpoints.ProjectAppUsers, appUser)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (

        <div>
            {props.users?.length > 0
                ? 
                (
                    <Stack spacing={4} direction='row'>
                        {props.users.map((user) => (
                            <Stack spacing={2} key={user.id}>
                                <AppUserCard 
                                    user={user.appUser}
                                    identifier={user.id}
                                    onRemoveUser={props.onRemoveUser}
                                />                                
                                <Typography fontWeight={300}>
                                    {`
                                        ${dateFormat.format(new Date(user.startDate))} - 
                                        ${dateFormat.format(new Date(user.endDate))}
                                    `}
                                </Typography>
                            </Stack>                            
                        ))}
                    </Stack>
                ) :
                (
                    <Typography fontWeight={600}>No users assigned to the project</Typography>
                )
            }
        </div>

    )
}

export default AreaAppUsers;