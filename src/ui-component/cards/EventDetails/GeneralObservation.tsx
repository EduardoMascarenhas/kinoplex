import React from 'react';
// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';

// types
import { EventDataType } from 'types/event';
import SubCardCustom from 'ui-component/custom/SubCardCustom';

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
                    <></>
                </SubCardCustom>
            </Grid>
        </Grid>
    );
};

export default EGeneralObservation;
