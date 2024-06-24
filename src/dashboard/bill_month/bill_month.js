import React from 'react';
import './bill_month.css'
import total_bill from '../images/bill_month.PNG'


function Bill_month({total}) {
  
  
  return (
    <div className="bill_month_container">
        <div className='image'>
            <img src={total_bill} alt="bill_month_Image" />
        </div>
        <div className='body'>
            <p className='title'>Đơn hàng trong tháng</p>
            <p className='total'>{total}</p>
        </div>
      
    </div>
    
  );
}

export default Bill_month;
