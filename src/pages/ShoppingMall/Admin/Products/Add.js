import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../../components/ShoppingMall/Admin/Layout';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db, storage } from '../../config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Add = () => {
    const [shops, setShops] = useState([]);
    const shopsCollectionRef = collection(db, "shops");
    const [formData, setFormData] = useState({
        name: '',
        unit: '',
        price: '',
        type: '',
        description: '',
        image: null,
        shop_id:'',
    });
    const productsCollectionRef = collection(db, "products");
    const navigate = useNavigate();

    useEffect(()=>{
        const getShops = async () => {
            const data = await getDocs(shopsCollectionRef);
            setShops(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getShops();
    }, [shopsCollectionRef]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const uuid = require('uuid');
        const filename = `${Date.now()}${uuid.v4()}${file.name.replace(/^.*\./, '.')}`;
        setFormData((prevFormData) => ({ ...prevFormData, image: file, filename }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const imageRef = ref(storage, `products/${formData.filename}`);
        const uploadResult = await uploadBytes(imageRef, formData.image);
        const downloadURL = await getDownloadURL(uploadResult.ref);
        await addDoc(productsCollectionRef, {name: formData.name, unit: formData.unit, price: Number(formData.price), type: formData.type, description: formData.description, image: downloadURL, shop_id:formData.shop_id});
        Swal.fire('Success!', 'products Successfully Added', 'success');
        navigate('/shopping-mall/admin/products', { replace: true });
    };

    return (
        <>
            <AdminLayout>
                <h3 className="text-3xl font-bold dark:text-white mb-6">Add products</h3>
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
                            name="price"
                            id="price"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            value={formData.price}
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="price"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Price
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name='unit' placeholder=' ' id="unit" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={formData.unit} onChange={handleChange} required />
                        <label htmlFor="unit" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Unit</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name='type' placeholder=' ' id="type" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={formData.type} onChange={handleChange} required />
                        <label htmlFor="type" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Type</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                    <select id="shops" name='shop_id' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={formData.shop_id} onChange={handleChange} required>
                        <option>Choose a shops</option>
                        {shops.map((shop, index) => (
                                <option key={index} value={shop.id}>{shop.name}</option>
                            )
                        )}
                    </select>
                        <label htmlFor="shops" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Shopping shops:</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="file"
                                name="image"
                                id="image"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                onChange={handleImageChange}
                            />
                            <label
                                htmlFor="image"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Image
                            </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">  
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "></textarea>
                        <label for="description" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </form>
            </AdminLayout>
        </>
    );
}

export default Add