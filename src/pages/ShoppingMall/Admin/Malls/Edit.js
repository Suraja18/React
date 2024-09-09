import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { db, storage } from '../../config/firebase';
import AdminLayout from '../../../../components/ShoppingMall/Admin/Layout';
import { useForm } from 'react-hook-form';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import moment from 'moment';

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm();
    const [image, setImage] = useState(null);
    const [newImage, setNewImage] = useState(null);

    useEffect(() => {
        const viewData = (id) => {
            const mallDoc = doc(db, "malls", id);
            getDoc(mallDoc).then((doc) => {
                if (doc.exists()) {
                    setValue("name", doc.data().name);
                    setValue("location", doc.data().location);
                    setImage(doc.data().image);
                    setValue("openingHours", doc.data().opening_hours);
                } else {
                    Swal.fire('Error', `Malls doesn't exist`, 'error');
                    navigate(`/shopping-mall/admin/malls`,  { replace: true });
                }
            });
        }
        viewData(id);
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const uuid = require('uuid');
        const filename = `${Date.now()}${uuid.v4()}${file.name.replace(/^.*\./, '.')}`;
        setNewImage(() => ({ image: file, filename:filename }));
    };

    const updateData = (data) => {
        const mallDoc = doc(db, "malls", id);
        getDoc(mallDoc).then(async (doc) => {
            if (doc.exists()) {
                if(newImage)
                {
                    const oldImageRef = ref(storage, `${doc.data().image}`);
                    await deleteObject(oldImageRef);
            
                    const imageRef = ref(storage, `malls/${newImage.filename}`);
                    const uploadResult = await uploadBytes(imageRef, newImage.image);
                    const downloadURL = await getDownloadURL(uploadResult.ref);
                    const openingHours = moment(data.openingHours, 'HH:mm').format('hh:mm A'); 
                    const newData = {
                        name: data.name, location: data.location, opening_hours: openingHours, image: downloadURL
                    };
                    await updateDoc(mallDoc, newData);
                }else {
                    const openingHours = moment(data.openingHours, 'HH:mm').format('hh:mm A'); 
                    const newData = {
                        name: data.name, location: data.location, opening_hours: openingHours
                    };
                    await updateDoc(mallDoc, newData);
                }
                Swal.fire('Success', `Malls updated successfully`, 'success');
                navigate(`/shopping-mall/admin/malls`,  { replace: true });
                
            } else {
                Swal.fire('Error', `Malls doesn't exist`, 'error');
                navigate(`/shopping-mall/admin/malls`,  { replace: true });
            }
        });
    }
  return (
    <>
            <AdminLayout>
            <h3 className="text-3xl font-bold dark:text-white mb-6">Update Shopping Mall</h3>
                <form className="mx-auto" onSubmit={handleSubmit(updateData)}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            {...register("name")}
                            id="name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Name
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            {...register("location")}
                            id="location"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="location"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Location
                        </label>
                    </div>
                    
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" {...register("openingHours")} id="time" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                        <label htmlFor="time" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Select time:</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <figure className="max-w-lg">
                            <img className="h-auto max-w-full rounded-lg" src={image} alt="Shopping mall" />
                            <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">Image caption</figcaption>
                        </figure>
                        <input
                                type="file"
                                name="image" onChange={handleImageChange}
                                id="image"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Update
                    </button>
                </form>
            </AdminLayout>
    </>
  )
}

export default Edit