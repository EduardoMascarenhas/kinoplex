import { forwardRef, useState } from 'react';

// material-ui
import { useTheme, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Slide, { SlideProps } from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Chip from 'ui-component/extended/Chip';

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
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { EventDataType } from 'types/event';

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

// tab animation
const Transition = forwardRef((props: SlideProps, ref) => <Slide direction="left" ref={ref} {...props} />);

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

    // toggle write a review dialog
    const [open, setOpen] = useState(false);
    const handleClickOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    return (
        <SubCard title={`Id do Evento - ${allData?.id}`}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={12} lg={12}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">Nº Evento</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">{`${allData.id}`}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={3}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">Data de Criação do Evento</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">{`${allData?.createdAt}`}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">Data de Vencimento</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">{`${allData?.infoAdministrativas?.dataVencimento ? allData.infoAdministrativas.dataVencimento : 'Não Informado'}`}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={2}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">Valor Total</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">R$ {totalSum}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={2}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">Status do Evento</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Chip
                                        label={`${allData?.dadosDoEvento?.status ? (allData.dadosDoEvento.status === 'CONFIRMADO_AGUARDANDO_PAGAMENTO' ? 'Confirmado Aguardando Pagamento' : allData.dadosDoEvento.status === 'PAGO' ? 'Pago' : allData.dadosDoEvento.status === 'CANCELADO' ? 'Cancelado' : allData.dadosDoEvento.status === 'CONFIRMADO' ? 'Confirmado' : 'ERRO') : 'NULL'}`}
                                        variant="outlined"
                                        size="small"
                                        chipcolor={`${allData?.dadosDoEvento?.status ? (allData.dadosDoEvento.status === 'CONFIRMADO_AGUARDANDO_PAGAMENTO' ? 'secondary' : allData.dadosDoEvento.status === 'PAGO' ? 'success' : allData.dadosDoEvento.status === 'CANCELADO' ? 'error' : allData.dadosDoEvento.status === 'CONFIRMADO' ? 'primary' : 'error') : 'error'}`}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
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
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <Typography variant="h6">Evento Criado</Typography>
                                <Typography variant="body2">{`${allData?.createdAt}`}</Typography>
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
                                        <ListItemText primary="O Evento foi Criado." />
                                    </ListItem>
                                </List>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <Typography variant="h6">Aguardando Pagamento</Typography>
                                <Typography variant="body2">{`${allData?.createdAt}`}</Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary" sx={dotSX}>
                                    <FiberManualRecordIcon />
                                </TimelineDot>
                                <TimelineConnector sx={{ bgcolor: 'grey.400' }} />
                            </TimelineSeparator>
                            <TimelineContent sx={{ flex: 3 }}>
                                <List sx={listBoxSX}>
                                    <ListItem>
                                        <ListItemText
                                            primary={`Forma de Pagamento: ${allData?.infoAdministrativas?.formaDePagamento ? allData.infoAdministrativas.formaDePagamento : 'Não Informado'}`}
                                        />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText primary={`Valor Total à Pagar: R$ ${totalSum.toFixed(2)}`} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <Box sx={{ display: 'flex', gap: '10px' }}>
                                            <ListItemText primary={`Status Atual:`} />
                                            <Chip
                                                label={`${allData?.dadosDoEvento?.status ? (allData.dadosDoEvento.status === 'CONFIRMADO_AGUARDANDO_PAGAMENTO' ? 'Confirmado Aguardando Pagamento' : allData.dadosDoEvento.status === 'PAGO' ? 'Pago' : allData.dadosDoEvento.status === 'CANCELADO' ? 'Cancelado' : allData.dadosDoEvento.status === 'CONFIRMADO' ? 'Confirmado' : 'ERRO') : 'NULL'}`}
                                                variant="outlined"
                                                size="small"
                                                chipcolor={`${allData?.dadosDoEvento?.status ? (allData.dadosDoEvento.status === 'CONFIRMADO_AGUARDANDO_PAGAMENTO' ? 'secondary' : allData.dadosDoEvento.status === 'PAGO' ? 'success' : allData.dadosDoEvento.status === 'CANCELADO' ? 'error' : allData.dadosDoEvento.status === 'CONFIRMADO' ? 'primary' : 'error') : 'error'}`}
                                            />
                                        </Box>
                                    </ListItem>
                                </List>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <Typography variant="h6">Dia do Evento</Typography>
                                <Typography variant="body2">{`${allData?.createdAt}`}</Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot sx={dotSX}>
                                    <FiberManualRecordIcon />
                                </TimelineDot>
                                <TimelineConnector sx={{ bgcolor: 'grey.400' }} />
                            </TimelineSeparator>
                            <TimelineContent sx={{ flex: 3 }}>
                                <List sx={listBoxSX}>
                                    <ListItem>
                                        <ListItemText primary="Dia do Evento" />
                                    </ListItem>
                                </List>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <Typography variant="h6">Evento Realizado</Typography>
                                <Typography variant="body2">{`${allData?.createdAt}`}</Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot sx={dotSX}>
                                    <FiberManualRecordIcon />
                                </TimelineDot>
                                <TimelineConnector sx={{ bgcolor: 'grey.400' }} />
                            </TimelineSeparator>
                            <TimelineContent sx={{ flex: 3 }}>
                                <List sx={listBoxSX}>
                                    <ListItem>
                                        <ListItemText primary="Evento Realizado com Sucesso!" />
                                    </ListItem>
                                </List>
                            </TimelineContent>
                        </TimelineItem>
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
                                        <Button variant="contained">Salvar</Button>
                                    </AnimateButton>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default EStatus;
