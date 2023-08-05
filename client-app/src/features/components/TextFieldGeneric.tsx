
import { TextField } from "@mui/material";
import React from "react";


interface PropsInterface {
    isDisabled: boolean;
    isRequired: boolean;
    label: string;
    value: any;
    onValueChanged?: (val: any) => any;
}


const TextFieldGeneric: React.FC<PropsInterface> = (props: PropsInterface) => {

    const [value, setValue] = React.useState(props.value);

    return (
        <TextField
            id={props.label}
            fullWidth={true}
            disabled={props.isDisabled}
            required={props.isRequired}
            label={props.label}
            value={value || ''}
            multiline
            onChange={e => {
                setValue(e.target.value)
                if (props.onValueChanged !== undefined)
                    props.onValueChanged(e.target.value)
            }}
        />
     );
};

export default TextFieldGeneric;