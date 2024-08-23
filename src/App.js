import React, { useEffect, useState } from 'react';
// import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import MyHeader from './components/Header';
import { ProductData } from './Product';

function App() {

  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState(0);
  const [id, setId] = useState(0);
  const [color, setColor] = useState('');
  const [update, setUpdate] = useState(false);

  useEffect(()=>{
    setData(ProductData);
  },[])

  const addData = (e) => {
    e.preventDefault();
    const maxId = data.length > 0 ? Math.max(...data.map(item => item.id)) : 0;
    const dt = [...data];
    const newObject = {
      id: maxId + 1,
      Name : name,
      Type : type,
      Price : price,
      Color : color
    }
    dt.push(newObject);
    setData(dt);
    clearData();
  }

  const updateData = () => {
    const index = data.map((item) =>{
      return item.id
    }).indexOf(id);

    const dt = [...data];
    dt[index].Name = name;
    dt[index].Type = type;
    dt[index].Price = price;
    dt[index].Color = color;
    setData(dt);
    clearData();
  }

  const clearData = () => {
    setUpdate(false);
    setId(0);
    setName('');
    setType('');
    setPrice('');
    setColor('');
  }

  const editData = (id) => {
    const dt = data.filter(item => item.id === id);
    if(dt !== undefined){
      setUpdate(true);
      setId(id);
      setName(dt[0].Name);
      setType(dt[0].Type);
      setPrice(dt[0].Price);
      setColor(dt[0].Color);
    }
  }

  const deleteData = (id) => {
    if(id > 0) {
      if(window.confirm("Are you sure want to delete this product")){
        const dt = data.filter(item => item.id !== id);
        setData(dt);
      }
    }
  }

  return (
    <div className="App">
      <div className="container">
          <div className="form-container">
          <h2>Add Products</h2>
            <div className="form">
              <div className="form-group">
                <div className="form-input">
                      <label htmlFor="name">Name:</label>
                      <input type="text" id="name" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
                  </div>
                  <div className="form-input">
                      <label htmlFor="type">Type:</label>
                      <input type="text" id="type" placeholder="Type" onChange={(e) => setType(e.target.value)} value={type} />
                  </div>
                  <div className="form-input">
                      <label htmlFor="price">Price (Rs):</label>
                      <input type="number" id="price" placeholder="Price" onChange={(e) => setPrice(e.target.value)} value={price} />
                  </div>
                  <div className="form-input">
                      <label htmlFor="color">Color:</label>
                      <input type="text" id="color" placeholder="Color" onChange={(e) => setColor(e.target.value)} value={color} />
                  </div>
                  <div className="form-input">
                    {
                      !update ?
                      <button className="btn add" onClick={(e) => addData(e)}>Add</button>
                      :
                      <button className="btn edit" onClick={() => updateData()}>Update</button>
                    }
                    <button className="btn delete" onClick={() => clearData()}>Clear</button>
                  </div>
                  
              </div>
                
            </div>
        </div>
        <div className="form-container" style={{ marginTop: '15px' }}>
          <MyHeader />
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Type</th>
                <th>Price (Rs)</th>
                <th>Color</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.Name}</td>
                      <td>{item.Type}</td>
                      <td>{item.Price}</td>
                      <td>{item.Color}</td>
                      <td>
                        <button className="btn edit" onClick={() => editData(item.id)}>Edit</button>
                        <button className="btn delete" onClick={() => deleteData(item.id)}>Delete</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
}

export default App;
