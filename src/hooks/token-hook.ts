export const useToken = () => {
  const getLocalToken = () => {
    const localtoken = localStorage.getItem("token");
    return localtoken;
  };

  const fetchToken = (
    navigator: (path: string) => void,
    username: string,
    pagePath: string = ""
  ) => {
    if (localStorage.getItem("token")) {
      navigator(
        pagePath ? `/private/${username}/${pagePath}` : `/private/${username}/`
      );
      return;
    }
    navigator("/auth");
  };

  const AuthHandler = (
    navigator: (path: string) => void,
    setToken: (token: string) => void
  ) => {
    const localToken = localStorage.getItem("token");

    if (!localToken) {
      navigator("/auth");
      return;
    }
    setToken(localToken);
  };

  const storeToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  const storeUsername = (username: string) => {
    localStorage.setItem("username", username);
  };

  const getLocalUsername = () => {
    const localUser = localStorage.getItem("username");
    return localUser;
  };

  const logOutCallBack = (navigator: (path: string) => void) => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigator("/auth");
  };

  return {
    fetchToken,
    storeToken,
    AuthHandler,
    storeUsername,
    getLocalUsername,
    getLocalToken,
    logOutCallBack,
  };
};
