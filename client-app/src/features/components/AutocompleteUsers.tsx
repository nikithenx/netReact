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
import { AppUserForSearch } from "../../app/models/appUsers/AppUserForSearch";
import { Endpoints } from "../../constants/Endpoints";

interface PropsInterface {
    userIds: number[];
    onValueChanged: (value: AppUserForSearch) => void;
}

const AutocompleteUsers: React.FC<PropsInterface> = (props: PropsInterface) => {

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<readonly AppUserForSearch[]>([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        (async () => {
            const users = await axios.get(`${Endpoints.AppUsers}/Search`);
            if (active) {
                setOptions([...users.data]);
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
            id="users"
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
            getOptionLabel={(option) => option.forename + ' ' + option.surname}
            options={options.filter((user) => !props.userIds.includes(user.id))}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Users"
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

export default AutocompleteUsers;