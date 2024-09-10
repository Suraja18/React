import React, { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../../../../components/ShoppingMall/Admin/Layout';
import TableButton from '../../../../components/ShoppingMall/Admin/TableButton';
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { db, storage } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteObject, ref } from 'firebase/storage';

const Index = () => {
    const [products, setProducts] = useState([]);
    const productsCollectionRef = useMemo(() => collection(db, "products"), []);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 3;
    const [expandedRow, setExpandedRow] = useState(null);
    const [hiddenColumns, setHiddenColumns] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const data = await getDocs(productsCollectionRef);
            const productsData = await Promise.all(
                data.docs.map(async (productDoc) => {
                    const product = productDoc.data();
                    const shopDoc = await getDoc(doc(db, "shops", product.shop_id));
                    const shopData = shopDoc.exists() ? shopDoc.data() : {};
                    return { ...product, id: productDoc.id, shopName: shopData.name, shopContact: shopData.contact };
                })
            );
            setProducts(productsData);
        };
        getProducts();
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [productsCollectionRef]);

    const handleRowClick = (userId) => {
        setExpandedRow(expandedRow === userId ? null : userId);
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = products.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastUser = currentPage * productsPerPage;
    const indexOfFirstUser = indexOfLastUser - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleResize = () => {
        let newHiddenColumns = [];
        let matchedMaxWidth = Infinity;

        const mediaQueries = [
            { maxWidth: 720, columns: ['Image'] },
            { maxWidth: 650, columns: ['Image', 'Price'] },
            { maxWidth: 555, columns: [ 'Image', 'Price', 'Unit'] },
        ];

        for (const mediaQuery of mediaQueries) {
            if (window.innerWidth <= mediaQuery.maxWidth && mediaQuery.maxWidth < matchedMaxWidth) {
                newHiddenColumns = mediaQuery.columns;
                matchedMaxWidth = mediaQuery.maxWidth;

            }
        }
        setHiddenColumns(newHiddenColumns);
    };

    const addForm = () => {
        navigate('/shopping-mall/admin/products/add')
    }

    const viewData = async (id) => {
        const productDoc = doc(db, "products", id);
        await getDoc(productDoc).then((doc) => {
            if (doc.exists()) {
                navigate(`/shopping-mall/admin/products/view/${id}`);
            } else {
                Swal.fire('Error', `Products doesn't exist`, 'error');
            }
        });
    }

    const editData = async (id) => {
        const productDoc = doc(db, "products", id);
        await getDoc(productDoc).then((doc) => {
            if (doc.exists()) {
                navigate(`/shopping-mall/admin/products/edit/${id}`);
            } else {
                Swal.fire('Error', `Products doesn't exist`, 'error');
            }
        });
    }

    const deleteData = async (id) => {
        const productDoc = doc(db, "products", id);
        await getDoc(productDoc).then(async (doc) => {
            if (doc.exists()) {
                const oldImageRef = ref(storage, `${doc.data().image}`);
                await deleteObject(oldImageRef);
                await deleteDoc(productDoc);
                Swal.fire('Success', `Products deleted Successfully`, 'success');
                setProducts((prevproducts) => prevproducts.filter((shop) => shop.id !== id));
            } else {
                Swal.fire('Error', `Products doesn't exist`, 'error');
            }
        });
        
    }

    return (
        <>
            <AdminLayout>
                <div>
                <h3 className="text-3xl font-bold dark:text-white mb-6">Products</h3>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button className='button edit-button add-search' onClick={addForm}>Add</button>
                    </div>
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Unit</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((user, index) => (
                                <React.Fragment key={index}>
                                    <tr className={expandedRow === user.id ? 'tr-expanding' : ''}>
                                        <td>{index + 1}</td>
                                        <td className="table-expand before" onClick={() => handleRowClick(user.id)}>{user.name}</td>
                                        <td>{user.unit}</td>
                                        <td>{user.price}</td>
                                        <td><img alt={user.name} className='img-mob' src={user.image} /></td>
                                        <td><TableButton view={(id) => viewData(user.id)} update={(id) => editData(user.id)} delete={(id) => deleteData(user.id)} /></td>
                                    </tr>
                                    {expandedRow === user.id && (
                                        <tr>
                                            <td></td>
                                            <td colSpan={6}>
                                                <ul data-r-table-index="4" className="r-table-details">
                                                    {hiddenColumns.map((key, index) => {
                                                        if (hiddenColumns.includes(key)) {
                                                            const displayKey = key;
                                                            const dKey = key.toLowerCase();
                                                            const dataKey = dKey === 'image' ? <img alt={displayKey} className='img-mob' src={user[dKey]} /> : user[dKey];
                                                            return (
                                                                <li key={index} data-r-table-index={index + 1} data-dt-row="4" data-dt-column={index + 1 + hiddenColumns.indexOf(key)}>
                                                                    <span className="r-table-title">{displayKey} :</span>
                                                                    <span className="r-table-data">{dataKey}</span>
                                                                </li>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                    <li>
                                                        <span className="r-table-title">Type :</span>
                                                        <span className="r-table-data">{user.type}</span>
                                                    </li>
                                                    <li>
                                                        <span className="r-table-title">Description :</span>
                                                        <span className="r-table-data">{user.description}</span>
                                                    </li>
                                                    <li>
                                                        <span className="r-table-title">Shops Name :</span>
                                                        <span className="r-table-data">{user.shopName}</span>
                                                    </li>
                                                    <li>
                                                        <span className="r-table-title">Shops Contact :</span>
                                                        <span className="r-table-data">{user.shopContact}</span>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>

                            ))}

                        </tbody>
                    </table>
                    <div className="pagination">
                        <button
                            className="pagination-button"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}>
                            Previous
                        </button>
                        {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
                            <button
                                key={index + 1}
                                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            className="pagination-button"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)} >
                            Next
                        </button>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}

export default Index