import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { db } from '../../config/firebase';
import AdminLayout from '../../../../components/ShoppingMall/Admin/Layout';
import { useForm } from 'react-hook-form';

const View = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, setValue } = useForm();
    const [image, setImage] = useState(null);

    useEffect(() => {
        const viewData = async (id) => {
            try {
                const shopDocRef = doc(db, "shops", id);
                const shopDoc = await getDoc(shopDocRef);
                if (shopDoc.exists()) {
                    const data = shopDoc.data();
                    setValue("name", data.name);
                    setValue("contact", data.contact);
                    setImage(data.image);
                    setValue("openingHours", data.opening_hours);

                    const mallDocRef = doc(db, "malls", data.mall_id);
                    const mallDoc = await getDoc(mallDocRef);
                    setValue("mallsName", mallDoc.data().name);
                } else {
                    Swal.fire('Error', `Shops doesn't exist`, 'error');
                    navigate(`/shopping-mall/admin/shops`, { replace: true });
                }
            } catch (error) {
                console.error("Error fetching document:", error);
            }
        };
        viewData(id);
    }, [id, navigate, setValue]);


    const backToTable = () => {
        navigate(`/shopping-mall/admin/shops`, { replace: true });
    }
    return (
        <>
            <AdminLayout>
                <h3 className="text-3xl font-bold dark:text-white mb-6">View Shop Details</h3>
                <form className="mx-auto" onSubmit={backToTable}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            {...register("name")}
                            id="name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            readOnly
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
                            {...register("contact")}
                            id="contact"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            readOnly
                        />
                        <label
                            htmlFor="contact"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Contact
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" {...register("openingHours")} id="time" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" readOnly />
                        <label htmlFor="time" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Opening Hours:</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" {...register("mallsName")} id="mallsName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" readOnly />
                        <label htmlFor="mallsName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Shopping Malls:</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <figure className="max-w-lg">
                            <img className="h-auto max-w-full rounded-lg" src={image} alt=" description" />
                            <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">Image caption</figcaption>
                        </figure>
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Back to Table
                    </button>
                </form>
            </AdminLayout>
        </>
    )
}

export default View