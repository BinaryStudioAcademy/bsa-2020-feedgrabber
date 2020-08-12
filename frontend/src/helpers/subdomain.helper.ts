import tokenProvider from "../security/tokenProvider";

export const redirectToCompany = () => {
    const companyName = 'mycompany'; //mock company name

    const protocol = window.location.protocol;
    const pathname = window.location.pathname;
    const host = window.location.host;
    const parts = host.split('.');

    // e.g http://localhost:3000
    if (parts[parts.length - 1].startsWith('localhost')
        && window.location.origin !== protocol + '//' + companyName + '.feedgrabber.com.localhost:3000') {
        window.location.replace(protocol + '//' + companyName + '.feedgrabber.com.localhost:3000' + pathname);
    }
    // www.feedgrabber.com
    else if (parts[parts.length - 1].startsWith('com')
        && window.location.origin !== 'http://mycompany.feedgrabber.com') {
        window.location.replace(protocol + '//' + companyName + '.feedgrabber.com' + pathname);
    }
};

export const redirectToMain = () => {
    const pathname = window.location.pathname;

    const host = window.location.host;
    const parts = host.split('.');

    // e.g http://localhost:3000
    if (parts[parts.length - 1].startsWith('localhost')
        && window.location.origin !== 'http://feedgrabber.com.localhost:3000') {
        window.location.replace('http://feedgrabber.com.localhost:3000' + pathname);
    }
    // www.feedgrabber.com
    else if (parts[parts.length - 1].startsWith('com')
        && window.location.origin !== 'http://feedgrabber.com') {
        window.location.replace('http://feedgrabber.com' + pathname);
    }
};