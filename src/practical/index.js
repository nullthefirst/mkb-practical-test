import React from 'react';
import Reset from './Reset';
import Login from './Login';
import CreateProfile from './CreateProfile';
import OtpValidation from './OtpValidation';

export default function Practical() {
  return (
    <div>
      <Reset />
      <hr />
      <Login />
      <hr />
      <CreateProfile />
      <hr />
      <OtpValidation />
    </div>
  );
}
