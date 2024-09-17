import React, { useState, useEffect } from 'react';

// third-party
import { IntlProvider, MessageFormatElement } from 'react-intl';
import useConfig from 'hooks/useConfig';

// types
import { I18n } from 'types/config';

// load locales files
const loadLocaleData = (i18n: I18n) => {
    switch (i18n) {
        case 'en':
            return import('utils/locales/en.json');
        default:
            return import('utils/locales/pt-br.json');
            
    }
};

// ==============================|| LOCALIZATION ||============================== //

interface LocalsProps {
    children: React.ReactNode;
}

const Locales = ({ children }: LocalsProps) => {
    const { i18n } = useConfig();
    const [messages, setMessages] = useState<Record<string, string> | Record<string, MessageFormatElement[]> | undefined>();

    useEffect(() => {
        loadLocaleData(i18n).then((d: { default: Record<string, string> | Record<string, MessageFormatElement[]> | undefined }) => {
            setMessages(d.default);
        });
    }, [i18n]);

    return (
        <>
            {messages && (
                <IntlProvider locale={i18n} defaultLocale="pt-br" messages={messages}>
                    {children}
                </IntlProvider>
            )}
        </>
    );
};

export default Locales;
