
const createLocaleProvider = () => {
  let _locale = "english";

  const getLocale = () => _locale;

  const setLocale = (locale: string) => _locale = locale ?? "english";

  return {
    getLocale,
    setLocale
  };
};
export default createLocaleProvider();