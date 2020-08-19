import React, {useEffect} from 'react';
import {useAuth} from '../../security/authProvider';
import {redirectToCompany, redirectToMain} from "../../helpers/subdomain.helper";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import {fetchCompanyRoutine} from "../../sagas/companies/routines";
import {unmountComponentAtNode} from "react-dom";

const SubdomainRouter: React.FC<SubdomainRouterProps> = ({company, fetchCompany, children}) => {
    const isLogged = useAuth();
    // useEffect(() => {
    //     if(isLogged && !company) {
    //         fetchCompany();
    //         return;
    //     }
    //     if (isLogged) {
    //         redirectToCompany(company);
    //     } else {
    //         redirectToMain();
    //     }
    // }, [fetchCompany, company, isLogged]);
    return (
        <>
            {children}
        </>
    );
};
const mapStateToProps = (state: IAppState) => ({
    company: state.company.currentCompany
});

const mapDispatchToProps = {
    fetchCompany: fetchCompanyRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type SubdomainRouterProps = ConnectedProps<typeof connector>;

export default connector(SubdomainRouter);