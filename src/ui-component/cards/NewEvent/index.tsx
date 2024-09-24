import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

// project imports
import Details from './Details';
import Invoice from './Invoice';
import Status from './Status';
import MainCard from 'ui-component/cards/MainCard';

// assets
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';
import { Summarize } from '@mui/icons-material';

// types
import { ThemeMode } from 'types/config';
import { TabsProps } from 'types';
import { EventDataType } from 'types/event';

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

const NewEvent = () => {
    const theme = useTheme();
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
                idObservacao: '',
                dataObservacao: '',
                observacao: ''
            }
        ],
        historicoComentariosObservacoes: [
            {
                id: '',
                comentario: '',
                observacao: ''
            }
        ],
        comentariosSobreOEvento: [
            {
                id: '',
                comentario: ''
            }
        ]
    });

    const handleChangeData = (event: any, name: string, category: string) => {
        setAllData((prevData) => ({
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
            </Tabs>

            {/* tab - details */}
            <TabPanel value={value} index={0}>
                <Details allData={allData} handleChangeAllData={handleChangeData} />
            </TabPanel>
        </MainCard>
    );
};

export default NewEvent;
