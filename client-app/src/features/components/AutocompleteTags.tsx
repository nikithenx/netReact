
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
import { Tag } from "../../app/models/tags/Tag";
import { Endpoints } from "../../constants/Endpoints";

interface PropsInterface {
    tagIds: number[];
    onValueChanged: (value: Tag) => void;
}

const AutocompleteSponsor: React.FC<PropsInterface> = (props: PropsInterface) => {

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<readonly Tag[]>([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        (async () => {
            const tags = await axios.get(`${Endpoints.Tags}/Autocomplete`);
            if (active) {
                setOptions([...tags.data]);
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
            id="tags"
            sx={{ width: '100%' }}
            onChange={(e, newValue) => {
                if (newValue !== undefined && newValue !== null) {
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
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.name}
            options={options.filter((tag) => !props.tagIds.includes(tag.id))}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Tags"
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

export default AutocompleteSponsor;