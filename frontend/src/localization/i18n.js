import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import english from "./languages/english.json";
import ukrainian from "./languages/ukrainian.json";

i18n
    .use(initReactI18next)
    .init({
    resources: {
        english: english,
        ukrainian: ukrainian
    },
    fallbackLng: "en",
    debug: false,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
    },

    react: {
        wait: true
    }
});

export default i18n;
