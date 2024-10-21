import { useState, FC, ChangeEvent, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

// types
import { ArrangementOrder } from 'types';
import CabecalhoTabelaOportunidades from './CabecalhoTabelaOportunidades';
import { Oportunidade } from 'types/oportunidade';

interface TextoLimitadoProps {
    texto: string;
    limite: number;
}

export const TextoLimitado: FC<TextoLimitadoProps> = ({ texto, limite }) => {
    const textoLimitado = texto.length > limite ? `${texto.substring(0, limite)}...` : texto;

    return <Typography variant="body1">{textoLimitado}</Typography>;
};

// Função para obter o texto do tipo de convite
const getTipoConvite = (tipo: string | { convite: string[] }) => {
    if (typeof tipo === 'string') {
        return tipo;
    } else if (tipo.convite) {
        return tipo.convite.join(', ');
    }
    return 'N/A';
};

// ==============================|| INVOICE LIST - TABLE ||============================== //

const TabelaOportunidades = ({ rows }: { rows: Oportunidade[] }) => {
    const [order, setOrder] = useState<ArrangementOrder>('asc');
    const [orderBy, setOrderBy] = useState<string>('cliente');
    const [selected, setSelected] = useState<string[]>([]);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    const handleRequestSort = (event: SyntheticEvent<Element, Event>, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelectedId = rows.map((n) => n.cliente?.razao_social);
            setSelected(newSelectedId as []);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        event?.target.value && setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <MainCard content={false}>
            {/* table */}
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    <CabecalhoTabelaOportunidades
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        selected={selected}
                    />
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            const isItemSelected = isSelected(row.cliente.razao_social as string);
                            const tipoConvite = getTipoConvite(row.tipo);
                            const quantidadeImpresso = row.quantidade?.impresso || 0;
                            const quantidadeEletronico = row.quantidade?.eletronico || 0;

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.id} // Usar id único da Oportunidade
                                    selected={isItemSelected}
                                >
                                    <TableCell>{row.data_criacao}</TableCell>
                                    <TableCell>
                                        <Stack>
                                            <Tooltip title={row.cliente?.razao_social}>
                                                <span>
                                                    <Typography variant="body1">
                                                        {row.cliente?.razao_social && row.cliente?.razao_social.length > 50
                                                            ? `${row.cliente?.razao_social.substring(0, 50)}...`
                                                            : row.cliente.razao_social}
                                                        {row.cliente?.razao_social && row.cliente?.razao_social.length > 50
                                                            ? `${row.cliente?.razao_social.substring(0, 50)}...`
                                                            : row.cliente.razao_social}
                                                    </Typography>
                                                </span>
                                            </Tooltip>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>{tipoConvite}</TableCell>
                                    <TableCell>
                                        <Stack direction="row" alignItems="center" spacing={1} justifyContent="left">
                                            {tipoConvite !== 'Evento' ? (
                                                <Tooltip
                                                    title={
                                                        quantidadeImpresso && quantidadeEletronico
                                                            ? `Impressos: ${quantidadeImpresso}, Eletrônicos: ${quantidadeEletronico}`
                                                            : quantidadeImpresso
                                                              ? `Impressos: ${quantidadeImpresso}`
                                                              : `Eletrônicos: ${quantidadeEletronico}`
                                                    }
                                                >
                                                    <Typography variant="body1">{quantidadeImpresso + quantidadeEletronico}</Typography>
                                                </Tooltip>
                                            ) : (
                                                <Typography variant="body1">#</Typography>
                                            )}
                                        </Stack>
                                    </TableCell>
                                    <TableCell>R$ {row.preco_total}</TableCell>
                                    <TableCell sx={{ pr: 3 }}>
                                        <Stack direction="row" alignItems="center" spacing={1} justifyContent="right">
                                            <Tooltip title="Ver Detalhes">
                                                <IconButton
                                                    color="primary"
                                                    component={Link}
                                                    to={`/oportunidade/detalhe/${row.id}`}
                                                    size="small"
                                                    aria-label="Ver Detalhes"
                                                >
                                                    <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow sx={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={10} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* table pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
};

export default TabelaOportunidades;
