import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

// third-party
import * as yup from 'yup';
import { useFormik } from 'formik';

// project imports
import InfoCliente from './InfoCliente';
import ListaItemEletronico from './ListaItemEletronico';
import ValorTotal from './ValorTotal';
import SelectItem from './SelectItem';
import MainCardInvitations from 'ui-component/cards/MainCardInvitations';

import { useDispatch } from 'store';
import { gridSpacing } from 'store/constant';
import { openSnackbar } from 'store/slices/snackbar';

// types
import { AddConvite, ConviteItems, ConviteQuantia } from 'types/convite';
import { PerfilCliente } from 'types/perfil-cliente';
import Stack from '@mui/material/Stack';
import ListaItemImpresso from './ListaItemImpresso';
import SelectItemEletronico from './SelectItemEletronico';
import SelectItemImpresso from './SelectItemImpresso';

// yup validation-schema
const validationSchema = yup.object({
    invoiceNumber: yup.string().required('Invoice Number is Required'),
    customerName: yup.string().required('A Razão Social é obrigatória!'),
    customerEmail: yup.string().email('Digite um E-mail válido!').required('O E-mail do cliente é obrigatório!'),
    customerPhone: yup.string().min(14, 'Digite um Telefone válido!').required('O Telefone do cliente é obrigatório!'),
    customerEndereco: yup.string().required('O Cargo é obrigatório!'),
    orderStatus: yup.string().required('Order Status is required')
});

// ==============================|| CREATE INVOICE ||============================== //

function Oportunidades() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [allAmounts, setAllAmounts] = useState<ConviteQuantia>({
        subTotal: 0,
        valorTaxaAplicada: 0,
        valorDescontoAplicado: 0,
        quantiaImpostos: 0,
        valorDesconto: 0,
        quantiaTotal: 0
    });
    const [convitesEletronicos, setConvitesEletronicos] = useState<ConviteItems[]>([]);
    const [convitesImpressos, setConvitesImpressos] = useState<ConviteItems[]>([]);
    const [addItemClicked, setAddItemClicked] = useState<boolean>(true);
    const [fieldValue, setFieldValue] = useState<PerfilCliente>();

    // to delete row in order details
    const deleteConviteHandler = (id: number, tipo: 'eletronico' | 'impresso') => {
        if (tipo === 'eletronico') {
            setConvitesEletronicos(convitesEletronicos.filter((item) => item.id !== id));
        } else {
            setConvitesImpressos(convitesImpressos.filter((item) => item.id !== id));
        }
    };

    const handleOnSelectValue = (value: PerfilCliente) => {
        let id = Math.floor(Math.random() * 100000) as any;
        setFieldValue({ ...value, id });
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: fieldValue ? fieldValue?.id : '',
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
            nome: fieldValue ? fieldValue?.contato?.nome : '',
            telefone: fieldValue ? fieldValue?.contato?.telefone : '',
            email: fieldValue ? fieldValue?.contato?.email : '',
        },

        validationSchema,
        onSubmit: (values) => {
            if (values) {
                navigate('/apps/invoice/invoice-list');
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Submit Success',
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        close: false
                    })
                );
            }
        }
    });

    useEffect(() => {
        const amounts = {
            subTotal: 0,
            valorTaxaAplicada: 0,
            valorDescontoAplicado: 0,
            quantiaImpostos: 0,
            valorDesconto: 0,
            quantiaTotal: 0
        };
        convitesEletronicos.forEach((item) => {
            amounts.subTotal += item.total as number;
        });
        convitesImpressos.forEach((item) => {
            amounts.subTotal += item.total as number;
        });
        amounts.quantiaImpostos = amounts.subTotal * amounts.valorTaxaAplicada;
        amounts.valorDesconto = (amounts.subTotal + amounts.quantiaImpostos) * amounts.valorDescontoAplicado;
        amounts.quantiaTotal = amounts.subTotal + amounts.quantiaImpostos - amounts.valorDesconto;
        setAllAmounts(amounts);
    }, [convitesEletronicos, convitesImpressos]);

    // add item handler

    const handleAddItem = (addingData: AddConvite) => {
        if (addingData.tipo === 'eletronico') {
            setConvitesEletronicos((prev) => [
                ...prev,
                {
                    id: addingData.id,
                    descricao: addingData.descricao,
                    quantidade: addingData.quantidade,
                    preco_unitario: addingData.preco_unitario,
                    lote: addingData.lote,
                    numeracao: addingData.numeracao,
                    serie: addingData.serie,
                    disponibilidade: addingData.disponibilidade,
                    total: addingData.quantiaTotal
                }
            ]);
        } else if (addingData.tipo === 'impresso') {
            setConvitesImpressos((prev) => [
                ...prev,
                {
                    id: addingData.id,
                    descricao: addingData.descricao,
                    quantidade: addingData.quantidade,
                    preco_unitario: addingData.preco_unitario,
                    lote: addingData.lote,
                    numeracao: addingData.numeracao,
                    serie: addingData.serie,
                    disponibilidade: addingData.disponibilidade,
                    total: addingData.quantiaTotal
                }
            ]);
        }
        setAddItemClicked(false);
    };

    return (
        <MainCardInvitations title="Oportunidade">
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={gridSpacing}>
                    {/* client info */}
                    <InfoCliente {...{ formik, handleOnSelectValue }} />

                    {/* item list page */}
                    {convitesEletronicos.length >= 0 && (
                        <Grid item xs={12}>
                            <ListaItemEletronico convitesData={convitesEletronicos} deleteConviteHandler={(id) => deleteConviteHandler(id, 'eletronico')} />
                            <SelectItemEletronico handleAddItem={handleAddItem} setAddItemClicked={setAddItemClicked} />
                        </Grid>
                    )}

                    {convitesImpressos.length >= 0 && (
                        <Grid item xs={12}>
                            <ListaItemImpresso convitesData={convitesImpressos} deleteConviteHandler={(id) => deleteConviteHandler(id, 'impresso')} />
                            <SelectItemImpresso handleAddItem={handleAddItem} setAddItemClicked={setAddItemClicked} />
                        </Grid>
                    )}

                    {/* total card */}
                    <Grid item xs={12}>
                        <ValorTotal {...{ allAmounts }} />
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Stack direction="row" spacing={1}>
                            <Button variant="contained" type="submit" size="small">
                                Gravar
                            </Button>
                            <Button variant="outlined" type="submit" size="small">
                                Enviar para faturamento
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </MainCardInvitations>
    );
}

export default Oportunidades;
