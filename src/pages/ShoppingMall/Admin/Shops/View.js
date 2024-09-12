import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { db } from '../../config/firebase';
import AdminLayout from '../../../../components/ShoppingMall/Admin/Layout';
import { useForm } from 'react-hook-form';
import UseText from '../../../../components/ShoppingMall/Admin/Form/UseText';
import ImagesView from '../../../../components/ShoppingMall/Admin/Form/ImagesView';

const View = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, setValue, watch } = useForm();
    const [images, setImages] = useState([]);

    useEffect(() => {
        const viewData = async (id) => {
            try {
                const shopDocRef = doc(db, "shops", id);
                const shopDoc = await getDoc(shopDocRef);
                if (shopDoc.exists()) {
                    const data = shopDoc.data();
                    setValue("name", data.name);
                    setValue("contact", data.contact);
                    setImages(data.images);
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
                    <UseText
                        type="text"
                        Name="Name"
                        value={watch("name")}
                        readOnly
                    />
                    <UseText
                        type="text"
                        Name="Contact"
                        value={watch("contact")}
                        readOnly
                    />

                    <UseText
                        type="text"
                        Name="Opening Hours"
                        value={watch("openingHours")}
                        readOnly
                    />

                    <UseText
                        type="text"
                        Name="Shopping Malls"
                        value={watch("mallsName")}
                        readOnly
                    />

                    <ImagesView images={images} />

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