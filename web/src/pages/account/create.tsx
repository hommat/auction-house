import { NextPage } from 'next';
import { FormEvent, useState } from 'react';

const Create: NextPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    fetch('/api/v1/account/create', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login,
        password,
        email,
      }),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="login" value={login} onChange={(e) => setLogin(e.target.value)} />
      <input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button>create</button>
    </form>
  );
};

export default Create;
