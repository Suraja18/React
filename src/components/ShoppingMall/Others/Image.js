import React, { useRef } from 'react';

const Image = ({ formData, setFormData }) => {
    const imageInputRef = useRef(null);

    const handleImageRemove = (index) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            images: prevFormData.images.filter((img, i) => i !== index),
        }));
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        const images = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const uuid = require('uuid');
            const filename = `${Date.now()}${uuid.v4()}${file.name.replace(/^.*\./, '.')}`;
            const imageUrl = URL.createObjectURL(file);
            images.push({ file, filename, imageUrl });
        }
        setFormData((prevFormData) => ({ ...prevFormData, images: [...prevFormData.images, ...images] }));
    };
    return (
        <>
            {formData.images.length > 0 && (
                <div className="flex flex-wrap">
                    {formData.images.map((image, index) => (
                        <div key={index} className="relative mr-4 mb-4">
                            <img src={image.imageUrl || image} alt="Selected" className="h-20 object-cover" />
                            <span className="absolute top-0 right-0 cursor-pointer" onClick={() => handleImageRemove(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </span>
                        </div>
                    )
                    )}
                </div>
            )}
            <div className="relative z-0 w-full mb-5 group">

                <div className="flex items-center justify-center w-full">
                    <label htmlFor="image" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="image" type="file" name="image" className="hidden" ref={imageInputRef} onChange={handleImageChange} multiple />
                    </label>
                </div>
                <label
                    htmlFor="image"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Image
                </label>
            </div>
        </>
    )
}

export default Image