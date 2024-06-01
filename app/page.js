// "use client"
// import React, { useEffect, useState } from 'react';
// import Login_page from './login.js';
// import Table from './table.js';
// import Cookies from 'js-cookie';

// function Home() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const loggedInStatus = Cookies.get('is_logged_in');

//     if (loggedInStatus === 'Yes') {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const handleLogin = () => {
//     Cookies.set('is_logged_in', 'Yes');
//     setIsLoggedIn(true);
//   };

//   return (
//     <div>
//       {isLoggedIn ? (
//         <div>
//           <Table />
//         </div>
//       ) : (
//         <Login_page onLogin={handleLogin} />
//       )}
//     </div>
//   );
// }

// export default Home;




"use client";
import React, { useEffect, useState } from 'react';
import Login_page from './login.js';
import Table from './table.js';
import Cookies from 'js-cookie';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = Cookies.get('is_logged_in');
    if (loggedInStatus === 'Yes') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    Cookies.set('is_logged_in', 'Yes');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    Cookies.remove('is_logged_in');
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Table onLogout={handleLogout} />
        </div>
      ) : (
        <Login_page onLogin={handleLogin} />
      )}
    </div>
  );
}

export default Home;
