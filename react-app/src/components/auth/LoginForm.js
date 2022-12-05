import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import "./LoginForm.css"
const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const validationErrors = [];
    if (!email.length) {
        validationErrors.push("Email is required ")
    // } else if (name.length > 50) {
    //     errors.push("Name should be less than 50 characters")
    // } else if (name.length < 3) {
    //     errors.push("Name should be more than 2 characters")
    // }

    // if (topic.length > 50) {
    //     errors.push("topic should be less than 50 characters")
    }
    setErrors(validationErrors);
}, [email])
  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };
  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    }
  };
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-container'>

      <form className='login-form'>
        <div className='errors'>
          {errors.map((error, ind) => (
            <div className='error' key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor='email'>Sign in with Email</label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button type='submit' className='login-button' onClick={onLogin}>Login</button>
        <button className='login-button' onClick={demoLogin}>Demo Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
