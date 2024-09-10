import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../../components/ShoppingMall/Admin/Layout';
import TableButton from '../../../../components/ShoppingMall/Admin/TableButton';
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { db, storage } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteObject, ref } from 'firebase/storage';

const Index = () => {
    const [malls, setMalls] = useState([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const mallsPerPage = 3;
    const [expandedRow, setExpandedRow] = useState(null);
    const [hiddenColumns, setHiddenColumns] = useState([]);

    useEffect(() => {
        const mallsCollectionRef = collection(db, "malls");
        const getMalls = async () => {
            const data = await getDocs(mallsCollectionRef);
            setMalls(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getMalls();
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleRowClick = (userId) => {
        setExpandedRow(expandedRow === userId ? null : userId);
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredMalls = malls.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastUser = currentPage * mallsPerPage;
    const indexOfFirstUser = indexOfLastUser - mallsPerPage;
    const currentMalls = filteredMalls.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleResize = () => {
        let newHiddenColumns = [];
        let matchedMaxWidth = Infinity;

        const mediaQueries = [
            { maxWidth: 720, columns: ['Image'] },
            { maxWidth: 650, columns: ['Image', 'Opening Hours'] },
            { maxWidth: 555, columns: [ 'Image', 'Location', 'Opening Hours'] },
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
        navigate('/shopping-mall/admin/malls/add')
    }

    const viewData = async (id) => {
        const mallDoc = doc(db, "malls", id);
        await getDoc(mallDoc).then((doc) => {
            if (doc.exists()) {
                navigate(`/shopping-mall/admin/malls/view/${id}`);
            } else {
                Swal.fire('Error', `Malls doesn't exist`, 'error');
            }
        });
    }

    const editData = async (id) => {
        const mallDoc = doc(db, "malls", id);
        await getDoc(mallDoc).then((doc) => {
            if (doc.exists()) {
                navigate(`/shopping-mall/admin/malls/edit/${id}`);
            } else {
                Swal.fire('Error', `Malls doesn't exist`, 'error');
            }
        });
    }

    const deleteData = async (id) => {
        const mallDoc = doc(db, "malls", id);
        await getDoc(mallDoc).then(async (doc) => {
            if (doc.exists()) {
                const images = doc.data().images;
                images.forEach((image) => {
                    const oldImageRef = ref(storage, image);
                    deleteObject(oldImageRef);
                });
                await deleteDoc(mallDoc);
                Swal.fire('Success', `Malls deleted Successfully`, 'success');
                setMalls((prevMalls) => prevMalls.filter((mall) => mall.id !== id));
            } else {
                Swal.fire('Error', `Malls doesn't exist`, 'error');
            }
        });
        
    }

    return (
        <>
            <AdminLayout>
                <div>
                <h3 className="text-3xl font-bold dark:text-white mb-6">Shopping Mall</h3>
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
                                <th>Location</th>
                                <th>Opening Hours</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMalls.map((user, index) => (
                                <React.Fragment key={index}>
                                    <tr className={expandedRow === user.id ? 'tr-expanding' : ''}>
                                        <td>{index + 1}</td>
                                        <td className="table-expand" onClick={() => handleRowClick(user.id)}>{user.name}</td>
                                        <td data-name="Location">{user.location}</td>
                                        <td data-name="Opening Hours">{user.opening_hours}</td>
                                        <td data-name="Image">
                                            {user && user.images && <img alt={user.name} className='img-mob' src={user.images[0]} />}
                                        </td>
                                        <td><TableButton view={(id) => viewData(user.id)} update={(id) => editData(user.id)} delete={(id) => deleteData(user.id)} /></td>
                                    </tr>
                                    {expandedRow === user.id && (
                                        <tr>
                                            <td></td>
                                            <td colSpan={6}>
                                                <ul data-r-table-index="4" className="r-table-details">
                                                    {hiddenColumns.map((key, index) => {
                                                        if (hiddenColumns.includes(key)) {
                                                            const displayKey = key === 'Opening Hours' ? 'Opening Hours' : key;
                                                            const dKey = key === 'Opening Hours' ? 'opening_hours' : key.toLowerCase();
                                                            const dataKey = dKey === 'image' ? <img alt={displayKey} className='img-mob' src={user.images && user.images[0]} /> : user[dKey];
                                                            return (
                                                                <li key={index} data-r-table-index={index + 1} data-dt-row="4" data-dt-column={index + 1 + hiddenColumns.indexOf(key)}>
                                                                    <span className="r-table-title">{displayKey} :</span>
                                                                    <span className="r-table-data">{dataKey}</span>
                                                                </li>
                                                            );
                                                        }
                                                        return null;
                                                    })}
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
                        {Array.from({ length: Math.ceil(malls.length / mallsPerPage) }).map((_, index) => (
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
                            disabled={currentPage === Math.ceil(filteredMalls.length / mallsPerPage)} >
                            Next
                        </button>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}

export default Index