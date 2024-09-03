import React, { useEffect, useState } from 'react';
import '../App.css';
import MyHeader from '../components/Header';
import Welcome from '../components/Welcome';
import AllTable from '../components/AllTable';
import Counter from '../components/Counter';
import { ProductData } from '../Product';
import Footer from '../components/Footer';
import Buttons from '../components/Buttons';
import HooksCounter from '../components/HooksCounter';
import AllHeader from '../components/AllHeader';


function Home() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [name, setName] = useState(''); // means variable name and setName means whenever needed set the variable value
  const [type, setType] = useState(''); // useState means initial value
  const [price, setPrice] = useState(0);
  const [id, setId] = useState(0);
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  const [update, setUpdate] = useState(false);


  useEffect(() => { //means while rendering set the value other type it is not set from here.
    setData(ProductData);
  }, [])

  const addData = (e) => {
    e.preventDefault();
    const maxId = data.length > 0 ? Math.max(...data.map(item => item.id)) : 0;
    const dt = [...data];
    const newObject = {
      id: maxId + 1,
      Name: name,
      Type: type,
      Price: price,
      Color: color
    }
    dt.push(newObject);
    setData(dt);
    window.alert('Product Added Successfully');
    clearData();
  }

  const updateDescription = (e) => {
    if (e.target.value.trim().split(/\s+/).length <= 250) {
      setDescription(e.target.value);
      e.target.value.length === 0 ? setCount(0) : setCount(e.target.value.trim().split(/\s+/).length)
    }
  }

  const updateData = () => {
    const index = data.map((item) => { //data.map means array separation
      return item.id
    }).indexOf(id);

    const dt = [...data]; //Copying previous array data
    dt[index].Name = name;
    dt[index].Type = type;
    dt[index].Price = price;
    dt[index].Color = color;
    setData(dt);
    window.alert('Product Edited Successfully');
    clearData();
  }

  const clearData = () => {
    setUpdate(false);
    setId(0);
    setName(''); // setting the value
    setType('');
    setPrice('');
    setColor('');
  }

  const editData = (id) => {
    const dt = data.filter(item => item.id === id);
    if (dt !== undefined) {
      setUpdate(true);
      setId(id);
      setName(dt[0].Name);
      setType(dt[0].Type);
      setPrice(dt[0].Price);
      setColor(dt[0].Color);
    }
  }

  const deleteData = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure want to delete this product")) {
        const dt = data.filter(item => item.id !== id);
        setData(dt);
      }
    }
  }



  return (
    <>
    <AllHeader />
      <div className="App">
        <div className="container">
          <div className="form-container">
            <Welcome />
            <Counter />
            <HooksCounter />
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

                <Buttons add={addData} update={updateData} clear={clearData} data={update} />
                {/* We can send data like this as well */}
              </div>

            </div>
          </div>
          <div className="form-container" style={{ marginTop: '15px' }}>
            <div className="form-input">
              <label htmlFor="description">Description Word Count: {count}</label>
              <textarea id="description" placeholder="Description" onChange={updateDescription} value={description} />
            </div>
            <MyHeader />
            <AllTable> {/* We can send children like this as well */}
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
            </AllTable>

          </div>

        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
