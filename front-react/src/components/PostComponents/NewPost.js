import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { FadingMessageContext } from '../../provider.context/FadingBannerProvider';
import { LoginDataContext } from '../../provider.context/LoginDataProvider';
import { uploadPost } from '../../resources';

const NewPost = () => {
  const { setFadingMessage } = useContext(FadingMessageContext);

  const { token } = useContext(LoginDataContext);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postTitle.length > 0 && postContent.length > 0) {
      try {
        const res = await uploadPost(postTitle, postContent, token);
        setPostTitle('');
        setPostContent('');
        setFadingMessage('¡Post creado!');
        res && nav(`/post/${res.response}`);
      } catch (err) {
        setFadingMessage(err.message, true);
      }
    } else {
      setFadingMessage('¡Ningún campo puede estar vacío!', true);
    }
  };

  return (
    <section className="newpostwrapper">
      <section className="formwithbuttons">
        <form className="pageform" onSubmit={handleSubmit}>
          <section className="textareawrapper">
            <ReactTextareaAutosize
              className="titletext"
              placeholder="Título"
              type="text"
              value={postTitle}
              maxLength="60"
              required
              data-autoresize
              onChange={(e) => {
                setPostTitle(e.target.value);
              }}
            ></ReactTextareaAutosize>

            <ReactTextareaAutosize
              className="contenttext"
              placeholder="Contenido"
              type="text"
              value={postContent}
              data-autoresize
              maxLength="500"
              required
              onChange={(e) => {
                setPostContent(e.target.value);
              }}
            ></ReactTextareaAutosize>
          </section>
          <button className="bigbutton">Publicar</button>
        </form>
      </section>
    </section>
  );
};

export { NewPost };
