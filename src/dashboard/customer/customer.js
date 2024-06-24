import React, { useState, useEffect } from 'react';


import Total_customer from './total_customer';
import ListCustomer from './list_customer';

import InfoCustomer from './infoCustomer';

const backendUrl = process.env.REACT_APP_BACKEND_URL;


function Customer() {
  const [showBAndC, setShowBAndC] = useState(false);
  const [additionalData, setAdditionalData] = useState("");

  const handleDelete = (data) => {
    setShowBAndC(true);
    setAdditionalData(data); // Lưu trữ dữ liệu bổ sung từ component C
  };

  const [customer, setCustomer] = useState([]);
  
  useEffect(() => {
    // Gọi API hoặc thao tác lấy dữ liệu đơn hàng ở đây
    
    const listCustomer = async () => {
        try {
            const customers = await fetch(`${backendUrl}/api/get/customer`);
            const json = await customers.json();
            console.log("customers: ", json);
            setCustomer(json.data);

        } catch (error) {
          console.log(error);
        } 
    };
    listCustomer();

  }, []);
  
  return (
    <React.Fragment>
      {showBAndC ? <InfoCustomer email={additionalData} /> : (
        <React.Fragment>
        <div className="list-order_container">
          <Total_customer total={customer.length} />
          <ListCustomer list_customers={customer} onDelete={handleDelete} />
          </div>
        </React.Fragment>
      )}
   
   </React.Fragment>
  );
}

export default Customer;
