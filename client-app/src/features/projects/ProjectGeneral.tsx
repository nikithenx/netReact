
import {
    Container,
    Grid
} from "@mui/material";
import { Sponsor } from "../../app/models/sponsors/Sponsor";
import AutocompleteSponsors from "../components/AutocompleteSponsors";
import DatePickerGeneric from "../components/DatePickerGeneric";
import TextFieldGeneric from "../components/TextFieldGeneric";


interface PropsInterface {
    sponsor?: Sponsor | null;
    name: string;
    startDate: Date;
    endDate: Date;
    description: string;

    sponsorChanged: (value: Sponsor) => void;
    nameChanged: (value: string) => void;
    startDateChanged: (value: Date) => void;
    endChanged: (value: Date) => void;
    descriptionChanged: (value: string) => void;
}


const ProjectGeneral: React.FC<PropsInterface> = (props: PropsInterface) => {

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={6}>
                    <TextFieldGeneric
                        value={props.name}
                        label={"Project Name"}
                        isRequired={true}
                        isDisabled={false}
                        onValueChanged={props.nameChanged} />
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                    <AutocompleteSponsors
                        label={"Sponsor"}
                        value={props.sponsor}
                        isRequired={true}
                        onValueChanged={props.sponsorChanged} />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <DatePickerGeneric
                        value={props.startDate}
                        label={"Start Date"}
                        isDisabled={false}
                        onValueChanged={props.startDateChanged} />
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                    <DatePickerGeneric
                        value={props.endDate}
                        label={"End Date"}
                        isDisabled={false}
                        onValueChanged={props.endChanged} />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <TextFieldGeneric
                        value={props.description}
                        label={"Project Description"}
                        isRequired={true}
                        isDisabled={false}
                        onValueChanged={props.descriptionChanged} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default ProjectGeneral;