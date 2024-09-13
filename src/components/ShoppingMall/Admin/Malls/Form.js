import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Text from '../Form/Text';
import { db } from '../../../../pages/ShoppingMall/config/firebase';
import Select from '../Form/Select';
import Image from '../../Others/Image';

const Form = ({handleSubmit, formList, setFormList, handleAddForm}) => {
    const [malls, setMalls] = useState([]);
    
    useEffect(() => {
        const mallsCollectionRef = collection(db, "malls");
        const getMalls = async () => {
            const data = await getDocs(mallsCollectionRef);
            setMalls(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getMalls();
    }, []);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedFormList = [...formList];
        updatedFormList[index][name] = value;
        setFormList(updatedFormList);
    };

    const handleRemoveForm = (index) => {
        const updatedFormList = [...formList];
        updatedFormList.splice(index, 1);
        setFormList(updatedFormList);
    };
    
    return (
        <>
            <form className="mx-auto" onSubmit={handleSubmit}>
                    {formList.map((formData, index) => (
                        <div key={formData.id} className="mb-8 border-b pb-4">
                            <Text
                                type="text"
                                value={formData.name}
                                handleChange={(e) => handleChange(e, index)}
                                Name="Name"
                                required
                            />

                            <Text
                                type="number"
                                value={formData.contact}
                                handleChange={(e) => handleChange(e, index)}
                                Name="Contact"
                                required
                            />

                            <Text
                                type="time"
                                value={formData.openingHours}
                                handleChange={(e) => handleChange(e, index)}
                                Name="Opening Hours"
                                required
                            />
                            <Select 
                                label="Shopping Malls" 
                                inputName="mall_id" 
                                value={formData.mall_name}
                                handleChange={(e) => handleChange(e, index)}>
                                    {malls.map((mall) => (
                                        <option key={mall.id} value={mall.id}>{mall.name}</option>
                                    ))}
                            </Select>

                            <Image formData={formData} setFormData={(updatedData) => {
                                const updatedFormList = [...formList];
                                updatedFormList[index] = updatedData;
                                setFormList(updatedFormList);
                            }} index={index} />

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
                    ))}
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
                        Submit
                    </button>
                </form>
        </>
    )
}

export default Form