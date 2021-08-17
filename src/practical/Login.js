import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userIv, setUserIv] = useState('');
  const [userKey, setUserKey] = useState('');
  const [resAuth, setResAuth] = useState('');

  const handleSubmit = () => {
    axios
      .post('http://188.166.164.3:9595/paysure/api/auth/sys-login', {
        ux: userEmail,
        iv: userIv,
        key: userKey,
      })
      .then((response) => {
        setResAuth(response.data.Authorization);
        console.log(response.data.Authorization);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input
        type="text"
        value={userEmail}
        placeholder="ux"
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <input
        type="text"
        value={userIv}
        placeholder="iv"
        onChange={(e) => setUserIv(e.target.value)}
      />
      <input
        type="text"
        value={userKey}
        placeholder="key"
        onChange={(e) => setUserKey(e.target.value)}
      />
      <div>
        <p>Auth: "{resAuth}"</p>
      </div>
      <input type="submit" onClick={handleSubmit} />
    </div>
  );
}
