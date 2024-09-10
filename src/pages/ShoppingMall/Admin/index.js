import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/ShoppingMall/Admin/Layout';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

function Index() {
  const [mallCount, setMallCount] = useState(0);
  const [shopCount, setShopCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const mallsCollectionRef = collection(db, "malls");
    const shopsCollectionRef = collection(db, "shops");
    const productsCollectionRef = collection(db, "products");
    const getMalls = async () => {
      const mallsCollection = await getDocs(mallsCollectionRef);
      setMallCount(mallsCollection.docs.length);
    };
    const getShops = async () => {
      const shopsCollection = await getDocs(shopsCollectionRef);
      setShopCount(shopsCollection.docs.length);
    };
    const getProducts = async () => {
      const productsCollection = await getDocs(productsCollectionRef);
      setProductCount(productsCollection.docs.length);
    };
    getMalls();
    getShops();
    getProducts();
  }, []);

  return (
    <>
      <AdminLayout>
          <div className="row">
            <div className="col-md-3">
              <div className="card card-user card-blue">
                <div className="card-header">
                  <h4 className="card-title">Shopping Malls</h4>
                </div>
                <div className="card-body">
                  <div className="card-stats">
                    <div className="stats">
                      <div className="number">{mallCount}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card card-user card-orange">
                <div className="card-header">
                  <h4 className="card-title">Total Shops</h4>
                </div>
                <div className="card-body">
                  <div className="card-stats">
                    <div className="stats">
                      <div className="number">{shopCount}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card card-user card-red">
                <div className="card-header">
                  <h4 className="card-title">Total Products</h4>
                </div>
                <div className="card-body">
                  <div className="card-stats">
                    <div className="stats">
                      <div className="number">{productCount}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </AdminLayout>
    </>
  )
}

export default Index