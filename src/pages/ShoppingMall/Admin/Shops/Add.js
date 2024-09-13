import React, { useState } from 'react';
import AdminLayout from '../../../../components/ShoppingMall/Admin/Layout';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '../../config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';
import Form from '../../../../components/ShoppingMall/Admin/Malls/Form';

const Add = () => {
    const uuid = require('uuid');
    const [formList, setFormList] = useState([{
        id: uuid.v4(),
        name: '',
        contact: '',
        openingHours: '',
        images: [],
        mall_id: '',
        mall_name: 'Choose a malls',
    }]);
    const shopsCollectionRef = collection(db, "shops");
    const navigate = useNavigate();

    const handleAddForm = () => {
        setFormList([...formList, { id: uuid.v4(), name: '', contact: '', openingHours: '', images: [], mall_id: '', mall_name: 'Choose a malls', }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const uploadAllForm = formList.map(async (formData) => {
                const imageArrays = formData.images.map((image) => {
                    const imageRef = ref(storage, `shops/${image.filename}`);
                    return uploadBytes(imageRef, image.file).then((uploadResult) => {
                        return getDownloadURL(uploadResult.ref);
                    });
                });
                const downloadUrls = await Promise.all(imageArrays);
                const openingHours = moment(formData.openingHours, 'HH:mm').format('hh:mm A');//dayJs
                return addDoc(shopsCollectionRef, {
                    name: formData.name,
                    contact: formData.contact,
                    opening_hours: openingHours,
                    images: downloadUrls,
                    mall_id: formData.mall_id,
                });
            });

            await Promise.all(uploadAllForm);
            Swal.fire('Success!', 'Shops Successfully Added', 'success');
            navigate('/shopping-mall/admin/shops', { replace: true });
        } catch (error) {
            console.error('Error adding shop data:', error);
            Swal.fire('Error', `Failed to delete shop data`, 'error');
        }

    };

    return (
        <>
            <AdminLayout>
                <h3 className="text-3xl font-bold dark:text-white mb-6">Add Shops</h3>
                <Form handleSubmit={handleSubmit} formList={formList} setFormList={setFormList} handleAddForm={handleAddForm} />
            </AdminLayout>
        </>
    );
}

export default Add