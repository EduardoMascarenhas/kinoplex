import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';
import { dispatch, useSelector } from 'store';
import { getDetailCards } from 'store/slices/user';

// types
import { UserProfile } from 'types/user-profile';
import Typography from '@mui/material/Typography';

interface ClientInfoProps {
    formik: any;
    handleOnSelectValue: (value: UserProfile) => void;
}

// ==============================|| CLIENT INFO ||============================== //

const ClientInfo = ({ formik, handleOnSelectValue }: ClientInfoProps) => {
    const [data, setData] = useState<string>('');
    const [client, setClient] = useState<UserProfile[]>([]);

    const { detailCards } = useSelector((state) => state.user);

    const handleSelectClient = (e: SelectChangeEvent) => {
        setData(e.target.value);
    };

    useEffect(() => {
        setClient(detailCards);
    }, [detailCards]);

    useEffect(() => {
        dispatch(getDetailCards());
    }, []);

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4" sx={{ mb: '-5px' }}>
                    Empresa e Tipo de Convite
                </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
                <Stack>
                    <InputLabel id="demo-simple-select-label">Escolha o Cliente por Razão Social / Nome Fantasia:</InputLabel>
                    <Select
                        defaultValue=""
                        sx={{ '& .MuiSelect-icon': { right: 0 } }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Escolha o Cliente por Razão Social / Nome Fantasia:"
                        onChange={handleSelectClient}
                        value={data}
                    >
                        <MenuItem value="">Escolha o Cliente por Razão Social / Nome Fantasia:</MenuItem>
                        {client.map((item, index) => (
                            <MenuItem value={index} onClick={() => handleOnSelectValue(item)} key={index}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
                <Stack>
                    <InputLabel id="demo-simple-select-label">Escolha a Empresa do Grupo:</InputLabel>
                    <Select
                        defaultValue=""
                        sx={{ '& .MuiSelect-icon': { right: 0 } }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Escolha a Empresa do Grupo:"
                        onChange={handleSelectClient}
                        value={data}
                    >
                        <MenuItem value="">Escolha a Empresa do Grupo:</MenuItem>
                        {client.map((item, index) => (
                            <MenuItem value={index} onClick={() => handleOnSelectValue(item)} key={index}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
                <Stack>
                    <InputLabel id="demo-simple-select-label">Tipo de Convite:</InputLabel>
                    <Select
                        defaultValue=""
                        sx={{ '& .MuiSelect-icon': { right: 0 } }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Tipo de Convite:"
                        onChange={handleSelectClient}
                        value={data}
                    >
                        <MenuItem value="">Tipo de Convite:</MenuItem>
                        {client.map((item, index) => (
                            <MenuItem value={index} onClick={() => handleOnSelectValue(item)} key={index}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Stack>
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h4" sx={{ mb: '-5px' }}>
                    Dados do Cliente e Contato
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Stack>
                    <InputLabel required>Razão Social:</InputLabel>
                    <TextField
                        fullWidth
                        id="customerName"
                        name="customerName"
                        value={formik.values.customerName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.customerName && Boolean(formik.errors.customerName)}
                        helperText={formik.touched.customerName && formik.errors.customerName}
                        placeholder="Alex Z."
                    />
                </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
                <Stack>
                    <InputLabel required>Contato:</InputLabel>
                    <TextField
                        type="text"
                        fullWidth
                        id="customerName"
                        name="customerName"
                        value={formik.values.customerName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.customerName && Boolean(formik.errors.customerName)}
                        helperText={formik.touched.customerName && formik.errors.customerName}
                        placeholder="Nome do Contato"
                    />
                </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
                <Stack>
                    <InputLabel required>Email:</InputLabel>
                    <TextField
                        type="email"
                        fullWidth
                        id="customerEmail"
                        name="customerEmail"
                        value={formik.values.customerEmail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.customerEmail && Boolean(formik.errors.customerEmail)}
                        helperText={formik.touched.customerEmail && formik.errors.customerEmail}
                        placeholder="alex@company.com"
                    />
                </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
                <Stack>
                    <InputLabel required>Confirmação do Email:</InputLabel>
                    <TextField
                        type="email"
                        fullWidth
                        id="customerEmail"
                        name="customerEmail"
                        value={formik.values.customerEmail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.customerEmail && Boolean(formik.errors.customerEmail)}
                        helperText={formik.touched.customerEmail && formik.errors.customerEmail}
                        placeholder="alex@company.com"
                    />
                </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
                <Stack>
                    <InputLabel required>Telefone:</InputLabel>
                    
                    <TextField
                        type="tel"
                        fullWidth
                        id="customerPhone"
                        name="customerPhone"
                        value={formik.values.customerPhone}
                        onBlur={formik.handleBlur}
                        error={formik.touched.customerPhone && Boolean(formik.errors.customerPhone)}
                        helperText={formik.touched.customerPhone && formik.errors.customerPhone}
                        onChange={formik.handleChange}
                        placeholder="+ 00 00000-0000"
                    />
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack>
                    <InputLabel required>Cargo:</InputLabel>
                    <TextField
                        fullWidth
                        id="customerAddress"
                        name="customerAddress"
                        value={formik.values.customerAddress}
                        onBlur={formik.handleBlur}
                        error={formik.touched.customerAddress && Boolean(formik.errors.customerAddress)}
                        helperText={formik.touched.customerAddress && formik.errors.customerAddress}
                        onChange={formik.handleChange}
                        multiline
                        placeholder="Insira o cargo"
                    />
                </Stack>
            </Grid>

            {/* <Grid item xs={12} md={6}>
                <Stack>
                    <InputLabel required>Invoice Date</InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            format="dd/MM/yyyy"
                            slotProps={{ textField: { fullWidth: true } }}
                            value={valueBasic}
                            onChange={(newValue: Date | null) => {
                                setValueBasic(newValue);
                            }}
                        />
                    </LocalizationProvider>
                </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
                <Stack>
                    <InputLabel required>Status</InputLabel>
                    <Select
                        id="orderStatus"
                        name="orderStatus"
                        defaultValue={formik.values.orderStatus}
                        value={formik.values.orderStatus}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="refund">Refund</MenuItem>
                        <MenuItem value="paid">Paid</MenuItem>
                    </Select>
                    {formik.errors.orderStatus && <FormHelperText error>{formik.errors.orderStatus}</FormHelperText>}
                </Stack>
            </Grid> */}
        </>
    );
};

export default ClientInfo;
