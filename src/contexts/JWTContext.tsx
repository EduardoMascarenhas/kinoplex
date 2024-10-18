import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import { jwtDecode } from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';

// types
import { KeyedObject } from 'types';
import { InitialLoginContextProps, JWTContextType } from 'types/auth';
import { UserProfile } from 'types/user-profile';

const chance = new Chance();

// constant
const initialState: InitialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const verifyToken: (st: string) => boolean = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded: KeyedObject = jwtDecode(serviceToken);
    /**
     * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
     */
    return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken?: string | null) => {
    if (serviceToken) {
        localStorage.setItem('serviceToken', serviceToken);
        axios.defaults.headers.common.Authorization = `${serviceToken}`;
    } else {
        localStorage.removeItem('serviceToken');
        delete axios.defaults.headers.common.Authorization;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(() => {
        const init = async () => {
            try {
                const serviceToken = window.localStorage.getItem('serviceToken');
                if (serviceToken && verifyToken(serviceToken)) {
                    // Decodificar o token JWT para obter o "user"
                    const decodedToken = jwtDecode<{ sub: string }>(serviceToken || '');
                    const user: UserProfile = {
                        id: '1',
                        name: decodedToken.sub
                    };

                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            user
                        }
                    });
                } else {
                    dispatch({
                        type: LOGOUT
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: LOGOUT
                });
            }
        };

        init();
    }, []);

    const login = async (username: string, password: string) => {
        const response = await axios.post('/login', { username, password });

        // Extrair o token do cabeçalho 'authorization'
        const authorizationHeader = response.headers['authorization'];
        const serviceToken = authorizationHeader?.split(' ')[1]; // Remove o "Bearer" do token

        // Decodificar o token JWT para obter o "user"
        const decodedToken = jwtDecode<{ sub: string }>(serviceToken || '');
        const user: UserProfile = {
            id: '1',
            name: decodedToken.sub
        };
        setSession(serviceToken);
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                user
            }
        });
    };

    const register = async (username: string, password: string, firstName: string, lastName: string) => {
        const id = chance.bb_pin();
        const response = await axios.post('/api/account/register', {
            id,
            username,
            password,
            firstName,
            lastName
        });
        let users = response.data;

        if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
            const localUsers = window.localStorage.getItem('users');
            users = [
                ...JSON.parse(localUsers!),
                {
                    id,
                    username,
                    password,
                    name: `${firstName} ${lastName}`
                }
            ];
        }

        window.localStorage.setItem('users', JSON.stringify(users));
    };

    const logout = () => {
        setSession(null);
        dispatch({ type: LOGOUT });
    };

    const resetPassword = async (username: string) => {};

    const updateProfile = () => {};

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>
    );
};

export default JWTContext;
