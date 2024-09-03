import React, { useState } from 'react';
import './User.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import AllHeader from '../../components/AllHeader';

function Add() {
    const navigate = useNavigate();
    const { register, formState:{errors}, handleSubmit} = useForm();
    const [successMessage, setSuccessMessage] = useState();

    const onSubmit = async(data) => {

        const res = axios.post("http://localhost:7000/api/user/store", data)
        .then(response => {
            setSuccessMessage(response.data);
        });

        if(!successMessage)
        {
            setSuccessMessage(res.data);
            setTimeout(()=>{
                navigate('/user');
            }, 2000);
        } else{
            setSuccessMessage("Some Error Occured");
        }
    }

    return (
        <>
        <AllHeader />
        <div className='sql-body' id="form">
            <div className="form-container">
                <h2>Add User Details</h2>
                <p>{successMessage}</p>
                <form onSubmit={ handleSubmit(onSubmit) }>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" {...register("name", {required:true, pattern: /^[a-zA-Z0-9_\s]+$/i})} id="name" />
                    </div>
                    <span className='error-message'>{ errors.name?.type==="required" && "Name is required" }</span>
                    <span className='error-message'>{ errors.name?.type==="pattern" && "Name is in Wrong Format" }</span>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" {...register("address", {required:true, pattern: /^[a-zA-Z0-9_\s]+$/i})} />
                    </div>
                    <span className='error-message'>{ errors.address?.type==="required" && "Address is required" }</span>
                    <span className='error-message'>{ errors.address?.type==="pattern" && "Address is in Wrong Format" }</span>
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input type="tel" id="phone" {...register("phone", {required:true, pattern: /^\d{10}$/i})} />
                    </div>
                    <span className='error-message'>{ errors.phone?.type==="required" && "Phone Number is required" }</span>
                    <span className='error-message'>{ errors.phone?.type==="pattern" && "Phone Number must 10 digits number" }</span>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" {...register("email", {required:true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i})} />
                    </div>
                    <span className='error-message'>{ errors.email?.type==="required" && "Email is required" }</span>
                    <span className='error-message'>{ errors.email?.type==="pattern" && "Email Address is in Wrong Format" }</span>
                    <button type="submit" className="submit-btn">Submit</button>
                    <Link to="/user" className="btn add" style={{ padding:10, marginLeft:15, height:16, textDecoration:'none' }}>Back</Link>
                </form>
            </div>
        </div>
        </>
    )
}

export default Add

// List of pattern
// 1. pattern: /^[a-zA-Z0-9_]+$/i for without symbol, without space, numbers and letters
// 2. pattern: /^[a-zA-Z0-9_\s]+$/i for without symbol, numbers and letters
// 3. pattern: /^\d{10}$/i for Phone Number
// 4. pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ for Email Address
