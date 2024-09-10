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
        const viewData = (id) => {
            const mallDoc = doc(db, "malls", id);
            getDoc(mallDoc).then((doc) => {
                if (doc.exists()) {
                    setValue("name", doc.data().name);
                    setValue("location", doc.data().location);
                    setImage(doc.data().images);
                    setValue("openingHours", doc.data().opening_hours);
                } else {
                    Swal.fire('Error', `Malls doesn't exist`, 'error');
                    navigate(`/shopping-mall/admin/malls`, { replace: true });
                }
            });
        }
        viewData(id);
    });

    const backToTable = () => {
        navigate(`/shopping-mall/admin/malls`, { replace: true });
    }
    return (
        <>
            <AdminLayout>
                <h3 className="text-3xl font-bold dark:text-white mb-6">View Shopping Mall</h3>
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
                            {...register("location")}
                            id="location"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            readOnly
                        />
                        <label
                            htmlFor="location"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Location
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" {...register("openingHours")} id="time" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" readOnly />
                        <label htmlFor="time" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Select time:</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group flex flex-wrap">
                        {image && image.map((img, index) => (
                            <figure key={index} className="max-w-lg">
                                <img className="h-auto max-w-full rounded-lg" src={img} alt=" description" />
                                <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">Image {index + 1}</figcaption>
                            </figure>
                        ))}
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