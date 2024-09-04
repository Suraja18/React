import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../../pages/ShoppingMall/config/firebase';
import { useNavigate } from 'react-router-dom';

const Layout = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setUser(user.email);
      } else {
        navigate('/login');
      }
    });
  }, [navigate]);
  return (
    <>
      <div>ADMIN INDEX PAGE</div>
      <div>Hello {user}</div>
      <button onClick={() => signOut(auth)}>Logout</button>
      {props.children}
    </>
  )
}

export default Layout