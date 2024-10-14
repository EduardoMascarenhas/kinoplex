// material-ui
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// ==============================|| PERSONAL INFORMATION ||============================== //

const DadosCliente = () => (
    <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <Typography variant="subtitle1">Razão Social:</Typography>
                <TextField fullWidth placeholder="Razão Social" />
            </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <Typography variant="subtitle1">Nome Fantasia:</Typography>
                <TextField fullWidth placeholder="Nome Fantasia" />
            </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <Typography variant="subtitle1">CNPJ / CPF:</Typography>
                <TextField fullWidth placeholder="CNPJ / CPF" />
            </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <Typography variant="subtitle1">Inscrição Estadual:</Typography>
                <TextField fullWidth placeholder="Inscrição Estadual" />
            </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <Typography variant="subtitle1">Inscrição Municipal:</Typography>
                <TextField fullWidth placeholder="Inscrição Municipal" />
            </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <Typography variant="subtitle1">Ramo de Atividade:</Typography>
                <TextField fullWidth placeholder="Ramo de Atividade" />
            </FormControl>
        </Grid>
    </Grid>
);

export default DadosCliente;
