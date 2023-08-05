
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

interface PropsInterface {
    isDisabled: boolean;
    label: string;
    value: any;
    onValueChanged: (value: any) => void;
}


const DatePickerGeneric: React.FC<PropsInterface> = (props: PropsInterface) => {

    const [value, setValue] = React.useState<Dayjs | null | string>(dayjs(props.value));

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                sx={ { width: '100%' } }
                disabled={props.isDisabled}
                label={props.label}
                value={value || ''}
                onChange={e => {
                    setValue(e)
                    props.onValueChanged(e)
                }}
            />
        </LocalizationProvider>
    );
};

export default DatePickerGeneric;