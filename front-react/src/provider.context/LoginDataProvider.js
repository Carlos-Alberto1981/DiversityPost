import { createContext } from 'react';
import { useLocalStorage } from '../components/Utilities';

const LoginDataContext = createContext();

const LoginDataProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage('token');
  const [loggedUser, setLoggedUser] = useLocalStorage('loggedUser');
  return (
    <LoginDataContext.Provider
      value={{ token, setToken, loggedUser, setLoggedUser }}
    >
      {children}
    </LoginDataContext.Provider>
  );
};

export { LoginDataContext, LoginDataProvider };
