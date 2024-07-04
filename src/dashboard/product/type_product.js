import React, { useState, useEffect } from "react";

import image from "../images/type_product.PNG";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function TYpeProduct({ total }) {
  const [listTypeProduct, setListTypeProduct] = useState([]);
  useEffect(() => {
    // Gọi API hoặc thao tác lấy dữ liệu đơn hàng ở đây

    const fetchData = async () => {
      try {
        const fetchedOrders = await fetch(`${backendUrl}/api/typeProduct`);
        const json = await fetchedOrders.json();
        console.log("fetchedOrders: ", json);

        setListTypeProduct(json);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="doanhso_container">
      <div className="image">
        <img src={image} alt="doanh_so_Image" />
      </div>
      <div className="body">
        <p className="title">Loại sản phẩm</p>
        <p className="total">{listTypeProduct.length}</p>
      </div>
    </div>
  );
}

export default TYpeProduct;
