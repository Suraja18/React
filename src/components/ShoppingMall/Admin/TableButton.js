import React from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const TableButton = (props) => {

    const handleDelete = async (id) => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You want to delete this shop?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it',
        }).then(async (result) => {
          if (result.isConfirmed) {
            props.delete(id);
          }
        });
      };


    return (
        <>
            <div style={{ display: 'flex' }}>
                <button className="button view-button" onClick={() => props.view(props.id)}><FaEye /></button>
                <button className="button edit-button" onClick={() => props.update(props.id)}><FaEdit /></button>
                <button className="button delete-button" onClick={() => handleDelete(props.id)}><FaTrash /></button>
            </div>
        </>
    )
}

export default TableButton