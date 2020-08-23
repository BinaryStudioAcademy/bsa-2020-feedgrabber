import {ICompanyDomain} from "../models/companies/ICompanyDomain";

// `http://${domainPrefix}${companyDomain}.${domainSuffix}${port}`
export const getDomainSuffix = () => {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    // localhost
    if (parts[parts.length - 1].startsWith('localhost')) {
        return 'feedgrabber.com.' + parts[parts.length - 1];
    }
    // e.g www.feedgrabber.com
    else {
        return parts.slice(parts.length - 2, parts.length).join('.');
    }
};

export const getDomainPrefix = () =>  {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    // localhost
    if (parts[parts.length - 1].startsWith('localhost')) {
        return '';
    }
    // e.g www.feedgrabber.com
    else {
        return 'www.';
    }
};

export const redirectToCompany = (company: ICompanyDomain) => {
    const companyName = company.subdomainName;

    const protocol = window.location.protocol;
    const port = window.location.port;
    const pathname = window.location.pathname;
    const hostname = window.location.hostname;

    const newHostname = getDomainPrefix() + companyName + '.' + getDomainSuffix();
    if(hostname !== newHostname) {
        window.location.replace(protocol + '//' + newHostname + ':' + port + pathname);
    }
};

export const redirectToMain = () => {
    const protocol = window.location.protocol;
    const port = window.location.port;
    const pathname = window.location.pathname;
    const hostname = window.location.hostname;

    const newHostname = getDomainPrefix() + getDomainSuffix();
    if(hostname !== newHostname) {
        window.location.replace(protocol + '//' + newHostname + ':' + port + pathname);
    }
};