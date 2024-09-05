import React from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

const TableButton = (props) => {
    return (
        <>
            <div style={{ display: 'flex' }}>
                <button className="button view-button" onClick={() => props.view(props.id)}><FaEye /></button>
                <button className="button edit-button" onClick={() => props.update(props.id)}><FaEdit /></button>
                <button className="button delete-button" onClick={() => props.delete(props.id)}><FaTrash /></button>
            </div>
        </>
    )
}

export default TableButton