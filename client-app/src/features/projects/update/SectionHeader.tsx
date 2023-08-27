import { Typography } from "@mui/material"

interface PropsInterface {
    title: string
}

export const SectionHeader = (props: PropsInterface) => {

    return (

        <Typography color="primary" variant="h6" fontWeight={500}>
            {props.title}
        </Typography>  
    )

}