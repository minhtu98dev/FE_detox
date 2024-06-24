import React from 'react';
import './doanhso.css'
import total_bill from '../images/doanhso.PNG'


function Doanhso({total}) {
  
  
  return (
    <div className="doanhso_container">
        <div className='image'>
            <img src={total_bill} alt="doanh_so_Image" />
        </div>
        <div className='body'>
            <p className='title'>Doanh số</p>
            <p className='total'>{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</p>
        </div>
      
    </div>
    
  );
}

export default Doanhso;
