import React, { useState, useEffect,useReducer ,useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer=(state,action)=>{
  if(action.type==='USER_INPUT'){
    return {value: action.val, isValid: action.val.includes('@')};
  }
  if(action.type==='INPUT-BLUR'){
    return {value: state.value, isValid : state.value.includes('@')};
  }
  return {value: '',isValid: false}
};

const passwordReducer=(state,action)=>{
  if(action.type==='USER_PASS'){
    return {value: action.val, isValid: action.val.trim()>6};
  }
  if(action.type==='PASS-BLUR'){
    return {value: state.value, isValid : state.value.trim()>6};
  }
  return {value: '',isValid: false}
}
const Login = (props) => {
 // const [enteredEmail, setEnteredEmail] = useState('');
 // const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState('');
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState,dispatchEmail]=useReducer(emailReducer,{
    value:'',
    isValid:false
  });

  const [passwordState,dispatchPassword]=useReducer(passwordReducer,{
    value:'',
    isValid:false
  })

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  const authCtx=useContext(AuthContext);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type : 'USER_INPUT', val : event.target.value})

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid
    )
    
};

  const passwordChangeHandler = (event) => {
    dispatchPassword({type : 'USER_PASS', val : event.target.value})

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT-BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'PASS-BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <Input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
