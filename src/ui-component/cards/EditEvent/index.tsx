import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

// project imports
import Details from './Details';
import MainCard from 'ui-component/cards/MainCard';
import EGeneralObservation from './GeneralObservation';

// assets
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import SummarizeTwoTone from '@mui/icons-material/SummarizeTwoTone';

// types
import { ThemeMode } from 'types/config';
import { TabsProps } from 'types';
import { EventDataType } from 'types/event';
import events from 'api/events.json'; // Importando o JSON local

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

// ==============================|| ORDER DETAILS ||============================== //

const EditEventById = () => {
    const theme = useTheme();
    // Captura o id da URL
    const { id } = useParams();
    const [allData, setAllData] = useState<EventDataType>({
        id: '',
        createdAt: '',
        empresa: {
            cnpj: '',
            nomeFantasia: '',
            banco: '',
            agencia: '',
            conta: ''
        },
        dataELocalizacao: {
            dia: '',
            complexo: '',
            convidados: +0
        },
        dadosDoEvento: {
            nEvento: '',
            status: '',
            tipoEvento: '',
            nomeEvento: '',
            cliente: '',
            nomeDoContato: '',
            emailDoContato: '',
            telefoneDoContato: '',
            responsavel: '',
            descricaoEvento: ''
        },
        pacote: [
            {
                id: +0,
                tipo: '',
                item: '',
                quantidade: +0,
                valorUnitario: +0,
                valorTotal: +0
            }
        ],
        infoAdministrativas: {
            dataVencimento: '',
            dataPagamento: '',
            formaDePagamento: '',
            informacoes: '',
            observacaoNoBoleto: ''
        },
        boletos: [
            {
                nBoleto: '',
                pagador: '',
                beneficiario: '',
                valorPago: +0,
                status: ''
            }
        ],
        observacoesGerais: [
            {
                id: '',
                createdAt: '',
                updatedAt: '',
                observacao: '',
                titulo: ''
            }
        ],
        historicoComentarios: [
            {
                id: '',
                createdAt: '',
                updatedAt: '',
                comentario: '',
                userName: ''
            }
        ]
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

    // Simulando o carregamento de dados do JSON
    useEffect(() => {
        const event: any = events.find((e) => `${e.id}` === `${id}`);
        if (event !== undefined) {
            setAllData(event);
        }
    }, [events]);

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
                <Tab icon={<DescriptionTwoToneIcon />} component={Link} to="#" label="Detalhes" {...a11yProps(0)} />
                <Tab icon={<SummarizeTwoTone />} component={Link} to="#" label="Observações Gerais" {...a11yProps(1)} />
            </Tabs>

            {/* tab - details */}
            <TabPanel value={value} index={0}>
                <Details allData={allData} handleChangeAllData={handleChangeData} />
            </TabPanel>

            {/* tab - details */}
            <TabPanel value={value} index={1}>
                <EGeneralObservation allData={allData} handleChangeAllData={handleChangeData} />
            </TabPanel>
        </MainCard>
    );
};

export default EditEventById;
