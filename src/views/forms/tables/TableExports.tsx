// material-ui
import ButtonBase from '@mui/material/ButtonBase';
import Tooltip from '@mui/material/Tooltip';

// third-party
import { CSVLink } from 'react-csv';

// assets
import { IconDeviceFloppy } from '@tabler/icons-react';

// ==============================|| CSV Export ||============================== //

export const CSVExport = ({ data, filename, headers }: any) => {
    return (
        <Tooltip title="Exportar CSV" placement="left">
            <ButtonBase sx={{ mt: 0.5, '& svg': { color: 'secondary.main' } }}>
                <CSVLink data={data} filename={filename} headers={headers}>
                    <IconDeviceFloppy aria-label="Exportar arquivo CSV" />
                </CSVLink>
            </ButtonBase>
        </Tooltip>
    );
};
