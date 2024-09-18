import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import { PerfilCliente } from 'types/perfil-cliente';
import clientes from 'api/clientes.json';  // Importando o JSON local

interface ClientInfoProps {
    formik: any;
    handleOnSelectValue: (value: PerfilCliente) => void;
}

const ClientInfo = ({ formik, handleOnSelectValue }: ClientInfoProps) => {
    const [client, setClient] = useState<PerfilCliente[]>([]);
    
    // Simulando o carregamento de dados do JSON
    useEffect(() => {
        setClient(clientes.clientes); // 'clientes.clientes' refere-se ao array dentro do JSON
    }, []);

    const theme = useTheme();
    const sxDivider = {
        borderColor: theme.palette.mode === 'dark' ? 'divider' : 'primary.light'
    };

    return (
        <>
            <Grid item xs={12} md={3}>
                <Stack spacing={1}>
                    <InputLabel sx={{ color: 'grey.500', fontWeight: '400' }}>
                        Razão Social / Nome Fantasia:
                    </InputLabel>
                    <FormControl>
                        <Autocomplete
                            disableClearable
                            options={client}
                            getOptionLabel={(option) => option.razao_social || 'Nome não disponível'}
                            onChange={(event, value) => handleOnSelectValue(value)}
                            renderInput={(params) => <em><TextField {...params} label="Selecione o Cliente" /></em>}
                        />
                    </FormControl>
                </Stack>
            </Grid>

            {formik.values.razao_social && (
                <>
                    <Grid item xs={12}>
                        <Divider sx={sxDivider} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Stack spacing={1}>
                            <Typography variant="h4">Dados da empresa</Typography>
                            <Stack spacing={0}>
                                <Stack direction="column" spacing={0}>
                                    <Typography variant="body2">
                                        <strong>Razão Social: </strong>{formik.values.razao_social || 'Razão Social não disponível'}
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>Nome Fantasia: </strong>{formik.values.nome_fantasia || 'Nome Fantasia não disponível'}
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>CNPJ: </strong>{formik.values.cnpj || 'CNPJ não disponível'}
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>Inscrição Estadual: </strong>{formik.values.inscricao_estadual || 'Inscrição Estadual não disponível'}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Stack spacing={1}>
                            <Typography variant="h4">Endereço</Typography>
                            <Stack spacing={0}>
                                <Stack direction="column" spacing={0}>
                                    <Typography variant="body2">
                                    <strong>Endereco Fiscal: </strong>{formik.values.endereco_fiscal || 'Endereco Fiscal não disponível'}, {formik.values.numero || 'Número não disponível'}
                                    </Typography>
                                    <Typography variant="body2">
                                    <strong>CEP: </strong>{formik.values.cep || 'CEP não disponível'}
                                    </Typography>
                                    <Typography variant="body2">
                                    <strong>Cidade: </strong>{formik.values.cidade || 'Cidade não disponível'} - {formik.values.estado || 'Estado não disponível'}
                                    </Typography>
                                    <Typography variant="body2">
                                    <strong>País: </strong>{formik.values.pais || 'País não disponível'}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Stack spacing={1}>
                            <Typography variant="h4">Dados de Contato:</Typography>
                            <Stack spacing={0}>
                                <Stack direction="column" spacing={0}>
                                    <Typography variant="body2">
                                    <strong>Nome: </strong> {formik.values.nome || 'Nome não disponível'}
                                    </Typography>
                                    <Typography variant="body2">
                                    <strong>Telefone: </strong>{formik.values.telefone || 'Telefone não disponível'}
                                    </Typography>
                                    <Typography variant="body2">
                                    <strong>E-mail: </strong>{formik.values.email || 'E-mail não disponível'}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>
                </>
            )}
        </>
    );
};

export default ClientInfo;
