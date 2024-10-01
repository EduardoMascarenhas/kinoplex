import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

// project imports
import Details from './Details';
import Endereco from './Endereco';
import Empresa from './Empresa';
import Contato from './Contato';
import MainCard from 'ui-component/cards/MainCard';

// assets
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone';

// types
import { ThemeMode } from 'types/config';
import { TabsProps } from 'types';

import clients from 'api/clientes2.json'; // Importando o JSON local

// tab content
function TabPanel({ children, value, index, ...other }: TabsProps) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

// ==============================|| Novo Cliente ||============================== //

const DetailsClient = () => {
    const theme = useTheme();
    const { id } = useParams();
    const [allData, setAllData] = useState<any>({
        empresa: {
            tipo: '',
            nomeRazaoSocial: '',
            documento: '',
            apelido: '',
            inscricaoMunicipal: '',
            inscricaoEstadual: '',
            suframa: '',
            ramoAtividade: '',
            siteWeb: '',
            numeroFuncionarios: 0
        },
        endereco: {
            cep: '',
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: ''
        },
        contatos: {
            nome: '',
            email: '',
            cargo: '',
            telefone: ''
        }
    });

    const handleChangeData = (event: any, name: string, category: string) => {
        setAllData((prevData: any) => ({
            ...prevData,
            [category]: {
                ...prevData[category],
                [name]: event.target.value
            }
        }));
    };
    // set selected tab
    const [value, setValue] = useState<number>(0);
    const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        const client: any = clients.clientes.find((c) => c.id === `${id}`);
        if (client !== undefined) {
            setAllData(client);
        }
    }, [clients]);

    return (
        <MainCard>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                variant="scrollable"
                aria-label="simple tabs example"
                sx={{
                    '& a': {
                        minHeight: 'auto',
                        minWidth: 10,
                        px: 1,
                        py: 1.5,
                        mr: 2.25,
                        color: theme.palette.mode === ThemeMode.DARK ? 'grey.600' : 'grey.900',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    '& a.Mui-selected': {
                        color: 'primary.main'
                    },
                    '& a > svg': {
                        marginBottom: '0px !important',
                        marginRight: 1.25
                    },
                    mb: 3
                }}
            >
                <Tab icon={<DescriptionTwoToneIcon />} component={Link} to="#" label="Contato" {...a11yProps(0)} />
                <Tab icon={<HomeTwoToneIcon />} component={Link} to="#" label="Endereço" {...a11yProps(1)} />
                <Tab icon={<BusinessTwoToneIcon />} component={Link} to="#" label="Empresa" {...a11yProps(2)} />
            </Tabs>

            {/* tab - details */}
            <TabPanel value={value} index={0}>
                <Details allData={allData} handleChangeAllData={handleChangeData} />
            </TabPanel>
            {/* tab - endereco */}
            <TabPanel value={value} index={1}>
                <Endereco allData={allData} handleChangeAllData={handleChangeData} />
            </TabPanel>
            {/* tab - empresa */}
            <TabPanel value={value} index={2}>
                <Empresa allData={allData} handleChangeAllData={handleChangeData} />
            </TabPanel>
            <Grid item xs={12} sx={{ margin: '25px' }}>
                <Divider />
            </Grid>
        </MainCard>
    );
};

export default DetailsClient;
