import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

// types
import { MenuProps } from 'types/menu';

const initialState: MenuProps = {
    isDashboardDrawerOpened: false
};

export const endpoints = {
    key: 'api/menu',
    master: 'master'
};

// Fetches master menu data
export function useGetMenuMaster() {
    const { data, isLoading } = useSWR(endpoints.key + endpoints.master, () => initialState, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    const memoizedValue = useMemo(
        () => ({
            menuMaster: data as MenuProps,
            menuMasterLoading: isLoading
        }),
        [data, isLoading]
    );

    return memoizedValue;
}

// Handles opening/closing of the dashboard drawer
export function handlerDrawerOpen(isDashboardDrawerOpened: boolean) {
    // Update local state based on key
    mutate(
        endpoints.key + endpoints.master,
        (currentMenuMaster: any) => {
            return { ...currentMenuMaster, isDashboardDrawerOpened };
        },
        false
    );
}
