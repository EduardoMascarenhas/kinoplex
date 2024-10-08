// material-ui
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// ==============================|| ADDRESS ||============================== //

const Endereco = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
                <FormControl fullWidth>
                    <Typography variant="subtitle1">Endereço:</Typography>
                    <TextField fullWidth label="Endereço" />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                    <Typography variant="subtitle1">Número:</Typography>
                    <TextField fullWidth label="Número" />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
                <FormControl fullWidth>
                    <Typography variant="subtitle1">Complemento:</Typography>
                    <TextField fullWidth label="Complemento" />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                    <Typography variant="subtitle1">CEP:</Typography>
                    <TextField fullWidth label="CEP" />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <Typography variant="subtitle1">Bairro:</Typography>
                    <TextField fullWidth label="Bairro" />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <Typography variant="subtitle1">Cidade:</Typography>
                    <TextField fullWidth label="Cidade" />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <Typography variant="subtitle1">Estado:</Typography>
                    <TextField fullWidth label="Estado" />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <Typography variant="subtitle1">País:</Typography>
                    <TextField fullWidth label="País" />
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default Endereco;
