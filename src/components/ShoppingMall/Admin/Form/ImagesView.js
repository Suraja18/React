import React from 'react'

const ImagesView = ({ images }) => {
    return (
        <>
            <div className="relative z-0 w-full mb-5 group flex flex-wrap">
                {images && images.map((img, index) => (
                    <figure key={index} className="max-w-lg">
                        <img className="h-auto max-w-full rounded-lg" src={img} alt=" description" />
                        <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">Image {index + 1}</figcaption>
                    </figure>
                ))}
            </div>
        </>
    )
}

export default ImagesView