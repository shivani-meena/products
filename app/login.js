"use client";
import { useState } from 'react';
import Cookies from 'js-cookie'; 

function Login_page({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = () => {
    if (username === 'dummyuser' && password === 'password') {
      Cookies.set('is_logged_in', "Yes");
      onLogin(); 
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className='form-container'>
      <h2 className="log-in">Login</h2>
      <div>
        <label className='label'>Username</label>
        <input
          type="text"
          id="user-name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
      </div>
      <div>
        <label className='label'>Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>
      <button type="button" className="submit-button" onClick={handleLoginClick}>
        Login
      </button>
    </div>
  );
}

export default Login_page;






























// 'use client';
// import React, { useState, useEffect } from 'react';

// function Login_page() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isDarkTheme, setIsDarkTheme] = useState(false);

//   useEffect(() => {
//     document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
//   }, [isDarkTheme]);

//   const toggleTheme = () => {
//     setIsDarkTheme(!isDarkTheme);
//   };

//   return (
//     <div className='form-container'>
//       <button onClick={toggleTheme} className="theme-toggle-button">
//         {isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
//       </button>
//       <h2 className="log-in">Login</h2>
//       <div>
//         <label className='label'>Username</label>
//         <input
//           type="text"
//           id="user-name"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Enter username"
//         />
//       </div>
//       <div>
//         <label className='label'>Password</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Enter password"
//         />
//       </div>
//       <button type="submit" className="submit-button">
//         Login
//       </button>
//     </div>
//   );
// }

// export default Login_page;
