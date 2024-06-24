import React, { useState } from 'react';


import Total_bill from './total_bill/total_bill';
import Bill_month from './bill_month/bill_month';
import Doanhso from './doanhso/doanhso';
import Order from './order/order';
import InfoOrder from '../order/infoOrder';
function ListOrder() {
  const [showBAndC, setShowBAndC] = useState(false);
  const [additionalData, setAdditionalData] = useState("");
  const handleDelete = (data) => {
    // setShowBAndC(true);
    console.log("ok");
    setAdditionalData(data); // Lưu trữ dữ liệu bổ sung từ component C
  };
  
  return (
    <React.Fragment>
      
        {showBAndC ? <InfoOrder uuid={additionalData} /> : (
        <React.Fragment>
          <div className="list-order_container">
            <Total_bill total={50}></Total_bill>
            <Bill_month total={100}></Bill_month>
            <Doanhso total={99999999}></Doanhso>
            <Order onInfo={handleDelete} />
          </div>
        </React.Fragment>
      )}

    
    </React.Fragment>
    
    
  );
}

export default ListOrder;
