import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { FadingMessageContext } from '../../provider.context/FadingBannerProvider';
import { registerUser } from '../../resources/registerUser';

const Register = () => {
  const { setFadingMessage } = useContext(FadingMessageContext);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(userName, password, email);
      if (res.status === 'ok') {
        setEmail('');
        setUserName('');
        setPassword('');
        setFadingMessage('¡Te has registrado con éxito!');
        nav('/login');
      }
    } catch (err) {
      if (err.status === 409) {
        setFadingMessage('El usuario ya existe.', true);
        return;
      } else if (err.status === 400) {
        setFadingMessage('Alguno de los campos está vacío.', true);
        return;
      }
      setFadingMessage(
        'Algo ha ido mal. Asegúrate de que los datos sean correctos.',
        true
      );
    }
  };

  return (
    <section className="formwithbuttons">
      <form className="pageform" onSubmit={handleSubmit}>
        <input
          placeholder="Nombre"
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          name="username"
          required
        ></input>

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
        <button className="bigbutton">Registrarse</button>
      </form>
    </section>
  );
};

export { Register };
