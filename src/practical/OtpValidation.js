import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

export default function OtpValidation() {
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [pin, setPin] = useState('');
  const [verifyPin, setVerifyPin] = useState('');
  const [authHeader, setAuthHeader] = useState('');
  const [authKey, setAuthKey] = useState('');
  const [authIv, setAuthIv] = useState('');
  const [responseData, setResponseData] = useState('');

  const handleSubmit = async () => {
    const message = await JSON.stringify({
      userName: username,
      otp: otp,
      password: password,
      verifyPassword: verifyPassword,
      pin: pin,
      verifyPin: verifyPin,
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
        'http://188.166.164.3:9595/paysure/api/processor/votp',
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
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="otp"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="verifyPassword"
        value={verifyPassword}
        onChange={(e) => setVerifyPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="pin"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />
      <input
        type="text"
        placeholder="verifyPin"
        value={verifyPin}
        onChange={(e) => setVerifyPin(e.target.value)}
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
