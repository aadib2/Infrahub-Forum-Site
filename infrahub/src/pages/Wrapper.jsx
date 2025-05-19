import React, {useEffect, useState} from "react";
import { supabase } from '../client';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

function Wrapper({ children }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const {
                data: {session},
            } = await supabase.auth.getSession();
            // !!null => false
            // or if there is a session: !!{} => true
            setAuthenticated(!!session);
            setLoading(false);

        };

        getSession();
    }, []);

    if(loading) {
        return <div>Loading...</div>;
    } else {
        if(authenticated) {
            return <>
                {children}
            </>;
        }
        return <Navigate to="/login"/>;
    }
}

export default Wrapper;