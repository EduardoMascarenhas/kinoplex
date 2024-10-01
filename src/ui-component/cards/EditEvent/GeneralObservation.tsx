import React from 'react';
// material-ui
import { Grid, Tooltip, Button } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

// types
import { EventDataType } from 'types/event';
import SubCardCustom from 'ui-component/custom/SubCardCustom';
import ReactQuillEditEvent from './ReactQuillEditEvent';

const EGeneralObservation = ({
    allData,
    handleChangeAllData
}: {
    allData: EventDataType;
    handleChangeAllData: (event: any, name: string, category: string) => void;
}) => {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCardCustom allData={allData}>
                    <ReactQuillEditEvent />
                </SubCardCustom>
            </Grid>
        </Grid>
    );
};

export default EGeneralObservation;
