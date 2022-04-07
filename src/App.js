import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { somar } from './store/contador';
import { login } from './store/login';

function App() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(login({ username, password }));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block' }} htmlFor="username">
          Usuário
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={({ target }) => setUserName(target.value)}
        />
        <label style={{ display: 'block' }} htmlFor="password">
          Senha
        </label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button>Enviar</button>
      </form>
      <button onClick={() => dispatch(somar(5))}>Somar</button>
    </div>
  );
}

export default App;
