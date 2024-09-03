import React from 'react';
import UserLayout from '../../../components/ShoppingMall/User/Layout';
import '../CSS/style.css'

const Product = ({ image, title, brand, price, rating, reviews }) => {
  return (
    <div className="product">
      <img src={image} alt={title} />
      <div className="product-info">
        <h3>{title}</h3>
        <p>{brand}</p>
        <p>${price}</p>
        <div className="ratings">
          <span>{rating}</span>
          <span>({reviews} reviews)</span>
        </div>
      </div>
    </div>
  );
};

const Index = () => {

  const products = [
    {
      image: "https://img.freepik.com/free-photo/delicious-lobster-gourmet-seafood_23-2151713033.jpg?t=st=1725272171~exp=1725275771~hmac=6d1db8cfaa056a9bc2a6244392dfd0e0cfb8af7c622660e20469b3055e02431b&w=996",
      title: "Zizi Western Boots",
      brand: "SHUSHOP",
      price: "49.99",
      rating: "4.5",
      reviews: "100",
    },
    {
      image: "https://img.freepik.com/free-photo/delicious-lobster-gourmet-seafood_23-2151713033.jpg?t=st=1725272171~exp=1725275771~hmac=6d1db8cfaa056a9bc2a6244392dfd0e0cfb8af7c622660e20469b3055e02431b&w=996",
      title: "Made In Portugal Suede Pamela Wool Lined Boots",
      brand: "MIZ MOOZ",
      price: "79.99",
      rating: "4.8",
      reviews: "200",
    },
    {
      image: "https://img.freepik.com/free-photo/delicious-lobster-gourmet-seafood_23-2151713033.jpg?t=st=1725272171~exp=1725275771~hmac=6d1db8cfaa056a9bc2a6244392dfd0e0cfb8af7c622660e20469b3055e02431b&w=996",
      title: "Classic Mini Iridescent Boots",
      brand: "REVEAL DESIGNER",
      price: "119.99",
      rating: "5.0",
      reviews: "500",
    },
    {
      image: "https://img.freepik.com/free-photo/delicious-lobster-gourmet-seafood_23-2151713033.jpg?t=st=1725272171~exp=1725275771~hmac=6d1db8cfaa056a9bc2a6244392dfd0e0cfb8af7c622660e20469b3055e02431b&w=996",
      title: "Men's Via Olympus Cushioned Running Sneakers",
      brand: "ALTRA",
      price: "99.99",
      rating: "4.3",
      reviews: "300",
    },
    {
      image: "https://img.freepik.com/free-photo/delicious-lobster-gourmet-seafood_23-2151713033.jpg?t=st=1725272171~exp=1725275771~hmac=6d1db8cfaa056a9bc2a6244392dfd0e0cfb8af7c622660e20469b3055e02431b&w=996",
      title: "Zizi Western Boots",
      brand: "SHUSHOP",
      price: "49.99",
      rating: "4.5",
      reviews: "100",
    },
    {
      image: "https://img.freepik.com/free-photo/delicious-lobster-gourmet-seafood_23-2151713033.jpg?t=st=1725272171~exp=1725275771~hmac=6d1db8cfaa056a9bc2a6244392dfd0e0cfb8af7c622660e20469b3055e02431b&w=996",
      title: "Made In Portugal Suede Pamela Wool Lined Boots",
      brand: "MIZ MOOZ",
      price: "79.99",
      rating: "4.8",
      reviews: "200",
    },
    {
      image: "https://img.freepik.com/free-photo/delicious-lobster-gourmet-seafood_23-2151713033.jpg?t=st=1725272171~exp=1725275771~hmac=6d1db8cfaa056a9bc2a6244392dfd0e0cfb8af7c622660e20469b3055e02431b&w=996",
      title: "Classic Mini Iridescent Boots",
      brand: "REVEAL DESIGNER",
      price: "119.99",
      rating: "5.0",
      reviews: "500",
    },
    {
      image: "https://img.freepik.com/free-photo/delicious-lobster-gourmet-seafood_23-2151713033.jpg?t=st=1725272171~exp=1725275771~hmac=6d1db8cfaa056a9bc2a6244392dfd0e0cfb8af7c622660e20469b3055e02431b&w=996",
      title: "Men's Via Olympus Cushioned Running Sneakers",
      brand: "ALTRA",
      price: "99.99",
      rating: "4.3",
      reviews: "300",
    },
  ];
  return (
    <>
      <UserLayout>
          <div>USER index</div>
          <div>
            <div className="products">
              {products.map((product, index) => (
                <Product key={index} {...product} />
              ))}
            </div>
          </div>
      </UserLayout>
    </>
    
  )
}

export default Index