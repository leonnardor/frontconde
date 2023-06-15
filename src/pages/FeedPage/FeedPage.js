import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
// css
import './FeedPage.css';

const FeedPage = () => {
  const [content, setContent] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isPostsLoaded, setIsPostsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getPosts();
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    if (isPostsLoaded) {
      fetchImages();
    }
  }, [isPostsLoaded]);
  const getPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://redesocialsenac.azurewebsites.net/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setPosts(response.data);
      setIsPostsLoaded(true);
      console.log(response.data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Token de autenticação inválido');
        // Redirecione para a página de login ou faça alguma ação de tratamento de erro
      } else {
        console.error('Erro ao obter os posts:', error);
      }
    }
  };
  

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content', content);
    formData.append('postImage', postImage);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://redesocialsenac.azurewebsites.net/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      // Atualiza a lista de posts após o envio bem-sucedido
      getPosts();

      // Limpa o formulário
      setContent('');
      setPostImage(null);
    } catch (error) {
      console.error('Erro ao criar o post:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: error.response.data,
      });
    }
  };

  const getBlobImage = (imageUrl) => {
    return imageUrl;
  };
  

  const fetchImages = async () => {
    try {
      const updatedPosts = await Promise.all(
        posts.map(async (post) => {
          const imageUrl = await getBlobImage(
            `https://storedesenac.blob.core.windows.net/cdnrede/${post.image_url}`
          );
          return { ...post, imageUrl };
        })
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Erro ao buscar as imagens:', error);
    }
  };
  
  

  return (
    <div>
      <h1>Feed</h1>
      <form onSubmit={handlePostSubmit}>
        <label>
          Conteúdo:
          <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </label>
        <br />
        <label>
          Imagem:
          <input type="file" onChange={(e) => setPostImage(e.target.files[0])} />
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>

      <h2>Posts</h2>
{isPostsLoaded ? (
  posts.map((post) => (
    <div key={post.id}>
      <div>
        <h3>Usuario: {post.user_id}</h3> {/* Use a propriedade correta para exibir o ID do usuário */}
        {post.image_url && <img src={post.imageUrl} alt="Post" />} {/* Use a propriedade correta para exibir a URL da imagem */}
        <p>{post.content}</p>
      </div>
    </div>
  ))
) : (
  <p>Carregando posts...</p>
)}

    </div>
  );
};

export default FeedPage;
