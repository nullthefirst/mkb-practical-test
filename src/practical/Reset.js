import React, { useState } from 'react';
import axios from 'axios';

// import { baseUrl } from './constants';

export default function Reset() {
  // const [hasLoaded, setHasLoaded] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [resDescription, setDescription] = useState('');
  const [resKey, setKey] = useState('');
  const [resIv, setIv] = useState('');

  const handleSubmit = () => {
    axios
      .post('http://188.166.164.3:9595/paysure/api/auth/reset', {
        ux: userEmail,
      })
      .then((response) => {
        const responseData = response.data;
        setDescription(responseData.responseDesc);
        setKey(responseData.key);
        setIv(responseData.iv);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input
        type="text"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <div>
        <p>Description: "{resDescription}"</p>
        <p>Key: "{resKey}"</p>
        <p>IV: "{resIv}"</p>
      </div>
      <input type="submit" onClick={handleSubmit} />
    </div>
  );
}
