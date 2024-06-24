import React, { useState, useEffect } from 'react';
import './header_admin.css';
import {  FaUser} from 'react-icons/fa';
import { CircleUserRound} from "lucide-react";
import logo from '../../assets/image/logo1.png'
import { useNavigate } from 'react-router-dom';


function Header_admin() {
  
  const navigate = useNavigate();

  const handleButtonUserLogout = async() => {
    alert("Đăng xuất thành công");
    // Xóa thông tin đăng nhập từ Local Storage
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    navigate("/");
  }

  return (
    <div className="header_admin_container">
      <div className="logo">
        <img src={logo} alt="Logo_Image" />
      </div>
      <div className='right'>
        {/* <div className='icon'>
            <FaUser size={25}></FaUser>
        </div> */}

            
        <CircleUserRound style={{margin: '0px'}} className="mr-10 cursor-pointer header-actions-userInfo" />
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user-round mr-10 cursor-pointer header-actions-userInfo"><path d="M18 20a6 6 0 0 0-12 0"></path><circle cx="12" cy="10" r="4"></circle><circle cx="12" cy="12" r="10"></circle></svg> */}
        <div className='thongtin'>
            <p style={{ color: '#1E537C', fontSize: '18px' }}>Admin</p>
            {/* <p style={{ color: '#777171', fontSize: '12px' }}>chithanh@gmail.com</p> */}
        </div>
        <button style={{marginLeft: '15px', color: '#1E537C'}} onClick={handleButtonUserLogout}><u>Đăng xuất</u></button>
      </div>
    </div>
    
  );
}

export default Header_admin;
