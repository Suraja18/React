import React from 'react';
import AdminLayout from '../../../components/ShoppingMall/Admin/Layout';

function Index() {


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
                      <div className="number">$6.200</div>
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
                      <div className="number">2.49%</div>
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
                      <div className="number">44K</div>
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