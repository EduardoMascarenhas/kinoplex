import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import ListarContato from './ListarContato';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { ContatoCliente } from 'types/cliente';

// ==============================|| CONTACT DETAIL ||============================== //
interface Props {
    handleAddItem: (item: ContatoCliente) => void;
}

function Contato({ handleAddItem }: Props) {
    const [contatos, setContatos] = useState<ContatoCliente[]>([]);
    const [nome, setNome] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [cargo, setCargo] = useState<string>('');

    const deleteContatoHandler = (id: number) => {
        setContatos(contatos.filter((item) => item.id !== id));
    };

    const handleOnAddItem = () => {
        if (nome && telefone && email) {
            const newContato: ContatoCliente = {
                nome,
                telefone,
                email,
                cargo,
            };

            setContatos([...contatos, newContato]);
            handleAddItem(newContato);

            // Resetar os campos após adicionar o contato
            setNome('');
            setTelefone('');
            setEmail('');
            setCargo('');
        }
    };

    return (
        <Grid container spacing={2}>
             {contatos.length >= 0 && (
                <Grid item xs={12}>
                    <ListarContato
                        contatoData={contatos}
                        deleteContatoHandler={deleteContatoHandler}
                    />
                </Grid>
            )}
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <Typography variant="subtitle1">Nome:</Typography>
                    <TextField
                        fullWidth
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <Typography variant="subtitle1">Telefone:</Typography>
                    <TextField
                        fullWidth
                        placeholder="(99) 99999-9999"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <Typography variant="subtitle1">Email:</Typography>
                    <TextField
                        fullWidth
                        placeholder="email@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <Typography variant="subtitle1">Cargo:</Typography>
                    <TextField
                        fullWidth
                        placeholder="Diretor de Marketing"
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                    />
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <Stack direction="row" sx={{ marginTop: '15px' }}>
                    <Button
                        disabled={!nome || !telefone || !email}
                        variant="outlined"
                        onClick={handleOnAddItem}
                        startIcon={<AddIcon />}
                    >
                        + Novo contato
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default Contato;
