import { useNavigate } from 'react-router';
import { deleteLocalStorage } from '../Utilities';

const Logout = ({ setToken, setLoggedUser }) => {
  const nav = useNavigate();
  return (
    <p
      className="logoutbutton"
      onClick={(e) => {
        deleteLocalStorage(setToken, setLoggedUser);
        nav('/');
      }}
    >
      Logout
    </p>
  );
};

export { Logout };
