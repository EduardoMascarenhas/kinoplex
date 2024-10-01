import React, { useState, useEffect } from 'react';
// material-ui
import { Grid, TextField, FormControlLabel, Checkbox, Box, Select, MenuItem, FormControl, InputLabel, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br'; // Importando o idioma pt-BR
import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export interface AllDataType {
    printName?: string;
    qtdMaxPreApproved?: number;
    rescueChannels?: string;
    city: string;
    roomTypes: [string];
    movie: string;
    onlyFor: string;
    fromWeekdayH: number;
    toWeekdayH: number;
    fromWeekendH: number;
    toWeekendH: number;
    fromWeekdayM: number;
    toWeekdayM: number;
    fromWeekendM: number;
    toWeekendM: number;
    allowMovie3D: boolean;
    allowVipRoom: boolean;
    validFrom: Dayjs;
    validTo: Dayjs;
    days: [string];
}
const canais = ['Bilheteria', 'ATM', 'Site'];
const rTypes = ['Convencional', 'IMAX', 'KinoEvolution', 'Platinum', 'Streaming', 'Diamante'];
const allDays = ['Segunta', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo', 'Feriados'];
const onlyFor = [
    { id: 'FILME_CIRCIUTO_NACIONAL', name: 'Filme Circuito Nacional' },
    { id: 'OPERA', name: 'Ópera' },
    { id: 'BALE', name: 'Balé' },
    { id: 'EVENTOS_ESPORTIVOS', name: 'Eventos Esportivos' },
    { id: 'SHOW', name: 'Show' },
    { id: 'FESTIVAL', name: 'Festival' }
];

const allCinemas = [
    { id: 34, name: 'CineCarioca Meier' },
    { id: 39, name: 'Kinoplex Osasco' },
    { id: 41, name: 'Kinoplex Avenida' },
    { id: 44, name: 'Kinoplex Via Parque' },
    { id: 46, name: 'Kinoplex Uberaba' },
    { id: 48, name: 'Kinoplex Nova Iguaçu' },
    { id: 50, name: 'Kinoplex Golden' },
    { id: 52, name: 'Kinoplex Leblon Globoplay' },
    { id: 2, name: 'Kinoplex Bay Market' },
    { id: 4, name: 'Kinoplex TopShopping 1 a 3' },
    { id: 6, name: 'Cinema Leblon' },
    { id: 8, name: 'Kinoplex Patio Brasil' },
    { id: 10, name: 'Roxy' },
    { id: 12, name: 'Kinoplex Terraço Shopping' },
    { id: 14, name: 'Kinoplex Praia da Costa-SRES' },
    { id: 16, name: 'Kinoplex Sao Luiz' },
    { id: 18, name: 'Kinoplex Itaim' },
    { id: 25, name: 'Kinoplex Fashion Mall' },
    { id: 27, name: 'Kinoplex West Shopping' },
    { id: 29, name: 'Kinoplex Grande Rio' },
    { id: 31, name: 'Kinoplex Maceio' },
    { id: 38, name: 'Kinoplex Madureira' },
    { id: 40, name: 'Kinoplex Amazonas' },
    { id: 43, name: 'Kinoplex Praia da Costa' },
    { id: 45, name: 'Cine Odeon- Centro Cultural LSR' },
    { id: 47, name: 'Kinoplex RioSul' },
    { id: 49, name: 'Kinoplex Iguaçu Top' },
    { id: 51, name: 'Kinoplex Parque da Cidade' },
    { id: 1, name: 'Cinema Amazonas' },
    { id: 3, name: 'Kinoplex Goiânia' },
    { id: 5, name: 'Kinoplex Shopping Boulevard RJ' },
    { id: 7, name: 'Kinoplex North Shopping (Fortaleza)' },
    { id: 9, name: 'Cinema Rio Sul' },
    { id: 11, name: 'Kinoplex Osasco - SRBR' },
    { id: 13, name: 'Kinoplex ParkShopping' },
    { id: 15, name: 'Kinoplex Dom Pedro' },
    { id: 17, name: 'Kinoplex Tijuca' },
    { id: 24, name: 'Kinoplex Boulevard' },
    { id: 26, name: 'Kinoplex Vila Olimpia' },
    { id: 28, name: 'Kinoplex Boa Vista' },
    { id: 30, name: 'Kinoplex Shopping Leblon' },
    { id: 32, name: 'Kinoplex Nova America' }
];

const InfoPerfilUso = ({ categoria }: { categoria: string }) => {
    // Definir o fuso horário de Brasília
    const defaultDate = dayjs().tz('America/Sao_Paulo');

    const [allData, setAllData] = useState<AllDataType>({
        printName: '',
        qtdMaxPreApproved: 0,
        rescueChannels: '',
        city: '',
        roomTypes: [''],
        movie: '',
        onlyFor: '',
        fromWeekdayH: 0,
        toWeekdayH: 0,
        fromWeekendH: 0,
        toWeekendH: 0,
        fromWeekdayM: 0,
        toWeekdayM: 0,
        fromWeekendM: 0,
        toWeekendM: 0,
        allowMovie3D: false,
        allowVipRoom: false,
        validFrom: defaultDate,
        validTo: defaultDate,
        days: ['']
    });

    const handleHourChange = (event: React.ChangeEvent<{ value: any }>, name: string) => {
        event.preventDefault();
        //week
        if (name === 'fromWeekdayH') {
            setAllData({ ...allData, fromWeekdayH: parseInt(event.target.value) });
        }
        if (name === 'fromWeekdayM') {
            setAllData({ ...allData, fromWeekdayM: parseInt(event.target.value) });
        }
        if (name === 'fromWeekendH') {
            setAllData({ ...allData, fromWeekendH: parseInt(event.target.value) });
        }
        if (name === 'fromWeekendM') {
            setAllData({ ...allData, fromWeekendM: parseInt(event.target.value) });
        }
        //weekend
        if (name === 'toWeekdayH') {
            setAllData({ ...allData, toWeekdayH: parseInt(event.target.value) });
        }
        if (name === 'toWeekdayM') {
            setAllData({ ...allData, toWeekdayM: parseInt(event.target.value) });
        }
        if (name === 'toWeekendH') {
            setAllData({ ...allData, toWeekendH: parseInt(event.target.value) });
        }
        if (name === 'toWeekendM') {
            setAllData({ ...allData, toWeekendM: parseInt(event.target.value) });
        }
    };

    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    // Estado para armazenar os canais selecionados
    const [selectedChannel, setSelectedChannel] = useState<string[]>([]);
    const [selectAllChannel, setSelectAllChannel] = useState(false);
    // Função para lidar com a seleção/deseleção de todos os canais
    const handleSelectAllChannel = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setSelectAllChannel(isChecked);

        if (isChecked) {
            setSelectedChannel(canais); // Seleciona todos os canais
        } else {
            setSelectedChannel([]); // Deseleciona todos os canais
        }
    };
    // Função para lidar com a seleção/deseleção de um canal específico
    const handleChangeChannel = (event: React.ChangeEvent<HTMLInputElement>, channel: string) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedChannel((prev) => [...prev, channel]);
        } else {
            setSelectedChannel((prev) => prev.filter((c) => c !== channel));
        }
    };
    // Estado para armazenar os dias da semana selecionados
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    // Função para lidar com a seleção/deseleção de todos os dias
    const handleSelectAllDays = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setSelectAll(isChecked);

        if (isChecked) {
            setSelectedDays(allDays); // Seleciona todos os dias
        } else {
            setSelectedDays([]); // Deseleciona todos os dias
        }
    };
    // Função para lidar com a seleção/deseleção de um dia específico
    const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>, day: string) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedDays((prev) => [...prev, day]);
        } else {
            setSelectedDays((prev) => prev.filter((d) => d !== day));
        }
    };

    // Estado para armazenar os dias da semana selecionados
    const [selectedCinema, setSelectedCinema] = useState<string[]>([]);
    const [selectAllCinema, setSelectAllCinema] = useState(false);
    // Função para lidar com a seleção/deseleção de todos os cinemas
    const handleSelectAllCinema = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setSelectAllCinema(isChecked);

        if (isChecked) {
            const cinemaNames = allCinemas.map((cinema) => cinema.name); // Mapeia para pegar apenas os names dos cinemas
            setSelectedCinema(cinemaNames); // Seleciona todos os cinemas
        } else {
            setSelectedCinema([]); // Deseleciona todos os dias
        }
    };
    // Função para lidar com a seleção/deseleção de um cinema específico
    const handleCinemaChange = (event: React.ChangeEvent<HTMLInputElement>, cinema: string) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedCinema((prev) => [...prev, cinema]);
        } else {
            setSelectedCinema((prev) => prev.filter((c) => c !== cinema));
        }
    };

    // Estado para armazenar os tipos de sala
    const [selectedRoomType, setSelectedRoomType] = useState<string[]>([]);
    const [selectAllRoomType, setSelectAllRoomType] = useState(false);
    // Função para lidar com a seleção/deseleção de todos os tipos de sala
    const handleSelectAllRoomType = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setSelectAllRoomType(isChecked);

        if (isChecked) {
            const roomTypes = rTypes.map((rt) => rt); // Mapeia para pegar apenas os names dos tipos de sala
            setSelectedRoomType(roomTypes); // Seleciona todos os tipos de sala
        } else {
            setSelectedRoomType([]); // Deseleciona todos os dias
        }
    };
    // Função para lidar com a seleção/deseleção de um tipo de sala específico
    const handleRoomTypeChange = (event: React.ChangeEvent<HTMLInputElement>, roomType: string) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedRoomType((prev) => [...prev, roomType]);
        } else {
            setSelectedRoomType((prev) => prev.filter((rt) => rt !== roomType));
        }
    };

    // Função pra lidar com os demais itens do formulário
    const handleChangeData = (event: any, name: string) => {
        if (name === 'printName') {
            setAllData({ ...allData, printName: event.target.value });
        }
        if (name === 'qtdMaxPreApproved') {
            setAllData({ ...allData, qtdMaxPreApproved: event.target.value });
        }
        if (name === 'rescueChannels') {
            setAllData({ ...allData, rescueChannels: event.target.value });
        }
        if (name === 'city') {
            setAllData({ ...allData, city: event.target.value });
        }
        if (name === 'movie') {
            setAllData({ ...allData, movie: event.target.value });
        }
        if (name === 'onlyFor') {
            setAllData({ ...allData, onlyFor: event.target.value });
        }
        if (name === 'fromWeekdayH') {
            setAllData({ ...allData, fromWeekdayH: event.target.value });
        }
        if (name === 'toWeekdayH') {
            setAllData({ ...allData, toWeekdayH: event.target.value });
        }
        if (name === 'fromWeekendH') {
            setAllData({ ...allData, fromWeekendH: event.target.value });
        }
        if (name === 'toWeekendH') {
            setAllData({ ...allData, toWeekendH: event.target.value });
        }
        if (name === 'fromWeekdayM') {
            setAllData({ ...allData, fromWeekdayM: event.target.value });
        }
        if (name === 'toWeekdayM') {
            setAllData({ ...allData, toWeekdayM: event.target.value });
        }
        if (name === 'fromWeekendM') {
            setAllData({ ...allData, fromWeekendM: event.target.value });
        }
        if (name === 'toWeekendM') {
            setAllData({ ...allData, toWeekendM: event.target.value });
        }
        if (name === 'allowMovie3D') {
            setAllData({ ...allData, allowMovie3D: event.target.checked });
        }
        if (name === 'allowVipRoom') {
            setAllData({ ...allData, allowVipRoom: event.target.checked });
        }
        if (name === 'validFrom') {
            setAllData({ ...allData, validFrom: event.target.value });
        }
        if (name === 'validTo') {
            setAllData({ ...allData, validTo: event.target.value });
        }
    };
    // Função para lidar com o componente de data validFrom
    const handleChangeValidFrom = (newValue: Dayjs | null) => {
        setAllData({ ...allData, validFrom: newValue ? newValue : defaultDate });
    };
    const handleChangeValidTo = (newValue: Dayjs | null) => {
        setAllData({ ...allData, validTo: newValue ? newValue : defaultDate });
    };

    // Verificar automaticamente se todos os cinemas, canais, todas os tipos de sala ou dias estão selecionados
    useEffect(() => {
        if (selectedCinema.length === allCinemas.length) {
            setSelectAllCinema(true);
        } else {
            setSelectAllCinema(false);
        }
        if (selectedChannel.length === canais.length) {
            setSelectAllChannel(true);
        } else {
            setSelectAllChannel(false);
        }
        if (selectedDays.length === allDays.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
        if (selectedRoomType.length === rTypes.length) {
            setSelectAllRoomType(true);
        } else {
            setSelectAllRoomType(false);
        }
    }, [selectedCinema, selectedChannel, selectedDays, selectedRoomType]);
    return (
        <Grid container spacing={2}>
            {/*
            <Grid item xs={12} >
                JSON:{' '}
                {`{
                    printName: ${allData.printName},
                    qtdMaxPreApproved: ${allData.qtdMaxPreApproved},
                    rescueChannels: ${allData.rescueChannels},
                    city: ${allData.city},
                    cinema: ${selectedCinema.length > 0 ? `[${selectedCinema}]` : `[]`},
                    canais: ${selectedChannel.length > 0 ? `[${selectedChannel}]` : `[]`},
                    roomTypes: ${selectedRoomType.length > 0 ? `[${selectedRoomType}]` : `[]`},,
                    movie: ${allData.movie},
                    onlyFor: ${allData.onlyFor},
                    fromWeekdayH: ${allData.fromWeekdayH},
                    toWeekdayH: ${allData.toWeekdayH},
                    fromWeekendH: ${allData.fromWeekendH},
                    toWeekendH: ${allData.toWeekendH},
                    fromWeekdayM: ${allData.fromWeekdayM},
                    toWeekdayM: ${allData.toWeekdayM},
                    fromWeekendM: ${allData.fromWeekendM},
                    toWeekendM: ${allData.toWeekendM},
                    allowMovie3D: ${allData.allowMovie3D},
                    allowVipRoom: ${allData.allowVipRoom},
                    validFrom: ${allData.validFrom},
                    validTo: ${allData.validTo},
                    days: ${selectedDays.length > 0 ? `[${selectedDays}]` : `[]`}
                }`}
            </Grid>
            */}

            <Grid item xs={3}>
                <Stack spacing={1}>
                    <Box sx={{ display: 'flex' }}>
                        <h4>Nome Impresso no Ingresso</h4>
                    </Box>
                    <TextField
                        id="store-description"
                        label="Nome Impresso no Ingresso"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        onChange={(e) => handleChangeData(e, 'printName')}
                        value={allData.printName}
                    />
                </Stack>
            </Grid>
            <Grid item xs={3}>
                <Stack spacing={1}>
                    <Box sx={{ display: 'flex' }}>
                        <h4>Quantidade Máxima Pré-Aprovada</h4>
                    </Box>
                    <TextField
                        id="qtdMaxPreApproved"
                        label="Quantidade Máxima Pré-Aprovada"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        onChange={(e) => handleChangeData(e, 'qtdMaxPreApproved')}
                        value={allData.qtdMaxPreApproved}
                    />
                </Stack>
            </Grid>
            <Grid item xs={3}>
                <Stack spacing={1}>
                    <Box sx={{ display: 'flex' }}>
                        <h4>Cidade</h4>
                    </Box>
                    <TextField
                        id="city"
                        label="Cidade"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        onChange={(e) => handleChangeData(e, 'city')}
                        value={allData.city}
                    />
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack spacing={1}>
                    <Box sx={{ display: 'flex' }}>
                        <h4>Canais</h4>
                        <FormControlLabel
                            control={<Checkbox checked={selectAllChannel} onChange={handleSelectAllChannel} />}
                            label="TODOS"
                            sx={{ ml: '15px' }}
                        />
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex' }}>
                {canais.map((channel) => (
                    <FormControlLabel
                        key={channel}
                        control={<Checkbox checked={selectedChannel.includes(channel)} onChange={(e) => handleChangeChannel(e, channel)} />}
                        label={channel}
                    />
                ))}
            </Grid>

            <Grid item xs={12}>
                <Box sx={{ display: 'flex' }}>
                    <h4>Cinema</h4>
                    <FormControlLabel
                        control={<Checkbox checked={selectAllCinema} onChange={handleSelectAllCinema} />}
                        key={'ALL'}
                        label={'TODOS'}
                        sx={{ ml: '15px' }}
                    />
                </Box>

                <Grid xs={12} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {allCinemas.map((c) => {
                        return (
                            <Grid item xs={3} key={c.id}>
                                <FormControlLabel
                                    key={c.id}
                                    label={c.name}
                                    control={
                                        <Checkbox
                                            checked={selectedCinema.includes(c.name)}
                                            onChange={(e) => handleCinemaChange(e, c.name)}
                                        />
                                    }
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Stack spacing={1}>
                    <Box sx={{ display: 'flex' }}>
                        <h4>Tipos de Sala</h4>
                        <FormControlLabel
                            control={<Checkbox checked={selectAllRoomType} onChange={handleSelectAllRoomType} />}
                            key={'ALL'}
                            label={'TODOS'}
                            sx={{ ml: '15px' }}
                        />
                    </Box>
                    <Grid xs={12} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {rTypes.map((rT) => {
                            return (
                                <Grid item xs={3}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedRoomType.includes(rT)}
                                                onChange={(e) => handleRoomTypeChange(e, rT)}
                                            />
                                        }
                                        key={rT}
                                        label={rT}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Stack>
            </Grid>
            {categoria === 'CINETICKET_BOMBONIERE' || categoria === 'CINETICKET_BOMBONIERE_ELETRONICO' ? (
                <></>
            ) : (
                <>
                    <Grid item xs={3}>
                        <Stack spacing={1}>
                            <Box sx={{ display: 'flex' }}>
                                <h4>Filme</h4>
                            </Box>
                            <Select
                                labelId="category-select-label"
                                value={allData.movie}
                                onChange={(e) => handleChangeData(e, 'movie')}
                                sx={{ width: '100%' }}
                            >
                                {allCinemas.map((c) => (
                                    <MenuItem key={c.id} value={c.name}>
                                        {c.id} - {c.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Stack>
                    </Grid>
                    <Grid item xs={3}>
                        <Stack spacing={1}>
                            <Box sx={{ display: 'flex' }}>
                                <h4>Válido somente para</h4>
                            </Box>
                            <Select
                                labelId="category-select-label"
                                value={allData.onlyFor}
                                onChange={(e) => handleChangeData(e, 'onlyFor')}
                                sx={{ width: '100%' }}
                            >
                                {onlyFor.map((c) => (
                                    <MenuItem key={c.id} value={c.name}>
                                        {c.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <Box sx={{ display: 'flex' }}>
                                <h4>Horário da Sessão nos Dias de Semana </h4>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel>Hora</InputLabel>
                                    <Select
                                        value={allData.fromWeekdayH}
                                        onChange={(e: any) => handleHourChange(e, 'fromWeekdayH')}
                                        label="Hora"
                                    >
                                        {hours.map((hour) => (
                                            <MenuItem key={hour} value={hour}>
                                                {hour.toString().padStart(2, '0')}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel>Minutos</InputLabel>
                                    <Select
                                        value={allData.fromWeekdayM}
                                        onChange={(e: any) => handleHourChange(e, 'fromWeekdayM')}
                                        label="Minutos"
                                    >
                                        {minutes.map((minute) => (
                                            <MenuItem key={minute} value={minute}>
                                                {minute.toString().padStart(2, '0')}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                às
                                <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel>Hora</InputLabel>
                                    <Select
                                        value={allData.toWeekdayH}
                                        onChange={(e: any) => handleHourChange(e, 'toWeekdayH')}
                                        label="Hora"
                                    >
                                        {hours.map((hour) => (
                                            <MenuItem key={hour} value={hour}>
                                                {hour.toString().padStart(2, '0')}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel>Minutos</InputLabel>
                                    <Select
                                        value={allData.toWeekdayM}
                                        onChange={(e: any) => handleHourChange(e, 'toWeekdayM')}
                                        label="Minutos"
                                    >
                                        {minutes.map((minute) => (
                                            <MenuItem key={minute} value={minute}>
                                                {minute.toString().padStart(2, '0')}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <Box sx={{ display: 'flex' }}>
                                <h4>Horário da Sessão nos Finais de Semana </h4>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel>Hora</InputLabel>
                                    <Select
                                        value={allData.fromWeekendH}
                                        onChange={(e: any) => handleHourChange(e, 'fromWeekendH')}
                                        label="Hora"
                                    >
                                        {hours.map((hour) => (
                                            <MenuItem key={hour} value={hour}>
                                                {hour.toString().padStart(2, '0')}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel>Minutos</InputLabel>
                                    <Select
                                        value={allData.fromWeekendM}
                                        onChange={(e: any) => handleHourChange(e, 'fromWeekendM')}
                                        label="Minutos"
                                    >
                                        {minutes.map((minute) => (
                                            <MenuItem key={minute} value={minute}>
                                                {minute.toString().padStart(2, '0')}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                às
                                <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel>Hora</InputLabel>
                                    <Select
                                        value={allData.toWeekendH}
                                        onChange={(e: any) => handleHourChange(e, 'toWeekendH')}
                                        label="Hora"
                                    >
                                        {hours.map((hour) => (
                                            <MenuItem key={hour} value={hour}>
                                                {hour.toString().padStart(2, '0')}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel>Minutos</InputLabel>
                                    <Select
                                        value={allData.toWeekendM}
                                        onChange={(e: any) => handleHourChange(e, 'toWeekendM')}
                                        label="Minutos"
                                    >
                                        {minutes.map((minute) => (
                                            <MenuItem key={minute} value={minute}>
                                                {minute.toString().padStart(2, '0')}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={3}>
                        <Stack spacing={1}>
                            <Box sx={{ display: 'flex' }}>
                                <h4>Filmes 3D</h4>
                            </Box>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value={allData.allowMovie3D}
                                            onChange={(e: any) => {
                                                handleChangeData(e, 'allowMovie3D');
                                            }}
                                        />
                                    }
                                    key={'allow3D'}
                                    label={'Permitir Uso'}
                                    sx={{ ml: '15px' }}
                                />
                            </Grid>
                        </Stack>
                    </Grid>
                    <Grid item xs={3}>
                        <Stack spacing={1}>
                            <Box sx={{ display: 'flex' }}>
                                <h4>Salas VIP</h4>
                            </Box>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value={allData.allowVipRoom}
                                            onChange={(e: any) => {
                                                handleChangeData(e, 'allowVipRoom');
                                            }}
                                        />
                                    }
                                    key={'salasVIP'}
                                    label={'Permitir Uso'}
                                    sx={{ ml: '15px' }}
                                />
                            </Grid>
                        </Stack>
                    </Grid>
                </>
            )}

            <Grid item xs={12}>
                <Stack spacing={1}>
                    <Box sx={{ display: 'flex' }}>
                        <h4>Período Válido (dd/mm/aaaa)</h4>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                <DatePicker
                                    label="De"
                                    defaultValue={allData.validFrom}
                                    onChange={(newValue) => handleChangeValidFrom(newValue)}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                <DatePicker
                                    label="Até"
                                    defaultValue={allData.validTo}
                                    onChange={(newValue) => handleChangeValidTo(newValue)}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack spacing={1}>
                    <Box sx={{ display: 'flex' }}>
                        <h4>Dias da Semana</h4>
                        <FormControlLabel
                            control={<Checkbox checked={selectAll} onChange={handleSelectAllDays} />}
                            label="TODOS"
                            sx={{ ml: '15px' }}
                        />
                    </Box>
                    <Grid xs={12} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Grid item xs={12}>
                            {allDays.map((day) => (
                                <FormControlLabel
                                    key={day}
                                    control={<Checkbox checked={selectedDays.includes(day)} onChange={(e) => handleDayChange(e, day)} />}
                                    label={day}
                                />
                            ))}
                        </Grid>
                    </Grid>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default InfoPerfilUso;
