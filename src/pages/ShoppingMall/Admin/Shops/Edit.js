import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../../components/ShoppingMall/Admin/Layout';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../config/firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';
import Image from '../../../../components/ShoppingMall/Others/Image';

const Edit = () => {
    const [malls, setMalls] = useState([]);
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        openingHours: '',
        images: [],
        mall_id:'',
        mall_name:'',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const mallsCollectionRef = collection(db, "malls");
        const getMalls = async () => {
            const data = await getDocs(mallsCollectionRef);
            setMalls(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
    
        const viewData = async (id) => {
            try {
                const shopDocRef = doc(db, "shops", id);
                const shopDoc = await getDoc(shopDocRef);
                if (shopDoc.exists()) {
                    const data = shopDoc.data();
                    const openingHours = moment(data.opening_hours, 'hh:mm A').format('HH:mm'); 
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        name: data.name,
                        contact: data.contact,
                        openingHours: openingHours,
                        images: data.images,
                        mall_id: data.mall_id,
                    }));
                    
                    const mallDocRef = doc(db, "malls", data.mall_id);
                    const mallDoc = await getDoc(mallDocRef);
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        mall_name: mallDoc.data().name,
                    }));
                } else {
                    Swal.fire('Error', `Shops doesn't exist`, 'error');
                    navigate(`/shopping-mall/admin/shops`, { replace: true });
                }
            } catch (error) {
                console.error("Error fetching document:", error);
            }
        };
    
        viewData(id);
        getMalls();
    }, [id, navigate]);
    
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const shopDoc = doc(db, "shops", id);
        try{
            getDoc(shopDoc).then(async (doc) => {
                if (doc.exists()) {
                    const openingHours = moment(formData.openingHours, 'HH:mm').format('hh:mm A');
                    const existingImages = formData.images.filter(image => !image.file && !image.filename);
                    let updatedImages = [...existingImages];
                    const imagesToDelete = doc.data().images.filter(imageUrl => {
                        const existingImage = existingImages.find(existingImage => existingImage === imageUrl);
                        return !existingImage;
                    });
                    const newData = {
                        name: formData.name, contact: formData.contact, opening_hours: openingHours, images: updatedImages, mall_id: formData.mall_id
                    };
                    for (const filename of imagesToDelete) {
                        const imageRef = ref(storage, filename);
                        await deleteObject(imageRef);
                    }
                    if (formData.images.length > 0) {
                        const validImages = formData.images.filter(image => image.file && image.filename);
                        const imageArrays = validImages.map((image) => {
                            const imageRef = ref(storage, `shops/${image.filename}`);
                            return uploadBytes(imageRef, image.file).then((uploadResult) => {
                                return getDownloadURL(uploadResult.ref);
                            });
                        });
                        const updatedNewImages = await Promise.all(imageArrays);
                        updatedImages = [...existingImages, ...updatedNewImages];
                        const newData = {
                            name: formData.name, contact: formData.contact, opening_hours: openingHours, images: updatedImages, mall_id: formData.mall_id
                        };
                        await updateDoc(shopDoc, newData);
                    } else {
                        await updateDoc(shopDoc, newData);
                    }
                    Swal.fire('Success', `Shops updated successfully`, 'success');
                    navigate(`/shopping-mall/admin/shops`,  { replace: true });
                    
                } else {
                    Swal.fire('Error', `Shops doesn't exist`, 'error');
                    navigate(`/shopping-mall/admin/shops`,  { replace: true });
                }
            });
        }catch(error){
            console.error("Error updating document:", error);
            Swal.fire('Error', `Failed to update shop data`, 'error');
        }
        
    };

    return (
        <>
            <AdminLayout>
                <h3 className="text-3xl font-bold dark:text-white mb-6">Edit Shops Detail</h3>
                <form className="mx-auto" onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            value={formData.name}
                            onChange={handleChange}
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
                            type="number"
                            name="contact"
                            id="contact"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            value={formData.contact}
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="contact"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Contact
                        </label>
                    </div>
                    
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="time" name='openingHours' placeholder='time' id="time" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={formData.openingHours} onChange={handleChange} required />
                        <label htmlFor="time" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Opening Hours:</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                    <select id="malls" name='mall_id' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={formData.mall_id} onChange={handleChange} required>
                        <option>{formData.mall_name}</option>
                        {malls.map((mall, index) => (
                                <option key={index} value={mall.id}>{mall.name}</option>
                            )
                        )}
                    </select>
                        <label htmlFor="malls" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Shopping Malls:</label>
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
    );
}

export default Edit