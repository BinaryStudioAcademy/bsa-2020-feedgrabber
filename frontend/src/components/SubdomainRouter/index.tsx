import React, {useEffect} from 'react';
import {useAuth} from '../../security/authProvider';
import {redirectToCompany, redirectToMain} from "../../helpers/subdomain.helper";

const SubdomainRouter = ({children}) => {
    const isLogged = useAuth();
    useEffect(() => {
        if (isLogged) {
            redirectToCompany();
        } else {
            redirectToMain();
        }
    });
    return (
        <>
            {children}
        </>
    );
};

export default SubdomainRouter;