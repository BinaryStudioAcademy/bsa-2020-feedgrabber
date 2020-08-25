import {ICompanyDomain} from "../models/companies/ICompanyDomain";
import {env} from "../env";

export const redirectToCompany = (company: ICompanyDomain) => {
  replaceWithCompanyName(company.subdomainName);
};

export const redirectToMain = () => {
  replaceWithCompanyName(undefined);
};

const replaceWithCompanyName = (companyName: string | undefined) => {
  const {protocol, pathname, hostname} = window.location;

  const newHostName = `${companyName ? companyName + '.' : ''}${env.baseHost}`;
  if (hostname !== newHostName) {
    const fullNewHostName = env.basePort
      ? newHostName + ':' + env.basePort
      : newHostName;

    window.location.replace(protocol + '//' + fullNewHostName + pathname);
  }
};
