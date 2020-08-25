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

export const getDomainPrefix = () => {
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
  const newHostname = getDomainPrefix() + companyName + '.' + getDomainSuffix();
  redirectToNewHostName(newHostname);
};

export const redirectToMain = () => {
  const newHostname = getDomainPrefix() + getDomainSuffix();
  redirectToNewHostName(newHostname);
};

const redirectToNewHostName = (newHostName: string) => {
  const {protocol, port, pathname, hostname} = window.location;

  if (hostname !== newHostName) {
    window.location.replace(protocol + '//' + newHostName + ':' + port + pathname);
  }
};
