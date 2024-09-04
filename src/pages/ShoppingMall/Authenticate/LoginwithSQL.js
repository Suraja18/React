import React, { useEffect, useState } from 'react';
import './login.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from "bcryptjs-react";

function LoginwithSQL() {
    const navigate = useNavigate();
    const { register: registerRegister, formState: { errors: errorsRegister }, handleSubmit: handleSubmitRegister } = useForm();
    const { register: registerLogin, formState: { errors: errorsLogin }, handleSubmit: handleSubmitLogin } = useForm();
    const [successMessage, setSuccessMessage] = useState();
    const [height, setHeight] = useState(500);

    useEffect(() => {
        const errorCount = Object.keys(errorsRegister).length;
        setHeight(500 + errorCount * 28);
    }, [errorsRegister]);

    const onRegister = async (data) => {
        try {
            const allUser = await axios.get("http://localhost:7000/api/client/");
            const ifUserExist = allUser.data.map((client) => client.email);

            if (ifUserExist.includes(data.email)) {
                setSuccessMessage("Email already exists");
            } else {
                const hashedPassword = await bcrypt.hash(data.password, 10);
                data.password = hashedPassword;
                const res = await axios.post("http://localhost:7000/api/client/store", data);
                if (res.data.success) {
                    setSuccessMessage(res.data.message);
                    setTimeout(() => {
                        navigate('/test/login');
                    }, 2000);
                } else {
                    setSuccessMessage("Some Error Occured");
                }
            }
        } catch (error) {
            if (error.response) {
                setSuccessMessage(error.response.data.message);
            } else {
                setSuccessMessage("An error occurred. Please try again later.");
            }
        }
    };

    const onLogin = async (data) => {
        try {
            const res = await axios.post("http://localhost:7000/api/client/login", data);
            if (res.data.success) {
                setSuccessMessage(res.data.message);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setSuccessMessage(res.data.message);
            }
        } catch (error) {
            if (error.response) {
                setSuccessMessage(error.response.data.message);
            } else {
                setSuccessMessage("An error occurred. Please try again later.");
            }
        }
    };
    

    return (
        <div id='login'>
            <div className="main" style={{ height: `${height}px` }}>
                <input className='inputLogin' type="checkbox" id="chk" aria-hidden="true" />
                
                <div className="signup">
                    <form onSubmit={handleSubmitRegister(onRegister)}>
                        <label className='labelLogin' htmlFor="chk" aria-hidden="true">Sign up</label>
                        <input className='inputLogin'
                            type="text"
                            {...registerRegister("name", { required: true, pattern: /^[a-zA-Z0-9_\s]+$/i })}
                            placeholder="Full name"
                        />
                        {errorsRegister.name && (
                            <>
                                <span className='error-message center'>{errorsRegister.name.type === "required" && "Name is required"}</span>
                                <span className='error-message center'>{errorsRegister.name.type === "pattern" && "Name is in Wrong Format"}</span>
                            </>
                        )}

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
                            type="number"
                            {...registerRegister("phone", { required: true, pattern: /^\d{10}$/i })}
                            placeholder="Phone"
                        />
                        {errorsRegister.phone && (
                            <>
                                <span className='error-message center'>{errorsRegister.phone?.type === "required" && "Phone Number is required"}</span>
                                <span className='error-message center'>{errorsRegister.phone?.type === "pattern" && "Phone Number must 10 digits number"}</span>
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
                        <p className='error-message center'>{successMessage}</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginwithSQL