import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

// project imports
import DadosCliente from './DadosCliente';
import Contato from './Contato';
import Endereco from './Endereco';
import useConfig from 'hooks/useConfig';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

// assets
import PersonAddTwoTone from '@mui/icons-material/PersonAddTwoTone';
import PinDropTwoTone from '@mui/icons-material/PinDropTwoTone';
import RecentActorsIcon from '@mui/icons-material/RecentActors';

// types
import { ThemeMode } from 'types/config';
import { TabsProps } from 'types';
import { ContatoCliente } from 'types/cliente';

// tabs
function TabPanel({ children, value, index, ...other }: TabsProps) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <div>{children}</div>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

// tabs option
const tabsOption = [
    {
        label: 'Empresa',
        icon: <PersonAddTwoTone />,
        caption: 'Dados cliente'
    },
    {
        label: 'Endereço',
        icon: <PinDropTwoTone />,
        caption: 'Detalhes endereço'
    },
    {
        label: 'Contato',
        icon: <RecentActorsIcon />,
        caption: 'Dados contato'
    },
];

interface Props {
    isOpen: boolean;
    handleDialogToggler?: () => void;
    handleDialogContato?: () => void;
    tabContato?: number;
}

// ==============================|| ADD CLIENT ||============================== //

const AdicionarCliente = ({ isOpen, handleDialogToggler, handleDialogContato, tabContato = 0 }: Props) => {
    const { mode, borderRadius } = useConfig();
    const [value, setValue] = useState<number>(tabContato);
    const [contatosData, setContatosData] = useState<ContatoCliente[]>([]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleAddItem = (addingData: ContatoCliente) => {
        setContatosData([
            ...contatosData,
            {
                id: addingData.id,
                nome: addingData.nome,
                telefone: addingData.telefone,
                email: addingData.email,
            }
        ]);
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard title="Adicionar novo cliente" content={false}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={3}>
                            <CardContent sx={{ pr: 0 }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    orientation="vertical"
                                    variant="scrollable"
                                    sx={{
                                        '& .MuiTabs-flexContainer': {
                                            borderBottom: 'none'
                                        },
                                        '& button': {
                                            color: mode === ThemeMode.DARK ? 'grey.600' : 'grey.900',
                                            minHeight: 'auto',
                                            minWidth: '100%',
                                            py: 1.5,
                                            px: 2,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'flex-start',
                                            textAlign: 'left',
                                            justifyContent: 'flex-start',
                                            borderRadius: `${borderRadius}px`
                                        },
                                        '& button.Mui-selected': {
                                            color: 'primary.main',
                                            bgcolor: mode === ThemeMode.DARK ? 'dark.main' : 'grey.50'
                                        },
                                        '& button > svg': {
                                            marginBottom: '0px !important',
                                            marginRight: 1.25,
                                            marginTop: 1.25,
                                            height: 20,
                                            width: 20
                                        },
                                        '& button > div > span': {
                                            display: 'block'
                                        },
                                        '& > div > span': {
                                            display: 'none'
                                        }
                                    }}
                                >
                                    {tabsOption.map((tab, index) => (
                                        <Tab
                                            key={index}
                                            icon={tab.icon}
                                            label={
                                                <Grid container direction="column">
                                                    <Typography variant="subtitle1" color="inherit">
                                                        {tab.label}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                                                        {tab.caption}
                                                    </Typography>
                                                </Grid>
                                            }
                                            {...a11yProps(index)}
                                        />
                                    ))}
                                </Tabs>
                            </CardContent>
                        </Grid>
                        <Grid item xs={12} lg={9}>
                            <CardContent
                                sx={{
                                    borderLeft: '1px solid',
                                    borderColor: mode === ThemeMode.DARK ? 'background.default' : 'grey.200',
                                    height: '100%'
                                }}
                            >
                                <TabPanel value={value} index={0}>
                                    <DadosCliente />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <Endereco />
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    {contatosData.length >= 0 && (
                                        <Contato {...{ handleAddItem }} />
                                    )}
                                </TabPanel>
                            </CardContent>
                        </Grid>
                    </Grid>
                    <Divider />
                    <CardActions>
                        <Grid container justifyContent="space-between" spacing={0}>
                            <Grid item>
                                {value > 0 && (
                                    <AnimateButton>
                                        <Button variant="outlined" size="large" onClick={(e) => handleChange(e, value - 1)}>
                                            Voltar
                                        </Button>
                                    </AnimateButton>
                                )}
                            </Grid>
                            <Grid item>
                                {value < 2 && (
                                    <Stack spacing={1.5} direction="row">
                                        <AnimateButton>
                                            <Button variant="outlined" size="large">
                                                Gravar
                                            </Button>
                                        </AnimateButton>
                                        <AnimateButton>
                                            <Button variant="contained" size="large" onClick={(e) => handleChange(e, 1 + value)}>
                                                Continuar
                                            </Button>
                                        </AnimateButton>
                                    </Stack>
                                )}
                                {value === 2 && (
                                    <AnimateButton>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            {...(!isOpen && { component: Link, to: '/apps/invoice/client/client-list' })}
                                            {...(isOpen && {
                                                onClick: () => {
                                                    handleDialogToggler?.(),
                                                    handleDialogContato?.()
                                                }
                                            })}
                                        >
                                            Gravar
                                        </Button>
                                    </AnimateButton>
                                )}
                            </Grid>
                        </Grid>
                    </CardActions>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default AdicionarCliente;
