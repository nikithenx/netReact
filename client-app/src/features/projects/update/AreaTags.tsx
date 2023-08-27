import { Chip, Stack, Typography } from "@mui/material";
import { ProjectTagBase } from "../../../app/models/projectsTags/ProjectTagBase";
import { Tag } from "@mui/icons-material";

interface PropsInterface {
    tags: ProjectTagBase[]
    onRemoveTag: (id: number) => void
}


const AreaTags = (props: PropsInterface) => {

    return (

        <div>
            {props.tags?.length > 0
                ? 
                (
                    <Stack spacing={4} direction='row'>
                        {props.tags.map((tag) => (
                            <Chip key={tag.id}
                                  icon={<Tag />} 
                                  color="secondary"
                                  label={tag.tagName} 
                                  onDelete={() => props.onRemoveTag(tag.id)} />                          
                        ))}
                    </Stack>
                ) :
                (
                    <Typography fontWeight={600}>No tags assigned to the project</Typography>
                )
            }
        </div>

    )
}

export default AreaTags;