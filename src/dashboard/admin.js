import React, {useState, useEffect} from 'react';
import './admin.css'
import Header_admin from './header_admin/header_admin';
import { FaBeer } from 'react-icons/fa';


import Order from './order/order';
import Product from './product/product';
import Customer from './customer/customer';
import TypeProduct from './type_product/type_product';
import { useNavigate } from 'react-router-dom';
import Contact from './contact/contact';
import AddNews from './add_news/add_news';
function Admin() {
  const storedUsername = localStorage.getItem('username');
  const isAdmin = localStorage.getItem('isAdmin');
  const navigate = useNavigate();

  console.log("isAdmin: ", isAdmin)
  

  useEffect(() => {
      // Gọi navigate() trong useEffect
      if (!isAdmin){
        console.log("ok");
        navigate(`/login`);
      }
  }, [isAdmin]); // Chỉ gọi một lần sau khi thành phần được render



  const [selectedButton, setSelectedButton] = useState("Order");
  const [showOrder, setShowOrder] = useState("Order");
  const [renderKey, setRenderKey] = useState(Date.now()); // Khởi tạo key với thời gian hiện tại

  const handleButtonClick = (button) => {
    console.log("click");
    
    setSelectedButton(button);
    setShowOrder(button);
    setRenderKey(Date.now());
    // if (button === 'Order') {
    //   setShowOrder(true);
    // } else {
    //   setShowOrder(false);
    // }
  };
  
  
  return (
    <div className="admin_container">
      <Header_admin></Header_admin>
      <div className="admin_container_body">
      <div className='left'>
        <div className='left-top'>
          
          <svg width="26px" height="26px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="#000000" stroke-width="2" d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5ZM14 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5ZM4 16a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3ZM14 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-6Z"></path> </g></svg> 
          <h2>Trang quản lý</h2>
        </div>
        
        <div className='left-chil'>
          <div className="vertical-line"></div>
          <div className='button'>
          <button
              className={selectedButton === "Order" ? "active" : ""}
              onClick={() => handleButtonClick("Order")}
            >
              Đơn Hàng
            </button>
            <button
              className={selectedButton === "Customer" ? "active" : ""}
              onClick={() => handleButtonClick("Customer")}
            >
              Khách hàng
            </button>
            <button
              className={selectedButton === "Product" ? "active" : ""}
              onClick={() => handleButtonClick("Product")}
            >
              Sản phẩm
            </button>

            <button
              className={selectedButton === "TypeProduct" ? "active" : ""}
              onClick={() => handleButtonClick("TypeProduct")}
            >
              Loại Sản phẩm
            </button>

            <button
              className={selectedButton === "news" ? "active" : ""}
              onClick={() => handleButtonClick("news")}
            >
              Tin tức
            </button>

            <button
              className={selectedButton === "Contact" ? "active" : ""}
              onClick={() => handleButtonClick("Contact")}
            >
              Liên hệ
            </button>
          </div>

          
      </div>
      </div>
      

      
      <div className='right' key={renderKey}>
        {showOrder === 'Order' && <Order />}
        {showOrder === 'Product' && <Product />}
        {showOrder === 'Customer' && <Customer/>}
        {showOrder === 'TypeProduct' && <TypeProduct/>}
        {showOrder === 'Contact' && <Contact/>}
        {showOrder === 'news' && <AddNews/>}
        
        
      </div>
      </div>
      


      {/* <Order></Order> */}
    </div>
    
  );
}

export default Admin;
