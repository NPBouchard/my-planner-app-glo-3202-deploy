import { useEffect } from 'react';
import { redirect } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext';

export const useRequireAuth = (redirectTo: string = '/pages/signin') => {
    const auth = useAuth();

    useEffect(() => {
        if (auth.user === null) {
            redirect(redirectTo);
        }
    }, [auth, redirect, redirectTo]);

    return auth.user;
};