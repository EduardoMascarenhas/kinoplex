import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

// third-party
import * as yup from 'yup';
import { useFormik } from 'formik';

// project imports
import ClientInfo from './ClientInfo';
import AmountCard from './AmountCard';
import SelectItem from './SelectItem';
import InputLabel from 'ui-component/extended/Form/InputLabel';

import { useDispatch } from 'store';
import { gridSpacing } from 'store/constant';
import { openSnackbar } from 'store/slices/snackbar';

// types
import { UserProfile } from 'types/user-profile';
import { AddInvoice, InvoiceAmount, InvoiceItems } from 'types/invoice';
import MainCardInvitations from 'ui-component/cards/MainCardInvitations';

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

    const [allAmounts, setAllAmounts] = useState<InvoiceAmount>({
        subTotal: 0,
        appliedTaxValue: 0.1,
        appliedDiscountValue: 0.05,
        taxesAmount: 0,
        discountAmount: 0,
        totalAmount: 0
    });
    const [productsData, setProductsData] = useState<InvoiceItems[]>([]);
    const [addItemClicked, setAddItemClicked] = useState<boolean>(true);
    const [fieldValue, setFieldValue] = useState<UserProfile>();

    // to delete row in order details
    const deleteProductHandler = (id: number) => {
        setProductsData(productsData.filter((item) => item.id !== id));
    };

    const handleOnSelectValue = (value: UserProfile) => {
        let id = Math.floor(Math.random() * 100000) as any;
        setFieldValue({ ...value, id });
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            invoiceNumber: fieldValue ? fieldValue?.id : '#58963',
            customerName: fieldValue ? fieldValue?.name : '',
            customerEmail: fieldValue ? fieldValue?.email : '',
            customerPhone: fieldValue ? fieldValue?.contact : '',
            customerAddress: fieldValue ? fieldValue?.location : '',
            orderStatus: 'pending'
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
            appliedTaxValue: 0.1,
            appliedDiscountValue: 0.05,
            taxesAmount: 0,
            discountAmount: 0,
            totalAmount: 0
        };
        productsData.forEach((item) => {
            amounts.subTotal += item.total as number;
        });
        amounts.taxesAmount = amounts.subTotal * amounts.appliedTaxValue;
        amounts.discountAmount = (amounts.subTotal + amounts.taxesAmount) * amounts.appliedDiscountValue;
        amounts.totalAmount = amounts.subTotal + amounts.taxesAmount - amounts.discountAmount;
        setAllAmounts(amounts);
    }, [productsData]);

    // add item handler
    const handleAddItem = (addingData: AddInvoice) => {
        setProductsData([
            ...productsData,
            {
                id: addingData.id,
                product: addingData.name,
                description: addingData.description,
                quantity: addingData.selectedQuantity,
                amount: addingData.offerPrice,
                total: addingData.totalAmount
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

                    {addItemClicked ? (
                        <Grid item xs={12}>
                            {/* select item page */}
                            <SelectItem {...{ handleAddItem, setAddItemClicked }} />
                        </Grid>
                    ) : (
                        <Grid item xs={12}>
                            <Button variant="text" onClick={() => setAddItemClicked(true)}>
                                + Adicionar Convite
                            </Button>
                        </Grid>
                    )}

                    {/* total card */}
                    <Grid item xs={12}>
                        <AmountCard {...{ allAmounts }} />
                    </Grid>

                    <Grid item xs={12}>
                        <Stack>
                            <InputLabel required>Terms and Condition:</InputLabel>
                            <TextField
                                fullWidth
                                id="customerAddress"
                                name="customerAddress"
                                defaultValue="I acknowledge terms and conditions."
                                multiline
                                placeholder="Enter Address"
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" type="submit">
                            Add Invoice
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </MainCardInvitations>
    );
}

export default CreateOpportunities;
