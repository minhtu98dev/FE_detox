import React from 'react';
import './total_product.css'
import image from '../images/total_product.PNG'


function TotalProduct({total}) {
  
  
  return (
    <div className="doanhso_container">
        <div className='image'>
            <img src={image} alt="doanh_so_Image" />
        </div>
        <div className='body'>
            <p className='title'>Số lượng sản phẩm</p>
            <p className='total'>{total}</p>
        </div>
      
    </div>
    
  );
}

export default TotalProduct;
