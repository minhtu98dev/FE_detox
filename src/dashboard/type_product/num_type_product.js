import React from 'react';
import image from '../images/type_product.PNG'


function TYpeProduct({total}) {
  
  
  return (
    <div className="doanhso_container">
        <div className='image'>
            <img src={image} alt="doanh_so_Image" />
        </div>
        <div className='body'>
            <p className='title'>Loại sản phẩm</p>
            <p className='total'>{total}</p>
        </div>
      
    </div>
    
  );
}

export default TYpeProduct;
