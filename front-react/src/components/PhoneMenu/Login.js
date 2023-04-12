import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { FadingMessageContext } from '../../provider.context/FadingBannerProvider';
import { LoginDataContext } from '../../provider.context/LoginDataProvider';

import { loginUser } from '../../resources';

const Login = () => {
  const { setFadingMessage } = useContext(FadingMessageContext);
  const { setToken, setLoggedUser } = useContext(LoginDataContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !email) {
      setFadingMessage('¡Rellena todos los campos!', true);
    } else {
      try {
        const isLogged = await loginUser(
          email,
          password,
          setToken,
          setLoggedUser
        );
        if (isLogged.ok) {
          setFadingMessage('¡Te has logueado con éxito!');
          nav('/');
        }
      } catch (err) {
        setFadingMessage(
          'Error al iniciar sesión. Asegúrate de que las credenciales sean correctas.',
          true
        );
      }
      setEmail('');
      setPassword('');
    }
  };

  return (
    <section className="formwithbuttons">
      <form className="pageform" onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name="email"
          required
        ></input>

        <input
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          name="password"
          required
        ></input>
        <button className="bigbutton">Login</button>
      </form>
    </section>
  );
};

export { Login };
