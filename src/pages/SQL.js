import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import ReactPaginate from 'react-paginate';
import AllHeader from '../components/AllHeader';

function SQL() {
  const navigate = useNavigate();
  const componentPDF = useRef();
  const [userData, setUserData] = useState([]);
  //Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const dataPerPage = 4;
  const pageClick = pageNumber * dataPerPage;
  const countPage = Math.ceil(userData.length / dataPerPage);

  useEffect(() => {
    const registeredData = async () => {
      axios.get('http://localhost:7000/api/user')
        .then(res => setUserData(res.data))
        .catch(error => console.log(error));
    }
    registeredData();
  }, []);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "userData",
    onAfterPrint: () => alert("Data saved in PDF")
  });

  const editData = (id) => {
    axios.get(`http://localhost:7000/api/user/${id}`) 
      .then(res => {
        if (res.data) {
          navigate(`/user/edit/${id}`);
        } else {
          alert("User does not exist in the database.");
        }
      })
      .catch(error => console.log(error));
  };

  const deleteData = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure want to delete this product")) {
        axios.delete(`http://localhost:7000/api/user/delete/${id}`)
          .then(() => {
            axios.get('http://localhost:7000/api/user')
              .then(res => setUserData(res.data))
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));
      }
    }
  }

  const changePage = ({selected}) => {
    setPageNumber(selected);
  }

  return (
    <div>
      <AllHeader />
      <Link to="/user/add" className="btn add" style={{ padding: 10, marginRight: 25, height: 24, float: 'right', textDecoration: 'none' }}>Add New</Link>
      <button className="btn add" onClick={generatePDF} style={{ marginRight: 5, height: 46, float: 'right', textDecoration: 'none' }}>PDF</button>
      <div ref={componentPDF} style={{ width: '100%' }}>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.length > 0 ? (
              userData.slice(pageClick, pageClick + dataPerPage).map((uData, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{uData.name}</td>
                  <td>{uData.email}</td>
                  <td>{uData.phone}</td>
                  <td>{uData.address}</td>
                  <td>
                    <button className="btn edit" onClick={() => editData(uData.id)}>Edit</button>
                    <button className="btn delete" onClick={() => deleteData(uData.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Loading...</td>
              </tr>
            )
            }
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={countPage}
          onPageChange={changePage}
          containerClassName={"pagination"}
          activeClassName={"active"}
          disabledClassName={"disabled"}
        />
      </div>
    </div>
  )
}

export default SQL