import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { stringify } from 'flatted';

export default function CreateProfile() {
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [authHeader, setAuthHeader] = useState('');
  const [authKey, setAuthKey] = useState('');
  const [authIv, setAuthIv] = useState('');
  const [responseData, setResponseData] = useState('');

  const handleSubmit = async () => {
    const message = await stringify({
      emailAddress: userEmail,
      phonePri: userPhone,
    });

    const encrypted = await CryptoJS.AES.encrypt(message, authKey, {
      iv: authIv,
    });
    console.log(encrypted.toString());

    axios
      .post(
        'http://188.166.164.3:9595/paysure/api/processor/create-profile',
        encrypted.toString(),
        {
          headers: {
            Authorization: authHeader,
          },
        },
      )
      .then((response) => {
        setResponseData(stringify(response.data));
      })
      .catch((err) => console.error('error' + stringify(err)));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="emailAddress"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="phonePri"
        value={userPhone}
        onChange={(e) => setUserPhone(e.target.value)}
      />
      <input
        type="text"
        placeholder="authHeader"
        value={authHeader}
        onChange={(e) => setAuthHeader(e.target.value)}
      />
      <input
        type="text"
        placeholder="authKey"
        value={authKey}
        onChange={(e) => setAuthKey(e.target.value)}
      />
      <input
        type="text"
        placeholder="authIv"
        value={authIv}
        onChange={(e) => setAuthIv(e.target.value)}
      />
      <div>
        <p>responseData: [{responseData}]</p>
      </div>
      <input type="submit" onClick={handleSubmit} />
    </div>
  );
}
