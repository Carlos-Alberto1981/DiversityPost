import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LoginDataContext } from '../../provider.context/LoginDataProvider';
import { useWindowDimensions } from '../Utilities';
import { Logout } from './Logout';

const PhoneMenu = () => {
  const { token, setToken, loggedUser, setLoggedUser } =
    useContext(LoginDataContext);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const BlankSpace = () => <section className="blankspace" />;

  const { width } = useWindowDimensions();

  return hasBeenOpened || width >= 1200 ? (
    <>
      <img
        className="menubutton"
        src="/icons/menu_icon.svg"
        alt="Menu"
        onClick={() => setIsVisible(!isVisible)}
      />
      <section
        className={isVisible ? 'menuwrappervisible' : 'menuwrapperhidden'}
        onClick={(e) =>
          e.target.className !== 'blankspace' && setIsVisible(false)
        }
      >
        <nav
          onClick={(e) => {
            e.target.className !== 'blankspace' && setIsVisible(false);
          }}
          className={isVisible ? 'phonemenuvisible' : 'phonemenuhidden'}
        >
          {token && loggedUser ? (
            <>
              <NavLink to={`/user/${loggedUser.id}`}>
                {`${loggedUser.name}`}
              </NavLink>
              <NavLink to="/newpost">Nuevo Post</NavLink>
              <NavLink to="/user/posts">Mis Posts</NavLink>

              <Logout setToken={setToken} setLoggedUser={setLoggedUser} />
              <BlankSpace />
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>

              <NavLink to="/register">Register</NavLink>
              <BlankSpace />
            </>
          )}
        </nav>
      </section>
    </>
  ) : (
    <img
      className="menubutton"
      src="/icons/menu_icon.svg"
      alt="Menu"
      onClick={() => {
        setIsVisible(!isVisible);
        setHasBeenOpened(true);
      }}
    />
  );
};

export { PhoneMenu };
