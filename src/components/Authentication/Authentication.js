import React, {useState} from 'react';
import { Dashboard } from '../Dashboard';
import { LoginPage } from '../Logins/LoginPage';

export const Authenticate = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notif, setNotif] = useState({message: '', style: ''});
    const [users, setUsers] = useState();
   

    const  isLoginSuccess = async (email, password) => {
      let isFound = false;
      let loginDetails = {
          UserEmail: email,
          Password: password,
      }
      
      let loginUrl = `http://localhost:8090/api/Login?user_email=${encodeURIComponent(loginDetails.UserEmail)}&user_password=${encodeURIComponent(loginDetails.Password)}`
      console.log(loginUrl);
      const clients = await fetch (loginUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if(data.length > 0){
          setUsers(data);
          setNotif('Login Successful');
          isFound = true;
        }
      });
      if(!isFound) setNotif({message: 'Wrong username and password.', style: 'danger'});
      return isFound;
    }
  
    const login = async (username, password) => {
        if(await isLoginSuccess(username, password)) {
            setIsLoggedIn(true);
        }
    }

    const logout = () => {
        setIsLoggedIn(false);
        setNotif({message: 'You have logged out.', style: 'success'});
    }
  
    if(isLoggedIn) {
        return <Dashboard users={users} logoutHandler={logout} />
    } 
    else {
      
      return <LoginPage loginHandler={login} notif={notif} isLoggedIn={isLoggedIn} />
      }
}
