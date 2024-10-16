import { useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

// project imports
import TabDetalhe from './TabDetalhe';
import TabOportunidade from './TabOportunidade';
import MainCard from 'ui-component/cards/MainCard';

// assets
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';

// types
import { ThemeMode } from 'types/config';
import { TabsProps } from 'types';

// tab content
function TabPanel({ children, value, index, ...other }: TabsProps) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

// ==============================|| INVOICE DETAILS ||============================== //

const DetalheOportunidade = () => {
    const theme = useTheme();

    // set selected tab
    const [value, setValue] = useState<number>(0);
    const handleChangeTabs = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <MainCard>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChangeTabs}
                variant="scrollable"
                aria-label="simple tabs example"
                sx={{
                    '& a': {
                        minHeight: 'auto',
                        minWidth: 10,
                        px: 1,
                        py: 1.5,
                        mr: 2.25,
                        color: theme.palette.mode === ThemeMode.DARK ? 'grey.600' : 'grey.900',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    '& a.Mui-selected': { color: 'primary.main' },
                    '& a > svg': { marginBottom: '0px !important', marginRight: 1.25 },
                    mb: 3
                }}
            >
                <Tab icon={<DescriptionTwoToneIcon />} component={Link} to="#" label="Detalhes" {...a11yProps(0)} />
                <Tab icon={<ReceiptTwoToneIcon />} component={Link} to="#" label="Nota de Débito" {...a11yProps(1)} />
                {/* <Tab icon={<LocalShippingTwoToneIcon />} component={Link} to="#" label="Status" {...a11yProps(2)} /> */}
            </Tabs>

            {/* tab - details */}
            <TabPanel value={value} index={0}>
                <TabDetalhe />
            </TabPanel>

            {/* tab - invoice */}
            <TabPanel value={value} index={1}>
                <TabOportunidade />
            </TabPanel>

            {/* tab - status */}
            {/* <TabPanel value={value} index={2}>
                <TabStatus />
            </TabPanel> */}
        </MainCard>
    );
};

export default DetalheOportunidade;
