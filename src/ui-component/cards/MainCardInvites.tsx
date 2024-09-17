import React, { Ref, useState } from 'react';

// material-ui
import Card, { CardProps } from '@mui/material/Card';
import CardContent, { CardContentProps } from '@mui/material/CardContent';
import CardHeader, { CardHeaderProps } from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// project-import
import useConfig from 'hooks/useConfig';

// assets
import AddIcon from '@mui/icons-material/Add';

// types
import { ThemeMode } from 'types/config';
import { KeyedObject } from 'types';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AddClient from 'views/invitations/Client/AddClient';
import Box from '@mui/material/Box';

// constant
const headerSX = {
    '& .MuiCardHeader-action': { mr: 0 }
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

export interface MainCardInvites extends KeyedObject {
    border?: boolean;
    boxShadow?: boolean;
    children: React.ReactNode | string;
    style?: React.CSSProperties;
    content?: boolean;
    className?: string;
    contentClass?: string;
    contentSX?: CardContentProps['sx'];
    darkTitle?: boolean;
    sx?: CardProps['sx'];
    secondary?: CardHeaderProps['action'];
    shadow?: string;
    elevation?: number;
    title?: React.ReactNode | string;
}

const MainCardInvites = React.forwardRef(
    (
        {
            border = false,
            boxShadow,
            children,
            content = true,
            contentClass = '',
            contentSX = {},
            darkTitle,
            secondary,
            shadow,
            sx = {},
            title,
            ...others
        }: MainCardInvites,
        ref: Ref<HTMLDivElement>
    ) => {
        const { mode } = useConfig();
        const defaultShadow = mode === ThemeMode.DARK ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)';

        return (
            <>
                <Card
                    ref={ref}
                    {...others}
                    sx={{
                        border: border ? '1px solid' : 'none',
                        borderColor: 'divider',
                        ':hover': {
                            boxShadow: boxShadow ? shadow || defaultShadow : 'inherit'
                        },
                        ...sx
                    }}
                >
                    {/* card header and action */}
                    {!darkTitle && title && (
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <CardHeader sx={headerSX} title={title} action={secondary} />
                            <InputAdornment position="end">
                                <Button
                                    color="secondary"
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    sx={{ mr: '15px' }}
                                    onClick={() => (window.location.href = '/invitations/invite/create')}
                                    startIcon={<AddIcon />}
                                >
                                    Novo Convite
                                </Button>
                            </InputAdornment>
                        </Box>
                    )}
                    {darkTitle && title && (
                        <Box>
                            <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
                            <InputAdornment position="end">
                                <Button
                                    color="secondary"
                                    sx={{ mr: '15px' }}
                                    onClick={() => (window.location.href = '/invitations/invite/create')}
                                    startIcon={<AddIcon />}
                                >
                                    Novo Convite
                                </Button>
                            </InputAdornment>
                        </Box>
                    )}

                    {/* content & header divider */}
                    {title && <Divider />}

                    {/* card content */}
                    {content && (
                        <CardContent sx={contentSX} className={contentClass}>
                            {children}
                        </CardContent>
                    )}
                    {!content && children}
                </Card>
            </>
        );
    }
);

export default MainCardInvites;
