import React, {useEffect} from 'react';
import {useAuth} from '../../security/authProvider';
import {getSubdomainFromDomain, redirectToCompany} from "../../helpers/subdomain.helper";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import {history} from "../../helpers/history.helper";
import {fetchCompanyBySubdomainRoutine, fetchCompanyRoutine} from "../../sagas/companies/routines";

const SubdomainRouter: React.FC<SubdomainRouterProps> =
    ({
       company,
       error,
       fetchCompany,
       fetchCompanyBySubdomain,
       children}) => {

    const isLogged = useAuth();

    useEffect(() => {
        if(isLogged && !company && !error) {
            fetchCompany();
            return;
        }
        isLogged && !error ? redirectToCompany(company) : history.push("/error");

        const subdomain = getSubdomainFromDomain();
        if(!subdomain) {
            return;
        }

        if(!isLogged && !company && !error) {
            fetchCompanyBySubdomain(subdomain);
            return;
        }

        if(!isLogged && !company) {
            history.push({
                pathname: '/error',
                state: {text: 'This company does not exist. Sign in to existing or create you own'}
            });
        }

        if(!isLogged && !!company) {
            history.push('/auth');
        }
    }, [isLogged, company, fetchCompany, fetchCompanyBySubdomain, error]);

    return (
        <>
            {children}
        </>
    );
};
const mapStateToProps = (state: IAppState) => ({
    company: state.company.currentCompany,
    error: state.company.error
});

const mapDispatchToProps = {
    fetchCompany: fetchCompanyRoutine,
    fetchCompanyBySubdomain: fetchCompanyBySubdomainRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type SubdomainRouterProps = ConnectedProps<typeof connector>;

export default connector(SubdomainRouter);