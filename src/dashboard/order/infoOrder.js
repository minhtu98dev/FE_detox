import React, { useState, useEffect } from "react";
import "./infoOrder.css";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function InfoOrder({ uuid }) {
  const [customer, setCustomer] = useState([]);

  const [orders, setOrders] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [ordersPerPage, setOrdersPerPage] = useState(5);
  const formatCurrency = (number) => {
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  useEffect(() => {
    // Gọi API hoặc thao tác lấy dữ liệu đơn hàng ở đây

    const orderCustomer = async () => {
      try {
        const a = await fetch(`${backendUrl}/api/get/order/id/${uuid}`);
        const json = await a.json();
        console.log("order: ", json);
        console.log("orders: ", json.data.order);
        setOrders(json.data.order);
        setCustomer(json.data.info_customer);
      } catch (error) {
        console.log(error);
      }
    };
    orderCustomer();
  }, []);

  // Tính chỉ số của đơn hàng đầu tiên và đơn hàng cuối cùng trên trang hiện tại

  // Thay đổi trang

  // const [status_edit, setStatusEdit] = useState("");
  // const handleEditStatus = (e) => {
  //   console.log(e.target.value);
  //   setStatusEdit(e.target.value);
  // };

  // const convert_time = (str_time) => {
  //   const date = new Date(str_time);
  //   const formattedDate = `${("0" + date.getDate()).slice(-2)}/${(
  //     "0" +
  //     (date.getMonth() + 1)
  //   ).slice(-2)}/${date.getFullYear()} ${("0" + date.getHours()).slice(-2)}:${(
  //     "0" + date.getMinutes()
  //   ).slice(-2)}:${("0" + date.getSeconds()).slice(-2)}`;
  //   return formattedDate;
  // };

  const [userName, setUsername] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userUUID, setUserUUID] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const openPopup = ({ uuid }) => {
    // setUuidEdit(uuid);
    console.log(uuid);
    // const data_user_edit = getUserNameByUUID(uuid);
    setUsername(customer.name);
    setUserAddress(customer.address);
    setUserPhone(customer.phone);
    setUserEmail(customer.email);
    setUserUUID(uuid);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const fetchDataReload = async () => {
    try {
      // Thêm độ trễ 1 giây (1000 miliseconds) trước khi gọi API
      setTimeout(async () => {
        const fetchedOrders = await fetch(
          `${backendUrl}/api/get/order/id/${uuid}`
        );
        const json = await fetchedOrders.json();
        console.log("fetchedOrders: ", json);
        setOrders(json.data.order);
        setCustomer(json.data.info_customer);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const ApplyEdit = () => {
    const data_edit = {
      uuid: userUUID,
      name: userName,
      email: userEmail,
      address: userAddress,
      phone: userPhone,
    };

    console.log(data_edit);
    const params = data_edit;

    const queryParams = new URLSearchParams(params);

    fetch(`${backendUrl}/api/edit/customer?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));

    // navigate("/cart")
    // window.scrollTo(0, 0);

    setShowPopup(false);
    fetchDataReload();
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="dashboard_info_customer">
      {showPopup && <div className="overlay"></div>}
      <h2 className="text-center mt-3">THÔNG TIN ĐƠN HÀNG</h2>
      <div className="infoCustomer">
        <div className="flex justify-between items-center w-full">
          <div className="flex-1 text-center">
            <h3 className="text-lg font-semibold">khách hàng</h3>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300 ml-4"
            onClick={() => openPopup({ uuid: customer.uuid })}
          >
            Sửa
          </button>
        </div>

        <div className="body">
          <div className="body-left">
            <p className="info_p1">Họ và tên:</p>
            <p className="info_p1">Email:</p>
            <p className="info_p1">Số điện thoại:</p>
            <p className="info_p1">Địa chỉ:</p>
          </div>
          <div className="body-right">
            <p className="info_p2">{customer.name}</p>
            <p className="info_p2">{customer.email}</p>
            <p className="info_p2">{customer.phone}</p>
            <p className="info_p2">
              {" "}
              {`${customer.address || ""}${customer.address ? ", " : ""}${
                customer.ward || ""
              }${customer.ward ? ", " : ""}${customer.district || ""}${
                customer.district ? ", " : ""
              }${customer.city || ""}`}
            </p>
          </div>
        </div>
      </div>
      <div className="orderCustomer">
        <h3 className="mt-3">Đơn hàng đã mua</h3>
        <div className="productsOrder">
          {orders?.cartItems?.map((product, index) => (
            <div key={index} className="product_pay-item">
              <div className="product_cart_info">
                <img
                  src={product.avatar}
                  alt={product.product_name}
                  style={{ width: "50px", height: "50px" }}
                />
                <div className="infor">
                  <div>
                    <h4 className="font-bold text-lg">
                      {product.product_name}
                    </h4>
                    <p>Số lượng: {product.quantity}</p>
                  </div>
                  <p>{formatPrice(product.price * product.quantity)}đ</p>
                </div>
              </div>
            </div>
          ))}
          <hr className="horizontal-line mt-3 mb-3" />
          <div className="tong font-bold text-xl">
            <p>Tổng:</p> <p>{formatCurrency(orders?.billTotal || 0)}</p>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="popup_edit_customer">
          {/* <EditOrder></EditOrder> */}
          <h2 className="mb-5">Thay đổi thông tin khách hàng</h2>

          <div>
            <div className="grid grid-cols-2 mb-5">
              <p>Họ và tên</p>
              <input
                type="text"
                id="name"
                value={userName}
                placeholder="name"
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="grid grid-cols-2 mb-5">
              <p>Email: </p>
              <input
                type="text"
                id="email"
                value={userEmail}
                placeholder="email"
                onChange={(e) => setUserEmail(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="grid grid-cols-2 mb-5">
              <p>Phone: </p>
              <input
                type="text"
                id="phone"
                value={userPhone}
                placeholder="phone"
                onChange={(e) => setUserPhone(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="grid grid-cols-2 mb-5">
              <p>Địa chỉ:</p>
              <input
                type="text"
                id="address"
                value={userAddress}
                placeholder="địa chỉ"
                onChange={(e) => setUserAddress(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2">
            <button onClick={closePopup}>Đóng</button>
            <button onClick={ApplyEdit}>Lưu</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoOrder;
