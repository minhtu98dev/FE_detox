import React, { useState, useEffect } from "react";
import "./infoCustomer.css";
import { RiEdit2Line, RiCloseLine } from "react-icons/ri";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function InfoCustomer({ email }) {
  const [customer, setCustomer] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5);

  useEffect(() => {
    // Gọi API hoặc thao tác lấy dữ liệu khách hàng ở đây
    const infoCustomer = async () => {
      try {
        const customers = await fetch(
          `${backendUrl}/api/get/infoCustomer/email/${email}`
        );
        const json = await customers.json();
        console.log("customers: ", json);
        setCustomer(json.data);
      } catch (error) {
        console.log(error);
      }
    };
    infoCustomer();
  }, [email]);

  useEffect(() => {
    // Gọi API hoặc thao tác lấy dữ liệu đơn hàng ở đây
    const orderCustomer = async () => {
      try {
        const customers = await fetch(
          `${backendUrl}/api/get/order/customer/${email}`
        );
        const json = await customers.json();
        console.log("order: ", json);
        setOrders(json.data);
      } catch (error) {
        console.log(error);
      }
    };
    orderCustomer();
  }, [email]);

  // Tính chỉ số của đơn hàng đầu tiên và đơn hàng cuối cùng trên trang hiện tại
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders =
    orders && orders.length > 0
      ? orders.slice(indexOfFirstOrder, indexOfLastOrder)
      : [];

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Xử lý chuyển đến trang kế tiếp
  const nextPage = () => {
    if (currentPage < Math.ceil(orders.length / ordersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Xử lý trở về trang trước đó
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Thay đổi số lượng đơn hàng trên mỗi trang
  const handleOrdersPerPageChange = (e) => {
    setOrdersPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Chuyển về trang đầu tiên khi thay đổi số lượng đơn hàng trên mỗi trang
  };

  const [status_edit, setStatusEdit] = useState("");
  const handleEditStatus = (e) => {
    console.log(e.target.value);
    setStatusEdit(e.target.value);
  };

  const convert_time = (str_time) => {
    const date = new Date(str_time);
    const formattedDate = `${("0" + date.getDate()).slice(-2)}/${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}/${date.getFullYear()} ${("0" + date.getHours()).slice(-2)}:${(
      "0" + date.getMinutes()
    ).slice(-2)}:${("0" + date.getSeconds()).slice(-2)}`;
    return formattedDate;
  };

  const [userName, setUsername] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userUUID, setUserUUID] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = ({ uuid }) => {
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
      setTimeout(async () => {
        const fetchedOrders = await fetch(
          `${backendUrl}/api/get/infoCustomer/email/${email}`
        );
        const json = await fetchedOrders.json();
        console.log("fetchedOrders: ", json);
        setCustomer(json.data);
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

    setShowPopup(false);
    fetchDataReload();
  };

  return (
    <div className="dashboard_info_customer">
      {showPopup && <div className="overlay"></div>}
      <div className="infoCustomer">
        <div className="title">
          <h3
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              textAlign: "center",
              width: "100%",
            }}
          >
            Thông tin khách hàng
          </h3>
          <button
            className="bt-edit"
            onClick={() => openPopup({ uuid: customer.uuid })}
          >
            <RiEdit2Line />
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
        <h3
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            textAlign: "center",
            width: "100%",
          }}
        >
          Đơn hàng đã mua
        </h3>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã đơn</th>
              <th>Ngày</th>
              <th>Thành tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.id_order}</td>
                <td>{convert_time(order._create_time)}</td>
                <td>{order.billTotal}</td>
                <td
                  className={
                    order.status === "Hoàn thành"
                      ? "status-delivered"
                      : order.status === "Chưa giao"
                      ? "status-not-delivered"
                      : order.status === "Hủy"
                      ? "status-cancelled"
                      : ""
                  }
                >
                  <p>{order.status}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <ul className="pagination">
            <button
              className="btnext"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from(
              { length: Math.ceil(orders.length / ordersPerPage) },
              (_, i) => (
                <button
                  key={i}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              )
            )}
            <button
              className="btnext"
              onClick={nextPage}
              disabled={
                currentPage === Math.ceil(orders.length / ordersPerPage)
              }
            >
              Next
            </button>
          </ul>
        </div>
      </div>
      {showPopup && (
        <div className="popup_edit_customer bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto relative">
          <button
            onClick={closePopup}
            className="absolute top-2 right-2 bg-white text-red-600 text-2xl p-2 rounded-full"
          >
            <RiCloseLine />
          </button>
          <h3 className="font-bold text-2xl text-center mb-6">
            Thay đổi thông tin khách hàng
          </h3>
          <div className="info space-y-4">
            <div className="change_info flex flex-col">
              <label htmlFor="name" className="font-medium mb-1">
                Họ và tên:
              </label>
              <input
                type="text"
                id="name"
                value={userName}
                placeholder="name"
                onChange={(e) => setUsername(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="change_info flex flex-col">
              <label htmlFor="email" className="font-medium mb-1">
                Email:
              </label>
              <input
                type="text"
                id="email"
                value={userEmail}
                placeholder="email"
                onChange={(e) => setUserEmail(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="change_info flex flex-col">
              <label htmlFor="phone" className="font-medium mb-1">
                Phone:
              </label>
              <input
                type="text"
                id="phone"
                value={userPhone}
                placeholder="phone"
                onChange={(e) => setUserPhone(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="change_info flex flex-col">
              <label htmlFor="address" className="font-medium mb-1">
                Địa chỉ:
              </label>
              <input
                type="text"
                id="address"
                value={userAddress}
                placeholder="địa chỉ"
                onChange={(e) => setUserAddress(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={ApplyEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoCustomer;
