import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function SQL() {
  return (
    <div>
      <Link to="/user/add" className="btn add" style={{ padding:10, marginRight:25, height:24, float:'right', textDecoration:'none' }}>Add New</Link>
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
          <tr>
            <td>1</td>
            <td>Suraj Adhikari</td>
            <td>suraj.crawlerhub@gmail.com</td>
            <td>9867808207</td>
            <td>Rupalake</td>
            <td>
              <button className="btn edit" >Edit</button>
              <button className="btn delete" >Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default SQL