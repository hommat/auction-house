import { NextPage } from 'next';
import { FormEvent, useState } from 'react';

const Login: NextPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    fetch('/api/v1/security/login', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login,
        password,
      }),
    });
  }

  return (
    <div>
      <h1>
        <a href={'/api/v1/security/login-with-oauth?method=google'}>Login with Google</a>
      </h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="login" value={login} onChange={(e) => setLogin(e.target.value)} />
        <input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>login</button>
      </form>
    </div>
  );
};

export default Login;
