import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

// project imports
import TabDetalhe from './TabDetalhe';
import MainCard from 'ui-component/cards/MainCard';

// assets
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';

// types
import { ThemeMode } from 'types/config';
import { TabsProps } from 'types';
import { Oportunidade } from 'types/oportunidade';
import opportunities from 'api/opportunities.json';

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

// ==============================|| INVOICE DETAILS ||============================== //

const DetalheOportunidade = () => {
    const { id } = useParams();
    const theme = useTheme();

    const [data, setData] = useState<Oportunidade>();

    // set selected tab
    const [value, setValue] = useState<number>(0);
    const handleChangeTabs = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchedClients = opportunities.opportunities as unknown as Oportunidade; // Assegurando que o tipo está correto
        setData(fetchedClients);
    }, []);

    return (
        <MainCard>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChangeTabs}
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
                    '& a.Mui-selected': { color: 'primary.main' },
                    '& a > svg': { marginBottom: '0px !important', marginRight: 1.25 },
                    mb: 3
                }}
            >
                <Tab icon={<DescriptionTwoToneIcon />} component={Link} to="#" label="Detalhes" {...a11yProps(0)} />
            </Tabs>

            {/* tab - details */}
            <TabPanel value={value} index={id as any}>
                <TabDetalhe cliente={{
                    id: data?.cliente.id,
                    razao_social: data?.cliente.razao_social,
                    nome_fantasia: data?.cliente.nome_fantasia,
                    cnpj: data?.cliente.cnpj,
                    inscricao_estadual: data?.cliente.inscricao_estadual,
                    endereco_fiscal: data?.cliente.endereco_fiscal,
                    cep: data?.cliente.cep,
                    numero: data?.cliente.numero,
                    complemento: data?.cliente.complemento,
                    cidade: data?.cliente.cidade,
                    estado: data?.cliente.estado,
                    pais: data?.cliente.pais,
                    contato: data?.cliente.contato
                }}  />
            </TabPanel>
        </MainCard>
    );
};

export default DetalheOportunidade;