import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// assets
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { ContatoCliente } from 'types/cliente';

interface ProductDataProps {
    contatoData: ContatoCliente[]; // Usando o tipo correto
    deleteContatoHandler: (id: number) => void; // Ajustando o tipo do parâmetro
}

function ListarContato({ contatoData, deleteContatoHandler }: ProductDataProps) {
    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Nome</TableCell>
                        <TableCell align="left">Telefone</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Cargo</TableCell>
                        <TableCell align="right">Ações</TableCell> {/* Adicionando coluna para ações */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="left">Aderbaldo da Silva</TableCell>
                        <TableCell align="left">(11) 95870-6688</TableCell>
                        <TableCell align="left">texto@exemplo.com</TableCell>
                        <TableCell align="left">Diretor de Marketing</TableCell>
                        <TableCell sx={{ pr: 1 }} align="right">
                            <IconButton
                                color="error"
                                size="small"
                                onClick={() => deleteContatoHandler(10!)}
                                aria-label="Delete"
                            >
                                <DeleteTwoToneIcon fontSize="small" />
                            </IconButton>
                        </TableCell>
                    </TableRow>

                    {contatoData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell align="left">{row.nome}</TableCell> {/* Usando nome */}
                            <TableCell align="left">{row.telefone}</TableCell> {/* Usando telefone */}
                            <TableCell align="left">{row.email}</TableCell> {/* Usando email */}
                            <TableCell align="left">{row.cargo}</TableCell> {/* Usando email */}
                            <TableCell sx={{ pr: 1 }} align="right">
                                <IconButton
                                    color="error"
                                    size="small"
                                    onClick={() => deleteContatoHandler(row.id!)}
                                    aria-label="Delete"
                                >
                                    <DeleteTwoToneIcon fontSize="small" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ListarContato;
