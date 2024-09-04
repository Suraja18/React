import React, { useEffect } from 'react';
import './login.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import Swal from 'sweetalert2';

function Login() {
    const navigate = useNavigate();
    const { register: registerRegister, formState: { errors: errorsRegister }, handleSubmit: handleSubmitRegister } = useForm();
    const { register: registerLogin, formState: { errors: errorsLogin }, handleSubmit: handleSubmitLogin } = useForm();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/shopping-mall/admin/dashboard');
            }
        })
    }, [navigate]);

    const onRegister = async (data) => {
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password)
                .then(() => {
                    Swal.fire('Success!', 'User Successfully Registered', 'success');
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
                });
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                Swal.fire('Error', 'Email address is already in use.', 'error');
            } else {
                Swal.fire('Error', 'An error occurred. Please try again later.', 'error');
            }
        }
    };

    const onLogin = async (data) => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
                .then(() => {
                    Swal.fire('Success!', 'Login Successful', 'success');
                    setTimeout(() => {
                        navigate('/shopping-mall/admin/dashboard');
                    }, 3000);
                });
        } catch (error) {
            if (error.code === 'auth/invalid-credential') {
                Swal.fire('Error', `Email address and password don't match.`, 'error');
            } else {
                Swal.fire('Error', 'An error occurred. Please try again later.', 'error');
            }
        }
    };

    const SignInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
                .then(() => {
                    Swal.fire('Success!', 'Login Successful', 'success');
                    setTimeout(() => {
                        navigate('/shopping-mall/admin/dashboard');
                    }, 3000);
                });
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div id='login'>
            <div className="main">
                <input className='inputLogin' type="checkbox" id="chk" aria-hidden="true" />

                <div className="signup">
                    <form onSubmit={handleSubmitRegister(onRegister)}>
                        <label className='labelLogin' htmlFor="chk" aria-hidden="true">Sign up</label>

                        <input className='inputLogin'
                            type="email"
                            {...registerRegister("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i })}
                            placeholder="Email"
                        />
                        {errorsRegister.email && (
                            <>
                                <span className='error-message center'>{errorsRegister.email?.type === "required" && "Email is required"}</span>
                                <span className='error-message center'>{errorsRegister.email?.type === "pattern" && "Email Address is in Wrong Format"}</span>
                            </>
                        )}
                        <input className='inputLogin'
                            type="password"
                            {...registerRegister("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })}
                            placeholder="Password"
                        />
                        {errorsRegister.password && (
                            <>
                                <span className='error-message center'>{errorsRegister.password?.type === "required" && "Password is required"}</span>
                                <span className='error-message center'>{errorsRegister.password?.type === "pattern" && "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character"}</span>
                            </>
                        )}
                        <button className='loginButton'>Sign up</button>
                    </form>
                </div>

                <div className="login">
                    <form onSubmit={handleSubmitLogin(onLogin)}>
                        <label className='labelLogin' htmlFor="chk" aria-hidden="true">Login</label>
                        <input className='inputLogin'
                            type="email"
                            {...registerLogin("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i })}
                            placeholder="Email"
                        />
                        {errorsLogin.email && (
                            <>
                                <span className='error-message center'>{errorsLogin.email.type === "required" && "Email is required"}</span>
                                <span className='error-message center'>{errorsLogin.email.type === "pattern" && "Email Address is in Wrong Format"}</span>
                            </>
                        )}
                        <input className='inputLogin'
                            type="password"
                            {...registerLogin("password", { required: true })}
                            placeholder="Password"
                        />
                        {errorsLogin.password && (
                            <>
                                <span className='error-message center'>{errorsLogin.password.type === "required" && "Password is required"}</span>
                            </>
                        )}
                        <button className='loginButton'>Login</button>
                        <div onClick={SignInWithGoogle} className="google-sign-in-link">
                            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Logo" />
                            Login with Google
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login