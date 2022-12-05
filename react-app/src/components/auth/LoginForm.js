import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import "./LoginForm.css"
const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const validationErrors = [];
    //was going to add front end validations, but for now this simply clears them when resuming typing
    // if (!email.length) {
    //     validationErrors.push("Email is required ")
    // } else if (name.length > 50) {
    //     errors.push("Name should be less than 50 characters")
    // } else if (name.length < 3) {
    //     errors.push("Name should be more than 2 characters")
    // }

    // if (topic.length > 50) {
    //     errors.push("topic should be less than 50 characters")
    // }
    setErrors(validationErrors);
  }, [email, password])
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
  function cancel() {
    history.push('/')
  }
  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-form-page'>
      <div className='login-container'>
        <form className='login-form'>
          <div className='owned-title' style={{ "margin-bottom": "10px", }}>Log in to Storm</div>
          <div className='errors'>
            {errors.map((error, ind) => (
              <div className='error' key={ind}>{error}</div>
            ))}
          </div>
          <div>
            {/* <label htmlFor='email'>Sign in with Email</label> */}
            <input
              className="input-field"
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            {/* <label htmlFor='password'>Password</label> */}
            <input
              className="input-field"
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div type='submit' className='login-button' onClick={onLogin}>Login</div>
          <div className='login-button' onClick={demoLogin}>Demo Login</div>
          <div className='login-button' onClick={cancel}>Cancel</div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
