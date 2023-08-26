import { Stack, Typography } from "@mui/material";
import { ProjectAppUser } from "../../../app/models/projectsAppUsers/ProjectAppUser";
import AppUserCard from "../../components/AppUserCard";

interface PropsInterface {
    users: ProjectAppUser[]
    onRemoveUser: (identifier: number) => void
}

const AreaAppUsers = (props: PropsInterface) => {

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
                                        ${new Date(user.startDate).toLocaleDateString()} - 
                                        ${new Date(user.endDate).toLocaleDateString()}
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