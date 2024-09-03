import React from 'react';
import Header from '../../ShoppingMall/User/Header';
import Footer from '../../ShoppingMall/User/Footer';

const Layout = (props) => {
    return (
        <>
            <Header />
                {props.children}
            <Footer />
        </>
    )
}

export default Layout