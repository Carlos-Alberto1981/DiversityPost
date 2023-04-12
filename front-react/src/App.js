import { NavLink, Route, Routes } from 'react-router-dom';
import {
  PhoneMenu,
  Login,
  Register,
  Profile,
  EditUser,
} from './components/PhoneMenu';
import './App.css';

import { NewPost, PostList, UserPostList } from './components/PostComponents';
import { SinglePost } from './components/PostComponents/SinglePost';
import {
  useNavigateToHomeIfNoToken,
  useNavigateToHomeIfToken,
} from './components/Utilities';

function App() {
  return (
    <div className="App">
      <header className="mainheader">
        <img src="/icons/world-black.svg" alt="logo"></img>
        <NavLink to="/">
          <h1> DiversityPost </h1>
        </NavLink>

        <PhoneMenu />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={useNavigateToHomeIfToken(<Login />)} />
          <Route
            path="/register"
            element={useNavigateToHomeIfToken(<Register />)}
          />

          <Route
            path="/user/edit"
            element={useNavigateToHomeIfNoToken(<EditUser />)}
          />
          <Route
            path="/newpost"
            element={useNavigateToHomeIfNoToken(<NewPost />)}
          />
          <Route
            path="/user/posts"
            element={useNavigateToHomeIfNoToken(<UserPostList />)}
          />

          <Route path="/user/:id" element={<Profile />} />
          <Route path="/post/:id" element={<SinglePost />} />

          <Route path="/" element={<PostList />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
