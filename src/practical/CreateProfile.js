import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

export default function CreateProfile() {
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [authHeader, setAuthHeader] = useState('');
  const [authKey, setAuthKey] = useState('');
  const [authIv, setAuthIv] = useState('');
  const [responseData, setResponseData] = useState('');

  const handleSubmit = async () => {
    const message = await JSON.stringify({
      emailAddress: userEmail,
      phonePri: userPhone,
    });

    const encrypted = await CryptoJS.AES.encrypt(message, authKey, {
      iv: authIv,
    });
    console.log((await encrypted).toString(CryptoJS.format.Hex));

    const decrypted = CryptoJS.AES.decrypt(encrypted, authKey, {
      iv: authIv,
    });
    console.log(decrypted.toString(CryptoJS.enc.Utf8));

    axios
      .post(
        'http://188.166.164.3:9595/paysure/api/processor/create-profile',
        (await encrypted).toString(CryptoJS.format.Hex),
        {
          headers: {
            Authorization: authHeader,
          },
        },
      )
      .then((response) => {
        setResponseData(JSON.stringify(response.data));
      })
      .catch((err) => console.error(JSON.stringify(err)));
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
      <br />
      <br />
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
        <p>responseData: {responseData}</p>
      </div>
      <input type="submit" onClick={handleSubmit} />
    </div>
  );
}
