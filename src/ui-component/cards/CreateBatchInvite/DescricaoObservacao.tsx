import React, { useState, useEffect } from 'react';
// material-ui
import { Grid, TextField, FormControlLabel, Checkbox, Box, Select, MenuItem, FormControl, InputLabel, Stack } from '@mui/material';
import { Input as BaseInput, InputProps } from '@mui/base/Input';
import { styled } from '@mui/system';

const blue = {
    100: '#DAECFF',
    200: '#80BFFF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2'
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025'
};

const RootDiv = styled('div')`
    display: flex;
    max-width: 100%;
`;

const TextareaElement = styled('textarea', {
    shouldForwardProp: (prop) => !['ownerState', 'minRows', 'maxRows'].includes(prop.toString())
})(
    ({ theme }) => `
    min-width: 100%;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5rem;
    padding: 8px 12px;
    border-radius: 8px 8px 0 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

const Input = React.forwardRef(function CustomInput(props: InputProps, ref: React.ForwardedRef<HTMLDivElement>) {
    return (
        <BaseInput
            slots={{
                root: RootDiv,
                input: 'input',
                textarea: TextareaElement
            }}
            {...props}
            ref={ref}
        />
    );
});
export interface AllDataType {
    printName?: string;
}

const DescricaoObservacao = ({ categoria }: { categoria: string }) => {
    const [allData, setAllData] = useState<AllDataType>({
        printName: ''
    });

    const handleChangeData = (event: any, name: string) => {
        setAllData({ ...allData, [name]: event.target.value });
    };

    return (
        <Grid container gap={2}>
            <Input
                aria-label="Comentário Observação"
                multiline
                placeholder="Insira uma observação ou comentário... "
                style={{ width: '100%' }}
                rows={10}
            />
        </Grid>
    );
};

export default DescricaoObservacao;
