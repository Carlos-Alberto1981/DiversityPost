import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LoginDataContext } from '../../provider.context/LoginDataProvider';
import { loadPosts } from '../../resources';
import { VotePanel } from '../PhoneMenu';
import { useRequestHandler } from '../useRequestHandler';
import { Loading } from './Loading/Loading';

const PostList = () => {
  const { token } = useContext(LoginDataContext);
  const [postList, setPostlist] = useState([]);

  useRequestHandler(() => loadPosts(setPostlist, token));

  return !postList ? (
    <Loading />
  ) : (
    <ul className="postlist">
      {postList.length === 0 && <p>No hay posts</p>}
      {postList.map((post) => {
        return (
          <li key={post.id}>
            <section className="postbox">
              <header className="postheader">
                <NavLink className="posttitle" to={`/post/${post.id}`}>
                  <p>
                    {post.title.length > 21
                      ? post.title.slice(0, 21) + '...'
                      : post.title}
                  </p>
                </NavLink>
                <NavLink className="postauthor" to={`/user/${post.id_user}`}>
                  <p>@{post.name}</p>
                </NavLink>
              </header>
              <p className="postcontent">
                {' '}
                {post.content.length > 120
                  ? post.content.slice(0, 120) + '...'
                  : post.content}
              </p>

              <VotePanel token={token} post={post} />
            </section>
          </li>
        );
      })}
    </ul>
  );
};

export { PostList };
