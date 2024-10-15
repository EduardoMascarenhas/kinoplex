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
import { Cliente } from 'types/cliente';
import clientes from 'api/clientes.json';  // Importando o JSON local
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import InputAdornment from '@mui/material/InputAdornment';
import AdicionarCliente from '../Cliente/AdicionarCliente';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';

interface ClienteInfoProps {
    formik: any;
    handleOnSelectValue: (value: Cliente) => void;
}

const InfoCliente = ({ formik, handleOnSelectValue }: ClienteInfoProps) => {
    const [client, setClient] = useState<Cliente[]>([]);
    const [selectedContact, setSelectedContact] = useState<any | null>(null); // Para armazenar o contato selecionado
    const [open, setOpen] = useState<boolean>(false);
    const [indexContato, setIndexContato] = useState(0);

    const handleDialogToggler = () => {
        setOpen(!open);
    };

    const handleDialogContato = () => {
        setIndexContato(2)
        setOpen(!open);
    }

    // Simulando o carregamento de dados do JSON
    useEffect(() => {
        const fetchedClients = clientes.clientes as unknown as Cliente[]; // Assegurando que o tipo está correto
        setClient(fetchedClients);
    }, []);


    const theme = useTheme();
    const sxDivider = {
        borderColor: theme.palette.mode === 'dark' ? 'divider' : 'primary.light'
    };

    return (
        <>
            <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                    <InputLabel sx={{ color: 'grey.500', fontWeight: '400' }}>
                        Razão Social / Nome Fantasia:
                    </InputLabel>
                    <FormControl>
                        <Autocomplete
                            sx={{ width: '100%' }}
                            disableClearable
                            options={client}
                            getOptionLabel={(option) => option.razao_social || 'Nome não disponível'}
                            onChange={(event, value) => {
                                if (value) {
                                    handleOnSelectValue(value);
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Selecione o Cliente"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <>
                                                {params.InputProps.endAdornment}
                                                <InputAdornment position="end">
                                                    <Button
                                                        onClick={handleDialogToggler}
                                                        variant='outlined'
                                                        sx={{ ml: 1 }} // Espaçamento entre o input e o botão
                                                    >
                                                        <AddIcon fontSize="inherit" /> Novo cliente
                                                    </Button>
                                                </InputAdornment>
                                            </>
                                        ),
                                    }}
                                />
                            )}
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
                            <FormControl fullWidth>
                                <Stack display='flex' flexDirection='row' alignItems='flex-start'>
                                    <Typography variant="h4" mr={1}>Contato:</Typography>
                                    <Autocomplete
                                        size='small'
                                        sx={{
                                            marginTop: '-8px',
                                            marginRight: { md: '8px' }
                                        }}
                                        fullWidth
                                        options={client[0]?.contato || []}
                                        getOptionLabel={(option) => option.nome || 'Nome não disponível'}
                                        onChange={(event, value) => {
                                            if (value) {
                                                setSelectedContact(value);
                                                formik.setFieldValue('nome', value.nome); // Atualiza o valor no formik
                                                formik.setFieldValue('telefone', value.telefone); // Atualiza o telefone no formik
                                                formik.setFieldValue('email', value.email); // Atualiza o email no formik
                                            } else {
                                                setSelectedContact(null);
                                            }
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Selecione um Contato"
                                                InputProps={{
                                                    ...params.InputProps
                                                }}
                                            />
                                        )}
                                    />
                                    <Tooltip title="Novo contato">
                                        <Button
                                            onClick={handleDialogContato}
                                            color="primary"
                                            aria-label="add"
                                            variant="contained"
                                            sx={{
                                                marginTop: '-8px',
                                                height: 36
                                            }}
                                        >
                                            <AddIcon fontSize="small" />
                                        </Button>
                                    </Tooltip>
                                </Stack>
                            </FormControl>
                            <Stack spacing={0}>
                                {selectedContact && (
                                    <Stack direction="column" spacing={0}>
                                        <Typography variant="body2">
                                            <strong>Nome: </strong> {selectedContact.nome || 'Nome não disponível'}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Telefone: </strong>{selectedContact.telefone || 'Telefone não disponível'}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>E-mail: </strong>{selectedContact.email || 'E-mail não disponível'}
                                        </Typography>
                                    </Stack>
                                )}
                            </Stack>
                        </Stack>
                    </Grid>
                </>
            )}

            {indexContato === 2 ? (
                <Dialog open={open} onClose={handleDialogContato} sx={{ '& .MuiDialog-paper': { maxWidth: '100%', width: 980 } }}>
                    {open && <AdicionarCliente isOpen handleDialogContato={handleDialogContato} tabContato={indexContato} />}
                </Dialog>
            ) : (
                <Dialog open={open} onClose={handleDialogToggler} sx={{ '& .MuiDialog-paper': { maxWidth: '100%', width: 980 } }}>
                    {open && <AdicionarCliente isOpen handleDialogToggler={handleDialogToggler} />}
                </Dialog>
            )}

        </>
    );
};

export default InfoCliente;
