import { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { getUserProfile } from '../../resources';
import { Loading } from '../PostComponents/Loading/Loading';
import { LoginDataContext } from '../../provider.context/LoginDataProvider';
import { useRequestHandler } from '../useRequestHandler';

const Profile = () => {
  const { token } = useContext(LoginDataContext);
  const { id } = useParams();
  const [profileData, setProfileData] = useState();

  useRequestHandler(() => getUserProfile(token, id, setProfileData));

  return profileData?.error === 404 ? (
    <Navigate to="/" />
  ) : profileData === undefined ? (
    <Loading />
  ) : (
    <>
      <section className="userprofile">
        <img
          src={
            profileData.avatar === 1
              ? `${process.env.REACT_APP_HOST}/${id}`
              : '/icons/avatar.svg'
          }
          alt="Avatar"
          className="avatar"
        />
        <h2>{`${profileData.name}`}</h2>
        <ul className={profileData.email ? 'userdata' : 'userdatashort'}>
          {profileData.email ? <li className="emailkey">Email </li> : null}
          <li className="datekey">Fecha de registro</li>
          <li className="postskey"> Posts publicados</li>

          {profileData.email && (
            <li className="emailvalue">{profileData.email}</li>
          )}
          <li className="datevalue">
            {`${new Date(`${profileData.createdAt}`).toLocaleDateString()}`}
          </li>
          <li className="postsvalue"> {profileData.postcount}</li>
        </ul>
      </section>
      {profileData.email && (
        <NavLink className="edituserbutton" to="/user/edit">
          <p className="bigbutton">Editar usuario</p>
        </NavLink>
      )}
    </>
  );
};

export { Profile };
