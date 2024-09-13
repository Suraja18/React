import React, { useEffect, useState } from 'react';
import UserLayout from '../../../components/ShoppingMall/User/Layout';
import '../CSS/style.css'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const Product = ({ images, name, type, price, unit, description, shopName, shopHours, shopContact, mallName, mallLocation }) => {
  return (
    <div className="product">
      <img src={images[0]} alt={name} style={{ height:250, justifyContent:"center" }} />
      <div className="product-info">
        <h3>{name}</h3>
        <p>{type}</p>
        <p>${price} / {unit}</p>
        <div className="ratings">
          <span>{description}</span>
        </div>
        <p>Shop Name: {shopName}</p>
        <p>Opening Hours: {shopHours}</p>
        <p>Contact: {shopContact}</p>
        <p>Mall Name: {mallName}</p>
        <p>Address: {mallLocation}</p>
      </div>
    </div>
  );
};

const Index = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const productsCollectionRef = collection(db, "products");
        const data = await getDocs(productsCollectionRef);
        const productsData = await Promise.all(
          data.docs.map(async (productDoc) => {
            const product = productDoc.data();
            const shopDoc = await getDoc(doc(db, "shops", product.shop_id));
            const shopData = shopDoc.exists() ? shopDoc.data() : {};
            const mallDoc = await getDoc(doc(db, "malls", shopData.mall_id));
            const mallData = mallDoc.exists() ? mallDoc.data() : {};
            return {
              ...product,
              id: productDoc.id,
              shopName: shopData.name,
              shopHours: shopData.opening_hours,
              shopContact: shopData.contact,
              mallName: mallData.name,
              mallLocation: mallData.location,
            };
          })
        );
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  

  return (
    <>
      <UserLayout>
          <div>USER index</div>
          <div>
            <div className="products">
              {products.map((product) => (
                <Product key={product.id} {...product} />
              ))}
            </div>
          </div>
      </UserLayout>
    </>
    
  )
}

export default Index