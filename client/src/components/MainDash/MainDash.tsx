import * as React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { MainDashProps } from './MainDash.types';

export const MainDash: React.FC<MainDashProps> = ({ setUserAuthed }) => {
  const onLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setUserAuthed(false);
      return <Redirect to='/' />;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      Main!!!!!!!<span onClick={onLogout}>Logout</span>
    </div>
  );
};
