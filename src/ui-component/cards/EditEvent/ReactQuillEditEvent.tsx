import { useState } from 'react';

import { Button, Box, Grid } from '@mui/material';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';

// third party
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// ==============================|| QUILL EDITOR ||============================== //

const ReactQuillEditEvent = () => {
    const [text, setText] = useState('Nenhuma Observação.');

    // Função para lidar com a mudança de texto
    const handleChange = (value: string) => {
        setText(value);
    };

    // Função para salvar o texto (neste caso, console.log)
    const handleSave = () => {
        console.log('Texto salvo: ', text);
    };

    // Configuração personalizada da toolbar
    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ script: 'sub' }, { script: 'super' }],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ align: [] }],
            ['link', 'image', 'video'],
            ['clean']
        ]
    };

    // Formatos permitidos
    const formats = [
        'header',
        'font',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
        'color',
        'background',
        'align',
        'code-block',
        'script'
    ];

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <ReactQuill
                        value={text}
                        onChange={handleChange}
                        modules={modules}
                        formats={formats}
                        theme="snow"
                        style={{ height: 300 }} // Usando o estilo em formato de objeto, valor numérico sem aspas
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'right', mt: '60px' }}>
                        <Button
                            color="secondary"
                            size="large"
                            type="submit"
                            variant="contained"
                            sx={{ maxWidth: '150px' }}
                            onClick={handleSave}
                            startIcon={<SaveTwoToneIcon />}
                        >
                            Salvar
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default ReactQuillEditEvent;
