import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { db, storage } from '../../config/firebase';
import AdminLayout from '../../../../components/ShoppingMall/Admin/Layout';
import { useForm } from 'react-hook-form';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import moment from 'moment';
import Image from '../../../../components/ShoppingMall/Others/Image';

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm();
    const [formData, setFormData] = useState({
        images: [],
        imageURL: [],
    });

    useEffect(() => {
        const viewData = async () => {
            const mallDoc = doc(db, "malls", id);
            getDoc(mallDoc).then((doc) => {
                if (doc.exists()) {
                    setValue("name", doc.data().name);
                    setValue("location", doc.data().location);
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        imageURL: doc.data().images || [],
                        images: doc.data().images || [],
                    }));
                    setValue("openingHours", doc.data().opening_hours);
                } else {
                    Swal.fire('Error', `Malls doesn't exist`, 'error');
                    navigate(`/shopping-mall/admin/malls`, { replace: true });
                }
            });
        }
        viewData();
    }, [id, navigate, setValue]);

    const updateData = (data) => {
        const mallDoc = doc(db, "malls", id);
        try {
            getDoc(mallDoc).then(async (doc) => {
                if (doc.exists()) {
                    const openingHours = moment(data.openingHours, 'HH:mm').format('hh:mm A');
                    const existingImages = formData.images.filter(image => !image.file && !image.filename);
                    let updatedImages = [...existingImages];
                    const imagesToDelete = doc.data().images.filter(imageUrl => {
                        const existingImage = existingImages.find(existingImage => existingImage === imageUrl);
                        return !existingImage;
                    });
                    const newData = {
                        name: data.name, location: data.location, opening_hours: openingHours, images: updatedImages
                    };
                    for (const filename of imagesToDelete) {
                        const imageRef = ref(storage, filename);
                        await deleteObject(imageRef);
                    }

                    if (formData.images.length > 0) {
                        const validImages = formData.images.filter(image => image.file && image.filename);
                        const imageArrays = validImages.map((image) => {
                            const imageRef = ref(storage, `malls/${image.filename}`);
                            return uploadBytes(imageRef, image.file).then((uploadResult) => {
                                return getDownloadURL(uploadResult.ref);
                            });
                        });
                        const updatedNewImages = await Promise.all(imageArrays);
                        updatedImages = [...existingImages, ...updatedNewImages];
                        const newData = {
                            name: data.name, location: data.location, opening_hours: openingHours, images: updatedImages
                        };
                        await updateDoc(mallDoc, newData);
                    } else {
                        await updateDoc(mallDoc, newData);
                    }
                    Swal.fire('Success', `Malls updated successfully`, 'success');
                    navigate(`/shopping-mall/admin/malls`, { replace: true });

                } else {
                    Swal.fire('Error', `Malls doesn't exist`, 'error');
                    navigate(`/shopping-mall/admin/malls`, { replace: true });
                }
            });
        } catch (error) {
            console.error('Error updating mall data:', error);
            Swal.fire('Error', `Failed to update mall data`, 'error');
        }
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
                    <Image formData={formData} setFormData={setFormData} />
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