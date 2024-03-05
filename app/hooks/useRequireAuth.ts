import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

export const useRequireAuth = (redirectTo: string = '/pages/signin') => {
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (auth.user === null) {
            router.push(redirectTo);
        }
    }, [auth, router, redirectTo]);

    return auth.user;
};