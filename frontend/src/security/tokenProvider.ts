const createTokenProvider = () => {
  let _token: { accessToken: string; refreshToken: string } | null =
    JSON.parse(localStorage.getItem("BSA_AUTH"));

  let observers: Array<(isLogged: boolean) => void> = [];

  const subscribe = (observer: (isLogged: boolean) => void) => {
    observers.push(observer);
  };

  const unsubscribe = (observer: (isLogged: boolean) => void) => {
    observers = observers.filter(_observer => _observer !== observer);
  };

  const notify = () => {
    const isLogged = isLoggedIn();
    observers.forEach(observer => observer(isLogged));
  };

  const getToken = () => _token?.accessToken;

  const getRefreshToken = () => _token?.refreshToken;

  const setToken = (token: typeof _token) => {
    if (token) localStorage.setItem("BSA_AUTH", JSON.stringify(token));
    else localStorage.removeItem("BSA_AUTH");

    _token = token;
    notify();
  };

  const isLoggedIn = () => !!_token;

  return {
    getToken,
    getRefreshToken,
    isLoggedIn,
    setToken,
    subscribe,
    unsubscribe
  };
};

export default createTokenProvider();
