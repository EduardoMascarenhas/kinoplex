import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

// third-party
import { random } from 'lodash-es';
import * as yup from 'yup';
import ReactToPrint from 'react-to-print';

// project imports
import PaymentTable from './PaymentTable';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/pt-br';

import { dispatch, useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { getDetailCards } from 'store/slices/user';
import { openSnackbar } from 'store/slices/snackbar';
import { getInvoice } from 'store/slices/customer';

// assets
import CheckIcon from '@mui/icons-material/Check';

// types
import { Cliente } from 'types/cliente';
import { UserProfile } from 'types/user-profile';
import { Invoice } from 'types/invoice';
import { ThemeMode } from 'types/config';
import InfoCliente from 'views/convites/CriarOportunidades/InfoCliente';

dayjs.extend(utc);
dayjs.extend(timezone);

const validationSchema = yup.object({
    receiptID: yup.string().required('É nescessário inserir o ID do recibo de pagamento!'),
    amount: yup.string().required('É nescessário inserir o valor recebido!')
});

function getRandomRow(arr: Invoice[], num: number) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
}

// ==============================|| ADD PAYMENT ||============================== //

const ConviteFaturamento = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const componentRef: React.Ref<HTMLDivElement> = useRef(null);

    const { detailCards } = useSelector((state) => state.user);
    const { invoices } = useSelector((state) => state.customer);
    const [value, setValue] = useState<Dayjs | null>(dayjs().tz('America/Sao_Paulo'));
    const [client, setClient] = useState<UserProfile[]>([]);
    const [data, setData] = useState<string>('');
    const [row, setRow] = useState<Invoice[]>([]);
    const [select, setSelect] = useState<string>('');
    const [fieldValue, setFieldValue] = useState<Cliente>();

    // open dialog to edit review
    const [open, setOpen] = useState(false);

    const handleDialogToggler = () => {
        setOpen(!open);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: fieldValue ? fieldValue?.id : '',
            receiptID: '',
            amount: '',
            razao_social: fieldValue ? fieldValue?.razao_social : '',
            nome_fantasia: fieldValue ? fieldValue?.nome_fantasia : '',
            cnpj: fieldValue ? fieldValue?.cnpj : '',
            inscricao_estadual: fieldValue ? fieldValue?.inscricao_estadual : '',
            endereco_fiscal: fieldValue ? fieldValue?.endereco_fiscal : '',
            numero: fieldValue ? fieldValue?.numero : '',
            cep: fieldValue ? fieldValue?.cep : '',
            cidade: fieldValue ? fieldValue?.cidade : '',
            estado: fieldValue ? fieldValue?.estado : '',
            pais: fieldValue ? fieldValue?.pais : '',
            nome: fieldValue?.contato ? fieldValue?.contato[0]?.nome : '',
            telefone: fieldValue?.contato ? fieldValue?.contato[0]?.telefone : '',
            email: fieldValue?.contato ? fieldValue?.contato[0]?.email : ''
        },
        validationSchema,
        onSubmit: (values) => {
            if (values) {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Enviado com sucesso!',
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        close: false
                    })
                );
                navigate('/convites');
            }
        }
    });

    const handleChangeClient = (e: SelectChangeEvent) => {
        setData(e.target.value);
        setRow(e.target.value ? getRandomRow(invoices, random(1, 5)) : []);
    };

    useEffect(() => {
        setClient(detailCards);
    }, [detailCards]);

    useEffect(() => {
        dispatch(getInvoice());
        dispatch(getDetailCards());
    }, []);

    const handleChangeMethod = (event: SelectChangeEvent) => {
        setSelect(event.target.value);
    };

    const handleOnSelectValue = (value: Cliente) => {
        let id = Math.floor(Math.random() * 100000) as any;
        setFieldValue({ ...value, id });
    };

    return (
        <MainCard
            title="Convite - Faturamento"
            sx={{
                '& .MuiOutlinedInput-input': { borderRadius: 1.5 },
                '& .MuiCardContent-root': { p: 0 },
                '.MuiCardContent-root:last-child': { paddingBottom: '0px' }
            }}
            ref={componentRef}
        >
            <form onSubmit={formik.handleSubmit}>
                {/* add payment header */}
                <Box sx={{ p: 2.5, bgcolor: theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'primary.light' }}>
                    <Grid container spacing={gridSpacing}>
                        <InfoCliente {...{ formik, handleOnSelectValue }} />
                    </Grid>
                </Box>
                <Box sx={{ p: 2.5 }}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                label="ID do Recibo de Pagamento"
                                id="receiptID"
                                name="receiptID"
                                value={formik.values.receiptID}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.receiptID && Boolean(formik.errors.receiptID)}
                                helperText={formik.touched.receiptID && formik.errors.receiptID}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={8} sx={{ display: { xs: 'none', sm: 'flex' } }}></Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Método de Pagamento</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    label="Método de Pagamento"
                                    value={select}
                                    onChange={handleChangeMethod}
                                    placeholder="Selecione o Método de Pagamento"
                                >
                                    <MenuItem value="">Selecione o Método de Pagamento</MenuItem>
                                    <MenuItem value={1}>Dinheiro</MenuItem>
                                    <MenuItem value={2}>Cartão de Crédito</MenuItem>
                                    <MenuItem value={3}>Cartão de Débito</MenuItem>
                                    <MenuItem value={4}>PIX</MenuItem>
                                    <MenuItem value={4}>Boleto Bancário</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                sx={{ border: 'none' }}
                                label="Valor Recebido"
                                fullWidth
                                id="amount"
                                name="amount"
                                value={formik.values.amount}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.amount && Boolean(formik.errors.amount)}
                                helperText={formik.touched.amount && formik.errors.amount}
                                placeholder="Insira o Valor Recebido"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}></Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField fullWidth label="Referência" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                <DatePicker
                                    slotProps={{ textField: { fullWidth: true } }}
                                    label="Data do Pagamento"
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                    format="DD/MM/YYYY"
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </Box>
                <Divider />
                {/* add payment table */}
                <PaymentTable {...{ formik, row }} />
                <Divider />
                <Box sx={{ p: 2.5 }}>
                    <TextField fullWidth multiline rows={10} label="Adicione um comentário ou observação" />
                </Box>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="space-between">
                        <Stack justifyContent="flex-start">
                            <AnimateButton>
                                <ReactToPrint
                                    trigger={() => {
                                        if (formik.values.receiptID && formik.values.amount) {
                                            return (
                                                <Button
                                                    variant="contained"
                                                    startIcon={<CheckIcon />}
                                                    size="large"
                                                    sx={{
                                                        ml: 2,
                                                        textDecoration: 'none'
                                                    }}
                                                    type="submit"
                                                >
                                                    Salvar e Vizualizar Recibo
                                                </Button>
                                            );
                                        } else {
                                            return (
                                                <Button
                                                    variant="contained"
                                                    startIcon={<CheckIcon />}
                                                    size="large"
                                                    sx={{
                                                        ml: 2,
                                                        textDecoration: 'none'
                                                    }}
                                                    type="submit"
                                                    disabled
                                                >
                                                    Salvar e Vizualizar Recibo
                                                </Button>
                                            );
                                        }
                                    }}
                                    content={() => componentRef.current}
                                />
                            </AnimateButton>
                        </Stack>
                        <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                            <AnimateButton>
                                <Button variant="contained" size="large" type="submit">
                                    Salvar
                                </Button>
                            </AnimateButton>
                            <AnimateButton>
                                <Button variant="outlined" component={Link} to={'/convites'} size="large">
                                    Cancelar
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Stack>
                </CardActions>
            </form>
        </MainCard>
    );
};

export default ConviteFaturamento;
