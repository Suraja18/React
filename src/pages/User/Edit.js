import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AllHeader from '../../components/AllHeader';

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const [successMessage, setSuccessMessage] = useState();

    useEffect(() => {
        const editData = async () => {
            try {
                const res = await axios.get(`http://localhost:7000/api/user/${id}`);
                setValue('name', res.data[0].name);
                setValue('address', res.data[0].address);
                setValue('phone', res.data[0].phone);
                setValue('email', res.data[0].email);
            } catch (error) {
                console.log(error);
            }
        }
        editData(); 
    }, [id, setValue]);

    const onSubmit = async (data) => {

        const res = axios.put(`http://localhost:7000/api/user/update/${id}`, data)
            .then(response => {
                setSuccessMessage(response.data);
            });

        if (!successMessage) {
            setSuccessMessage(res.data);
            setTimeout(() => {
                navigate('/user');
            }, 2000);
        } else {
            setSuccessMessage("Some Error Occured");
        }
    }


    return (
        <>
        <AllHeader />
            <div className='sql-body' id="form">
                <div className="form-container">
                    <h2>Update User Details</h2>
                    <p>{successMessage}</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" {...register("name", { required: true, pattern: /^[a-zA-Z0-9_\s]+$/i })} id="name" />
                        </div>
                        <span className='error-message'>{errors.name?.type === "required" && "Name is required"}</span>
                        <span className='error-message'>{errors.name?.type === "pattern" && "Name is in Wrong Format"}</span>
                        <div className="form-group">
                            <label htmlFor="address">Address:</label>
                            <input type="text" id="address" {...register("address", { required: true, pattern: /^[a-zA-Z0-9_\s]+$/i })} />
                        </div>
                        <span className='error-message'>{errors.address?.type === "required" && "Address is required"}</span>
                        <span className='error-message'>{errors.address?.type === "pattern" && "Address is in Wrong Format"}</span>
                        <div className="form-group">
                            <label htmlFor="phone">Phone:</label>
                            <input type="tel" id="phone" {...register("phone", { required: true, pattern: /^\d{10}$/i })} />
                        </div>
                        <span className='error-message'>{errors.phone?.type === "required" && "Phone Number is required"}</span>
                        <span className='error-message'>{errors.phone?.type === "pattern" && "Phone Number must 10 digits number"}</span>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i })} />
                        </div>
                        <span className='error-message'>{errors.email?.type === "required" && "Email is required"}</span>
                        <span className='error-message'>{errors.email?.type === "pattern" && "Email Address is in Wrong Format"}</span>
                        <button type="submit" className="submit-btn">Update</button>
                        <Link to="/user" className="btn add" style={{ padding: 10, marginLeft: 15, height: 16, textDecoration: 'none' }}>Back</Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Edit