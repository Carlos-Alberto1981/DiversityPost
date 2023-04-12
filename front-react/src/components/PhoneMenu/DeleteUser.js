import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { FadingMessageContext } from '../../provider.context/FadingBannerProvider';
import { LoginDataContext } from '../../provider.context/LoginDataProvider';
import { deleteUser } from '../../resources';
import { deleteLocalStorage } from '../Utilities';

const DeleteUser = () => {
  const { setFadingMessage } = useContext(FadingMessageContext);

  const { token, setToken, setLoggedUser } = useContext(LoginDataContext);
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // genera un cuadro de dialogo de confirmacion
    if (window.confirm('¿Estás seguro de querer borrar tu usuario?')) {
      if (!password) {
        setFadingMessage('Debes introducir tu contraseña.', true);
      } else {
        try {
          const deleteSuccess = await deleteUser(password, token);
          setPassword('');
          if (deleteSuccess?.status === 'ok') {
            setFadingMessage(deleteSuccess.data.message);
            setTimeout(() => {
              deleteLocalStorage(setToken, setLoggedUser);
              nav('/');
            }, 2000);
          }
        } catch (err) {
          setPassword('');
          setFadingMessage(err.message, true);
        }
      }
    }
  };

  return (
    <section className="formwithbuttons">
      <form className="pageformdeleted" onSubmit={handleSubmit}>
        <label htmlFor="deleteuser"></label>
        <input
          className="deleteuser"
          name="deleteuser"
          placeholder="Contraseña"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="bigbutton">Eliminar usuario</button>
      </form>
    </section>
  );
};

export { DeleteUser };
