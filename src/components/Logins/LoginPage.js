import React, { useState } from 'react';
import { Logo } from '../../Logo';
import { Notif } from '../Notif';

export const LoginPage = (props) => {
    const [useremail, setUseremail] = useState('');
    const [password, setPassword] = useState('');
  
    const onSubmitHandler = (event) => {
      event.preventDefault();
      props.loginHandler(useremail, password);
    }
  
    const onChangeUseremail = (event) => {
      setUseremail(event.target.value);
    }
  
    const onChangePassword = (event) => {
      setPassword(event.target.value);
    }
  
    return (
      <div id="login-page">
        <div id="login">
          <Logo />
          {props.notif.message && <Notif message={props.notif.message} style={props.notif.style} />}
          <form onSubmit={onSubmitHandler}>
            <label htmlFor="useremail">Email ID</label> 
            {/* Please use - Email: apurvatare05@gmail.com */}
            <input id="useremail" autoComplete="off" onChange={onChangeUseremail}  value={useremail} type="text" />
            <label htmlFor="password">Password</label>
            {/* Password: 123 */}
            <input id="password" autoComplete="off" onChange={onChangePassword} value={password} type="password" />
            <button type="submit"  className="btn">Login</button>
          </form>
        </div>
      </div>
    )
}