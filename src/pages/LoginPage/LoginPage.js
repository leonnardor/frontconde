import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://redesocialsenac.azurewebsites.net/users/login', {
        username,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/feed');
      console.log('Login bem-sucedido!', token);
    } catch (error) {
      console.error('Erro ao realizar o login:', error);
    }
  };

  return (
    <div>
      <h1>Página de Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Usuario:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Senha:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
