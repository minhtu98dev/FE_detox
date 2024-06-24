import React from 'react';
import './total_customer.css'
import total_bill from '../images/total_bill.PNG'


function Total_customer({total}) {
  
  
  return (
    <div className="total_bill_container">
        <div className='image'>
            <img src={total_bill} alt="Total_bill_Image" />
        </div>
        <div className='body'>
            <p className='title'>Khách hàng</p>
            <p className='total'>{total}</p>
        </div>
      
    </div>
    
  );
}

export default Total_customer;
