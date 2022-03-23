import { useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Classes from './Login.module.css';
import { performLogin } from '../../helper';

const actionTypes = {
    EMAIL_CHANGED: 'EMAIL_CHANGED',
    PASSWORD_CHANGED: 'PASSWORD_CHANGED',
    SUBMIT_FORM: 'SUBMIT_FORM'
};

const reducerFn = (state, action) => {
    if (action.type === actionTypes.EMAIL_CHANGED) {
        const isEmailValid = action.value.length > 5 && action.value.includes('@');
        return {
            ...state,
            email:{
                value: action.value,
                dirty: true,
                valid: isEmailValid 
            },
            valid: isEmailValid && state.password.valid
        }
    }
    else if(action.type === actionTypes.PASSWORD_CHANGED) {
        const isPasswordValid = action.value.length > 6;
        return {
            ...state,
            password:{
                value: action.value,
                dirty: true,
                valid: isPasswordValid 
            },
            valid: isPasswordValid && state.password.valid
        } 
    }
    else if(action.type === actionTypes.SUBMIT_FORM) {
        return {...state, submitForm: state.valid};
    }
}

const Login  = () => {
    
    const initialFormState = {
        email:{
            value: '',
            valid: false,
            dirty: false
        },
        password:{
            value: '',
            valid: false,
            dirty: false
        },
        valid: false,
        submitForm: false
    }

    const [state, dispatcherFn] = useReducer(reducerFn, initialFormState);
    const history = useHistory();

    const canSubmitForm = state.submitForm;
    const emailValue = state.email.value;
    const passwordValue = state.password.value;

    async function submitListener(e) {
        e.preventDefault();
        if(state.valid) {
            console.log(state);
            const isLogin = await performLogin(emailValue, passwordValue);
            if(isLogin) {
                history.push("/home");
            }
        }
    }

    const emailChangeHandler = (e) => {
        if(e.target.value !== '') {
            dispatcherFn({type: actionTypes.EMAIL_CHANGED, value: e.target.value});
        }
    }

    const passwordChangedHandler = (e) => {
        if(e.target.value !== ''){
            dispatcherFn({type: actionTypes.PASSWORD_CHANGED, value: e.target.value});
        }
    }

    return (
        <>
        <form>
            <div className={Classes.loginContainer}>
                <div className={ Classes.loginBox }>
                    <div className={Classes.formGroup}>
                        <input placeholder="Email" type='text'   value={state.email.value} onChange={emailChangeHandler}/>
                    </div>
                    <div className={Classes.formGroup}>
                        <input placeholder="Password" type='password' id='user_password' value={state.password.value} onChange={passwordChangedHandler} />
                    </div>
                    <div className={Classes.formGroup}>
                        <button type='submit' onClick={submitListener}>Login</button>
                    </div>
                </div>
            </div>
          </form>  
        </>
    );
}

export default Login;