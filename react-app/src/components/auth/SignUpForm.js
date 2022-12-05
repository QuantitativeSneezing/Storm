import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [allowSubmit, setAllowSubmit] = useState(false)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const validationErrors = [];
    const validEmail = email.indexOf("@")
    // console.log("VALID EMAIL????", validEmail)
    if ((validEmail === -1 || validEmail === email.length - 1)) {
      validationErrors.push("Valid Email is required ")
      setAllowSubmit(false)
    } else if (email.length && validEmail !== -1 && validEmail < email.length - 1) {
      setAllowSubmit(true)
    }
    if (password.length < 4 || (!password && repeatPassword.length < 4)) {
      validationErrors.push("Passwords must be at least 4 characters")
      setAllowSubmit(false)
    } else if (password.length>3 && repeatPassword.length >3){
      setAllowSubmit(true)
    }
    setErrors(validationErrors);
  }, [email, password])
  const onSignUp = async (e) => {

    e.preventDefault();
    if (password !== repeatPassword) {
      setErrors(["Passwords must match"])
    }
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        console.log("error data :", data)
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }
  function cancel() {
    history.push('/')
  }
  return (
    <div className='login-form-page'>
      <div className='login-container'>

        <form className='login-form' onSubmit={onSignUp}>
          <div className='owned-title' style={{ "margin-bottom": "10px", }}>Sign up to Storm</div>
          <div className='errors'>
            {errors.map((error, ind) => (
              <div className='error' key={ind}>{error}</div>
            ))}
          </div>
          <div>
            {/* <label>User Name</label> */}
            <input
              className='input-field'
              placeholder='Username'
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            {/* <label>Email</label> */}
            <input
              className='input-field'
              placeholder='Email'
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            {/* <label>Password</label> */}
            <input
              className='input-field'

              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              placeholder="Password"
            ></input>
          </div>
          <div style={{ "margin-bottom": "20px" }}>
            {/* <label>Repeat Password</label> */}
            <input
              className='input-field'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              placeholder="Repeat Password"
            ></input>
          </div>
          {allowSubmit &&
            <div className='login-button' onClick={onSignUp}>Sign Up</div>
          }
          {!allowSubmit &&
            <div className='login-button-disabled'>Please check your errors</div>
          }
          <div className='login-button' onClick={cancel}>Cancel</div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
