import React, { useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [allowSubmit, setAllowSubmit]= useState(false)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  useEffect(() => {
      const validationErrors = [];
      const validEmail= email.indexOf("@")
      // console.log("VALID EMAIL????", validEmail)
      if (email.length && (validEmail===-1 || validEmail === email.length-1)) {
          validationErrors.push("Valid Email is required ")
          setAllowSubmit(false)
      } else if (email.length && validEmail !== -1 && validEmail< email.length-1){
        setAllowSubmit(true)
      }
      setErrors(validationErrors);
  }, [email])
  const onSignUp = async (e) => {

    e.preventDefault();
    if (password!== repeatPassword){
      setErrors(["Passwords must match"])
    }
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
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

  return (
    <form onSubmit={onSignUp}>
      <div className='errors'>
        {errors.map((error, ind) => (
          <div className='error' key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
        ></input>
      </div>
      {allowSubmit &&
      <button  type='submit'>Sign Up</button>
      }
       {!allowSubmit &&
      <div >Please enter a valid email</div>
      }
    </form>
  );
};

export default SignUpForm;
