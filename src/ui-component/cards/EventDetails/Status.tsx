import React from 'react';

// material-ui
import { useTheme, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {
    Timeline,
    TimelineDot,
    TimelineItem,
    TimelineConnector,
    TimelineContent,
    TimelineOppositeContent,
    TimelineSeparator
} from '@mui/lab';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { EventDataType } from 'types/event';
import formatarData from 'utils/formatarData';
import SubCardCustom from 'ui-component/custom/SubCardCustom';

const listBoxSX = {
    bgcolor: (theme: Theme) => theme.palette.background.default,
    py: 0
};

const dotSX = {
    p: 0,
    '& > svg': {
        width: 14,
        height: 14
    },
    display: { xs: 'none', md: 'flex' }
};

const EStatus = ({
    allData,
    handleChangeAllData
}: {
    allData: EventDataType;
    handleChangeAllData: (event: any, name: string, category: string) => void;
}) => {
    const theme = useTheme();
    // Calcular o total dos valores do pacote
    const totalSum = allData?.pacote?.reduce((acc, row) => acc + row.valorTotal, 0) || 0;

    return (
        <SubCardCustom allData={allData}>
            <Grid container spacing={gridSpacing}>
                <Grid item md={8} lg={9}>
                    <Timeline
                        sx={{
                            '& > li': {
                                mb: 2.75,
                                [theme.breakpoints.down('md')]: {
                                    flexDirection: 'column',
                                    '& > div': {
                                        px: 0
                                    },
                                    '& > div:first-of-type': {
                                        textAlign: 'left'
                                    }
                                }
                            },
                            [theme.breakpoints.down('md')]: {
                                p: 0
                            }
                        }}
                    >
                        {allData?.historicoComentarios.length ? (
                            allData.historicoComentarios.map((hC, i) => {
                                return (
                                    <TimelineItem>
                                        <TimelineOppositeContent>
                                            <Typography variant="h6">{hC.userName}</Typography>
                                            <Typography variant="body2">{`${formatarData(hC.createdAt)}`}</Typography>
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot color="primary" sx={dotSX}>
                                                <FiberManualRecordIcon />
                                            </TimelineDot>
                                            <TimelineConnector sx={{ bgcolor: 'primary.main' }} />
                                        </TimelineSeparator>
                                        <TimelineContent sx={{ flex: 3 }}>
                                            <List sx={listBoxSX}>
                                                <ListItem>
                                                    <ListItemText primary={hC.comentario} />
                                                </ListItem>
                                            </List>
                                        </TimelineContent>
                                    </TimelineItem>
                                );
                            })
                        ) : (
                            <></>
                        )}
                    </Timeline>
                </Grid>
                <Grid item md={4} lg={3}>
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField id="outlined-basic2" fullWidth multiline rows={10} label="Escreva um Comentário para o Evento" />
                            </Grid>
                            <Grid item xs={12}>
                                <Stack direction="row">
                                    <AnimateButton>
                                        <Button variant="contained">Novo Comentário</Button>
                                    </AnimateButton>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </SubCardCustom>
    );
};

export default EStatus;
