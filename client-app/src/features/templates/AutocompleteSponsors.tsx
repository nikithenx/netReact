import {
    Autocomplete,
    CircularProgress,
    TextField
} from "@mui/material";
import axios from "axios";
import {
    Fragment,
    useEffect,
    useState
} from "react";
import { Sponsor } from "../../app/models/sponsors/Sponsor";
import { Endpoints } from "../../constants/Endpoints";

interface PropsInterface {
    isRequired: boolean;
    label: string;
    value?: Sponsor | null;
    onValueChanged: (value: Sponsor) => void;
}

const AutocompleteSponsors: React.FC<PropsInterface> = (props: PropsInterface) => {

    const [value, setValue] = useState(props.value);
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<readonly Sponsor[]>([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        (async () => {
            const sponsors = await axios.get(Endpoints.Sponsors);
            if (active) {
                setOptions([...sponsors.data]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);


    return (
        <Autocomplete
            id="sponsor"
            sx={{ width: '100%' }}
            value={value}
            onChange={(e, newValue) => {
                if (newValue !== undefined && newValue !== null) {
                    setValue(newValue);
                    props.onValueChanged(newValue)
                }                  
            }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={props.label}
                    required={props.isRequired}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}

export default AutocompleteSponsors;