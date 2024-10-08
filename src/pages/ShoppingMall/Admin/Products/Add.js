import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../../components/ShoppingMall/Admin/Layout';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db, storage } from '../../config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Image from '../../../../components/ShoppingMall/Others/Image';

const Add = () => {
    const [shops, setShops] = useState([]);
    const shopsCollectionRef = collection(db, "shops");
    const [formList, setFormList] = useState([{
        name: '',
        unit: '',
        price: '',
        type: '',
        description: '',
        images: [],
        shop_id: '',
    }]);
    const productsCollectionRef = collection(db, "products");
    const navigate = useNavigate();

    useEffect(() => {
        const getShops = async () => {
            const data = await getDocs(shopsCollectionRef);
            setShops(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getShops();
    }, [shopsCollectionRef]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedFormList = [...formList];
        updatedFormList[index][name] = value;
        setFormList(updatedFormList);
    };

    const handleAddForm = () => {
        setFormList([...formList, { name: '', contact: '', openingHours: '', images: [], mall_id: '' }]);
    };

    const handleRemoveForm = (index) => {
        const updatedFormList = [...formList];
        updatedFormList.splice(index, 1);
        setFormList(updatedFormList);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const uploadAllForm = formList.map(async (formData) => {
                const imageArrays = formData.images.map((image) => {
                    const imageRef = ref(storage, `products/${image.filename}`);
                    return uploadBytes(imageRef, image.file).then((uploadResult) => {
                        return getDownloadURL(uploadResult.ref);
                    });
                });
                const downloadUrls = await Promise.all(imageArrays); 
                return addDoc(productsCollectionRef, { name: formData.name, unit: formData.unit, price: Number(formData.price), type: formData.type, description: formData.description, images: downloadUrls, shop_id: formData.shop_id });
            });
            await Promise.all(uploadAllForm); //Run addDoc Simultaneously
            Swal.fire('Success!', 'products Successfully Added', 'success');
            navigate('/shopping-mall/admin/products', { replace: true });
        } catch (error) {
            console.error('Error adding product data:', error);
            Swal.fire('Error', `Failed to delete product data`, 'error');
        }
    };

    return (
        <>
            <AdminLayout>
                <h3 className="text-3xl font-bold dark:text-white mb-6">Add products</h3>
                <form className="mx-auto" onSubmit={handleSubmit}>
                    {formList.map((formData, index) => (
                        <div key={index} className="mb-8 border-b pb-4">
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                    value={formData.name}
                                    onChange={(e) => handleChange(e, index)}
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
                                    onChange={(e) => handleChange(e, index)}
                                />
                                <label
                                    htmlFor="price"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Price
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name='unit' placeholder=' ' id="unit" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={formData.unit} onChange={(e) => handleChange(e, index)} required />
                                <label htmlFor="unit" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Unit</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name='type' placeholder=' ' id="type" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={formData.type} onChange={(e) => handleChange(e, index)} required />
                                <label htmlFor="type" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Type</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <select id="shops" name='shop_id' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={formData.shop_id} onChange={(e) => handleChange(e, index)} required>
                                    <option>Choose a shops</option>
                                    {shops.map((shop, index) => (
                                        <option key={index} value={shop.id}>{shop.name}</option>
                                    )
                                    )}
                                </select>
                                <label htmlFor="shops" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Shopping shops:</label>
                            </div>
                            <Image formData={formData} setFormData={(updatedData) => {
                                const updatedFormList = [...formList];
                                updatedFormList[index] = updatedData;
                                setFormList(updatedFormList);
                            }} index={index} />
                            <div className="relative z-0 w-full mb-5 group">
                                <textarea id="description" name="description" value={formData.description} onChange={(e) => handleChange(e, index)} rows="4" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "></textarea>
                                <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                            </div>
                            {formList.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveForm(index)}
                                    className="text-red-500 hover:text-red-700 mt-2"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))};
                    <button
                        type="button"
                        onClick={handleAddForm}
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mb-4"
                    >
                        Append
                    </button>
                    <button
                        type="submit"
                        className="ml-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit All
                    </button>
                </form>
            </AdminLayout>
        </>
    );
}

export default Add