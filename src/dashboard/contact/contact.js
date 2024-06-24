import React, { useState, useEffect } from 'react';


import ListContacts from './list_contact';
// import InfoCustomer from './infoCustomer';

const backendUrl = process.env.REACT_APP_BACKEND_URL;


function Contact() {
  const [showBAndC, setShowBAndC] = useState(false);
  const [additionalData, setAdditionalData] = useState("");

  const handleDelete = (data) => {
    setShowBAndC(true);
    setAdditionalData(data); // Lưu trữ dữ liệu bổ sung từ component C
    Recall_listCustomer();
  };

  const [contacts, setContacts] = useState([]);
  

  const Recall_listCustomer = async () => {
    try {
        const customers = await fetch(`${backendUrl}/api/get/contact`);
        const json = await customers.json();
        console.log("customers: ", json);
        if (json){setContacts(json);}
            

    } catch (error) {
      console.log(error);
    } 
};



  useEffect(() => {
    // Gọi API hoặc thao tác lấy dữ liệu đơn hàng ở đây
    
    const listCustomer = async () => {
        try {
            const customers = await fetch(`${backendUrl}/api/get/contact`);
            const json = await customers.json();
            console.log("customers: ", json);
            if (json){setContacts(json);}
                

        } catch (error) {
          console.log(error);
        } 
    };
    listCustomer();

  }, []);
  
  return (
    <React.Fragment>
      {/* {showBAndC ? <InfoCustomer email={additionalData} /> : ( */}
        <React.Fragment>
        <div className="list-order_container">
          {/* <Total_customer total={customer.length} /> */}
          <ListContacts list_contacts={contacts} onDelete={handleDelete} />
          </div>
        </React.Fragment>
      {/* )} */}
   
   </React.Fragment>
  );
}

export default Contact;
