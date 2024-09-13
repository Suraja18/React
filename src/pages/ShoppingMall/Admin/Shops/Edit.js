import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../../components/ShoppingMall/Admin/Layout';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../config/firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';
import Form from '../../../../components/ShoppingMall/Admin/Malls/Form';

const Edit = () => {
    const { id } = useParams();
    const [formList, setFormList] = useState([]);
    const [allShops, setAllShops] = useState([]);
    const [currentShopIndex, setCurrentShopIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllShops = async () => {
            const shopsCollectionRef = collection(db, "shops");
            const shopDocs = await getDocs(shopsCollectionRef);
            const shopData = shopDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setAllShops(shopData);

            const shopToEdit = shopData.find(shop => shop.id === id);
            if (shopToEdit) {
                const openingHours = moment(shopToEdit.opening_hours, 'hh:mm A').format('HH:mm');
                setFormList([{
                    id: id,
                    name: shopToEdit.name,
                    contact: shopToEdit.contact,
                    openingHours: openingHours,
                    images: shopToEdit.images,
                    mall_id: shopToEdit.mall_id,
                    mall_name: ''
                }]);
                
                const mallDocRef = doc(db, "malls", shopToEdit.mall_id);
                const mallDoc = await getDoc(mallDocRef);
                setFormList((prevFormList) => prevFormList.map((formData) => ({
                    ...formData,
                    mall_name: mallDoc.data().name,
                })));

                setCurrentShopIndex(shopData.indexOf(shopToEdit) + 1); 
            } else {
                Swal.fire('Error', `Shop doesn't exist`, 'error');
                navigate(`/shopping-mall/admin/shops`, { replace: true });
            }
        };

        fetchAllShops();
    }, [id, navigate]);

    const handleAddForm = () => {
        if (currentShopIndex < allShops.length) {
            const nextShop = allShops[currentShopIndex];
            const openingHours = moment(nextShop.opening_hours, 'hh:mm A').format('HH:mm');

            const newForm = {
                id: nextShop.id,
                name: nextShop.name,
                contact: nextShop.contact,
                openingHours: openingHours,
                images: nextShop.images,
                mall_id: nextShop.mall_id,
                mall_name: ''
            };

            const mallDocRef = doc(db, "malls", nextShop.mall_id);
            getDoc(mallDocRef).then((mallDoc) => {
                newForm.mall_name = mallDoc.data().name;
                setFormList([...formList, newForm]);
            });

            setCurrentShopIndex(currentShopIndex + 1);
        } else {
            Swal.fire('Error', `No more shops available to append`, 'error');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updateAllForm = formList.map(async (formData) => {
                const shopDocRef = doc(db, "shops", formData.id);
    
                const openingHours = moment(formData.openingHours, 'HH:mm').format('hh:mm A');
                const existingImages = formData.images.filter(image => !image.file && !image.filename);
                let updatedImages = [...existingImages];

                const shopData = await getDoc(shopDocRef);
                const imagesToDelete = shopData.data().images.filter(imageUrl => {
                    const existingImage = existingImages.find(existingImage => existingImage === imageUrl);
                    return !existingImage;
                });
    
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
                }
    
                const newData = {
                    name: formData.name,
                    contact: formData.contact,
                    opening_hours: openingHours,
                    images: updatedImages,
                    mall_id: formData.mall_id
                };
    
                await updateDoc(shopDocRef, newData);
            });
    
            await Promise.all(updateAllForm);
            Swal.fire('Success', `Shops updated successfully`, 'success');
            navigate(`/shopping-mall/admin/shops`, { replace: true });
    
        } catch (error) {
            console.error("Error updating documents:", error);
            Swal.fire('Error', `Failed to update shop data`, 'error');
        }
    };
    

    return (
        <>
            <AdminLayout>
                <h3 className="text-3xl font-bold dark:text-white mb-6">Edit Shops Detail</h3>
                <Form handleSubmit={handleSubmit} formList={formList} setFormList={setFormList} handleAddForm={handleAddForm} />
            </AdminLayout>
        </>
    );
};

export default Edit;
