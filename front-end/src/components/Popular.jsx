import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import ServiceItem from "./ServiceItem";

const Popular = () => {
  const { products, services } = useContext(ShopContext);
  const [popularProducts, setPopularProducts] = useState([]);
  const [popularServices, setPopularServices] = useState([]);

  // Need to change the logic to get the popular products and services
  useEffect(() => {
    setPopularProducts(products.slice(0, 10));
  }, []);

  useEffect(() => {
    setPopularServices(services.slice(0, 10));
  }, []);


  return (
    <div>
      <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title  text1={'POPULAR'} text2={'PRODUCTS'}/>
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
        Explore our most popular products, carefully selected for their quality and customer satisfaction. Find top-rated items that meet your needs and elevate your lifestyle!
        </p>
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
          popularProducts.map((productItem, productIndex)=>(
            <ProductItem key={productIndex} id={productItem._id} name={productItem.name} images={productItem.image} price={productItem.price}/>
          ))
        }
      </div>

    </div>

    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title  text1={'POPULAR'} text2={'SERVICES'}/>
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
        Discover our most popular services, trusted by customers for their excellence and reliability. Get the professional support you need, tailored to your goals!
        </p>
      </div>
        {/* Rendering Services */}
      <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
          popularServices.map((serviceItem, serviceIndex)=>(
            <ServiceItem key={serviceIndex} id={serviceItem._id} name={serviceItem.name} images={serviceItem.image} price={serviceItem.price}/>
          ))
        }
      </div>

    </div>
    </div>
  );
};

export default Popular;
