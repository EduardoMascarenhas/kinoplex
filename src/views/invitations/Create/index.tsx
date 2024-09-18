import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

// third-party
import * as yup from 'yup';
import { useFormik } from 'formik';

// project imports
import ClientInfo from './ClientInfo';
import ItemListEletronico from './ItemListEletronico';
import AmountCard from './AmountCard';
import SelectItem from './SelectItem';
import MainCardInvitations from 'ui-component/cards/MainCardInvitations';

import { useDispatch } from 'store';
import { gridSpacing } from 'store/constant';
import { openSnackbar } from 'store/slices/snackbar';

// types
import { AddConvite, ConviteItems, ConviteQuantia } from 'types/convite';
import { PerfilCliente } from 'types/perfil-cliente';
import Stack from '@mui/material/Stack';
import ItemListImpresso from './ItemListImpresso';

// yup validation-schema
const validationSchema = yup.object({
    invoiceNumber: yup.string().required('Invoice Number is Required'),
    customerName: yup.string().required('A Razão Social é obrigatória!'),
    customerEmail: yup.string().email('Digite um E-mail válido!').required('O E-mail do cliente é obrigatório!'),
    customerPhone: yup.string().min(14, 'Digite um Telefone válido!').required('O Telefone do cliente é obrigatório!'),
    customerAddress: yup.string().required('O Cargo é obrigatório!'),
    orderStatus: yup.string().required('Order Status is required')
});

// ==============================|| CREATE INVOICE ||============================== //

function CreateOpportunities() {
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
    const [convitesData, setConvitesData] = useState<ConviteItems[]>([]);
    const [addItemClicked, setAddItemClicked] = useState<boolean>(true);
    const [fieldValue, setFieldValue] = useState<PerfilCliente>();
    const [tipoConvite, setTipoConvite] = useState<'eletronico' | 'impresso'>('eletronico');

    // to delete row in order details
    const deleteConviteHandler = (id: number) => {
        setConvitesData(convitesData.filter((item) => item.id !== id));
    };

    // Função para lidar com a mudança do tipo de convite
    const handleTipoConviteChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTipoConvite(event.target.value as 'eletronico' | 'impresso');
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
        convitesData.forEach((item) => {
            amounts.subTotal += item.total as number;
        });
        amounts.quantiaImpostos = amounts.subTotal * amounts.valorTaxaAplicada;
        amounts.valorDesconto = (amounts.subTotal + amounts.quantiaImpostos) * amounts.valorDescontoAplicado;
        amounts.quantiaTotal = amounts.subTotal + amounts.quantiaImpostos - amounts.valorDesconto;
        setAllAmounts(amounts);
    }, [convitesData]);

    // add item handler
    const handleAddItem = (addingData: AddConvite) => {
        setConvitesData([
            ...convitesData,
            {
                id: addingData.id,
                descricao: addingData.descricao,
                quantidade: addingData.quantidade,
                preco_unitario: addingData.preco_unitario,
                lote: addingData.lote,
                numeracao: addingData.numeracao,
                serie: addingData.serie,
                disponibilidade: addingData.disponibilidade,
                tipo: addingData.tipo,
                total: addingData.quantiaTotal
            }
        ]);

        setAddItemClicked(false);
    };

    return (
        <MainCardInvitations title="Nova oportunidade">
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={gridSpacing}>
                    {/* client info */}
                    <ClientInfo {...{ formik, handleOnSelectValue }} />

                    {/* item list page */}

                   
                        {convitesData[0]?.tipo === 'eletronico' ? (
                            <Grid item xs={12}>
                                {convitesData.length > 0 && (
                                    <ItemListEletronico {...{ convitesData, deleteConviteHandler, handleTipoConviteChange }} />
                                )}
                            </Grid>
                        ) : (
                            convitesData[0]?.tipo === 'impresso' && (
                                <Grid item xs={12}>
                                    {convitesData.length > 0 && (
                                        <ItemListImpresso {...{ convitesData, deleteConviteHandler, handleTipoConviteChange }} />
                                    )}
                                </Grid>
                            )
                        )}
                   
                    {addItemClicked ? (
                        <Grid item xs={12}>
                            {/* select item page */}
                            <SelectItem {...{ handleAddItem, setAddItemClicked }} />
                        </Grid>
                    ) : (
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="outlined" color="secondary" onClick={() => setAddItemClicked(true)}>
                                + Adicionar Convite
                            </Button>
                        </Grid>
                    )}

                    {/* total card */}
                    <Grid item xs={12}>
                        <AmountCard {...{ allAmounts }} />
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Stack direction="row" spacing={1}>
                            <Button variant="contained" type="submit" size="small">
                                Gravar
                            </Button>
                            <Button variant="contained" type="submit" size="small">
                                Enviar para faturamento
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </MainCardInvitations>
    );
}

export default CreateOpportunities;
