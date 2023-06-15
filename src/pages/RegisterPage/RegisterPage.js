import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.module.css';

const RegisterPage = () => {
  const history = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profileImage', profileImage);

    try {
      const response = await axios.post('https://redesocialsenac.azurewebsites.net/users/register', formData);
      const { token } = response.data;
      history('/login');
      console.log('Usuário registrado com sucesso:', token)
    } catch (error) {
      console.error('Erro ao registrar o usuário:', error);
    }
  };

  return (
    <div>
      <h1>Registro de Usuário</h1>
      <form onSubmit={handleRegister}>
        <label>
          Usuário:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Senha:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Imagem de Perfil:
          <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} />
        </label>
        <br />
        <button type="submit">Registrar</button>
        <a href="/login">Já tem uma conta? Faça login aqui.</a>
      </form>
    </div>
  );
};

export default RegisterPage;
