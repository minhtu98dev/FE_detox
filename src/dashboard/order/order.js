import React, { useState, useEffect } from "react";
import "./order.css";
import { RiEdit2Line } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import Total_bill from "../total_bill/total_bill";
import Bill_month from "../bill_month/bill_month";
import Doanhso from "../doanhso/doanhso";
import EditOrder from "./edit_order";
import InfoOrder from "./infoOrder";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Order = () => {
  console.log("Order");
  const [orders, setOrders] = useState([]);
  const [ordersSuccess, setOrdersSuccess] = useState([]);
  const [ordersMonth, setOrdersMonth] = useState([]);
  const [revenueTotal, setRevenueTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5); // Số đơn hàng trên mỗi trang
  const [search, setSearch] = useState("");
  const [searchSdt, setSearchSdt] = useState("");
  // Giả sử orders là một mảng chứa thông tin đơn hàng
  const fetchDataReload = async () => {
    try {
      // Thêm độ trễ 1 giây (1000 miliseconds) trước khi gọi API
      setTimeout(async () => {
        const fetchedOrders = await fetch(`${backendUrl}/api/get/order`);
        const json = await fetchedOrders.json();
        console.log("fetchedOrders reload: ", json);
        setOrders(json);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };
  const monthorderReload = async () => {
    try {
      // Thêm độ trễ 1 giây (1000 miliseconds) trước khi gọi API
      setTimeout(async () => {
        const fetchedOrders = await fetch(`${backendUrl}/api/get/monthOrder`);
        const json = await fetchedOrders.json();
        // console.log("fetchedOrders: ", json);

        setOrdersMonth(json);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const revenueReload = async () => {
    try {
      // Thêm độ trễ 1 giây (1000 miliseconds) trước khi gọi API
      setTimeout(async () => {
        const fetchedOrders = await fetch(`${backendUrl}/api/get/revenue`);
        const json = await fetchedOrders.json();
        // console.log("fetchedOrders: ", json);

        setRevenueTotal(json["revenue"]);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataSucessReload = async () => {
    try {
      // Thêm độ trễ 1 giây (1000 miliseconds) trước khi gọi API
      setTimeout(async () => {
        const fetchedOrders = await fetch(`${backendUrl}/api/get/orderSuccess`);
        const json = await fetchedOrders.json();
        // console.log("fetchedOrders: ", json);

        setOrdersSuccess(json);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Gọi API hoặc thao tác lấy dữ liệu đơn hàng ở đây

    const fetchData = async () => {
      try {
        const fetchedOrders = await fetch(`${backendUrl}/api/get/order`);
        const json = await fetchedOrders.json();
        console.log("fetchedOrders: ", json);

        setOrders(json);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    const fetchDataSucess = async () => {
      console.log("vao day");
      try {
        const fetchedOrders = await fetch(`${backendUrl}/api/get/orderSuccess`);
        const json = await fetchedOrders.json();
        console.log("orderSuccess: ", json);

        setOrdersSuccess(json);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataSucess();

    const monthorder = async () => {
      try {
        const fetchedOrders = await fetch(`${backendUrl}/api/get/monthOrder`);
        const json = await fetchedOrders.json();
        // console.log("fetchedOrders: ", json);

        setOrdersMonth(json);
      } catch (error) {
        console.log(error);
      }
    };
    monthorder();

    const revenue = async () => {
      try {
        const fetchedOrders = await fetch(`${backendUrl}/api/get/revenue`);
        const json = await fetchedOrders.json();
        // console.log("fetchedOrders: ", json);

        setRevenueTotal(json["revenue"]);
      } catch (error) {
        console.log(error);
      }
    };
    revenue();
  }, []);

  // Tính chỉ số của đơn hàng đầu tiên và đơn hàng cuối cùng trên trang hiện tại
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

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

  const search_name = () => {
    console.log("search_name: ", search);
    fetchDataSearchName();
  };

  const search_code_order = () => {
    fetchDataSearchOrderId();
  };

  const search_sdt = () => {
    console.log("search_code_order: ", search);
    fetchDataSearchSdt();
  };

  const fetchDataSearchName = async () => {
    try {
      // Thêm độ trễ 1 giây (1000 miliseconds) trước khi gọi API
      setTimeout(async () => {
        const fetchedOrders = await fetch(
          `${backendUrl}/api/get/order/name/${search}`
        );
        const json = await fetchedOrders.json();
        console.log("fetchedOrders: ", json);
        setOrders(json);
      }, 100);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataSearchOrderId = async () => {
    try {
      // Thêm độ trễ 1 giây (1000 miliseconds) trước khi gọi API
      setTimeout(async () => {
        const fetchedOrders = await fetch(
          `${backendUrl}/api/get/order/code/${search}`
        );
        const json = await fetchedOrders.json();
        console.log("fetchedOrders: ", json);
        setOrders(json);
      }, 100);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataSearchSdt = async () => {
    try {
      // Thêm độ trễ 1 giây (1000 miliseconds) trước khi gọi API
      setTimeout(async () => {
        const fetchedOrders = await fetch(
          `${backendUrl}/api/get/order/phone/${search}`
        );
        const json = await fetchedOrders.json();
        console.log("fetchedOrders: ", json);
        setOrders(json);
      }, 100);
    } catch (error) {
      console.log(error);
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

  // const [status_delete, setStatusDelete] = useState("");
  // const handleDeleteStatus = (e) =>{
  //   console.log(e.target.value);
  //   setStatusDelete(e.target.value);
  // }

  const convert_time = (str_time) => {
    const date = new Date(str_time);
    // const formattedDate = `${("0" + date.getDate()).slice(-2)}/${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()} ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${("0" + date.getSeconds()).slice(-2)}`;
    const formattedDate = `${("0" + date.getDate()).slice(-2)}/${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}/${date.getFullYear()} `;

    return formattedDate;
  };

  const [showPopup, setShowPopup] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [uuid_edit, setUuidEdit] = useState("");

  const openPopup = ({ uuid }) => {
    setUuidEdit(uuid);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const openPopupDelete = ({ uuid }) => {
    setUuidEdit(uuid);
    setShowPopupDelete(true);
  };

  const closePopupDelete = () => {
    setShowPopupDelete(false);
  };

  const ApplyDelete = () => {
    const url = `${backendUrl}/api/delete/order/id/${uuid_edit}`;

    fetch(`${url}`, {
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

    setShowPopupDelete(false);
    fetchDataReload();
    monthorderReload();
    revenueReload();
    fetchDataSucessReload();
  };

  const ApplyEdit = () => {
    const data_edit = {
      uuid: uuid_edit,
      status: status_edit,
    };

    console.log(data_edit);
    const params = data_edit;

    const queryParams = new URLSearchParams(params);

    fetch(`${backendUrl}/api/edit/order?${queryParams}`, {
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
    monthorderReload();
    revenueReload();
    fetchDataSucessReload();
  };
  const [showBAndC, setShowBAndC] = useState(false);
  const [additionalData, setAdditionalData] = useState("");
  const handleCustomerClick = (event) => {
    setShowBAndC(true);
    setAdditionalData(event);
  };
  return (
    <div className="admin-order">
      {showBAndC ? (
        <InfoOrder uuid={additionalData} />
      ) : (
        <React.Fragment>
          {showPopup && <div className="overlay"></div>}
          {showPopupDelete && <div className="overlay"></div>}

          <div className="thongtin">
            <Total_bill total={ordersSuccess.length}></Total_bill>
            <Bill_month total={ordersMonth.length}></Bill_month>
            <Doanhso total={revenueTotal}></Doanhso>
          </div>

          <h3>ĐƠN HÀNG</h3>

          <div className="top">
            <div className="top-left">
              <div className="show">
                Đơn hàng/trang
                <select
                  onChange={handleOrdersPerPageChange}
                  value={ordersPerPage}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
              </div>
              <div className="search">
                <input
                  type="search"
                  id="search"
                  value={search}
                  placeholder="Search..."
                  onChange={(e) => setSearch(e.target.value)}
                  required
                />
                <button onClick={search_name}>Tìm tên</button>
                <button onClick={search_code_order}>Tìm Mã đơn</button>
                <button onClick={search_sdt}>Tìm SĐT</button>
              </div>
            </div>
            <div className="top-right">
              {/* <button>+ Create Order</button> */}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã đơn</th>
                <th>Tên khách hàng</th>
                <th>SĐT</th>
                <th>Ngày</th>
                <th>Thành tiền</th>
                <th>Thanh toán</th>
                <th>Trạng thái</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order, index) => (
                <tr key={order.id}>
                  <td onClick={() => handleCustomerClick(order.uuid)}>
                    {index + 1}
                  </td>
                  <td onClick={() => handleCustomerClick(order.uuid)}>
                    {order.id_order}
                  </td>
                  <td onClick={() => handleCustomerClick(order.uuid)}>
                    {order.name}
                  </td>
                  <td onClick={() => handleCustomerClick(order.uuid)}>
                    {order.phone}
                  </td>
                  <td onClick={() => handleCustomerClick(order.uuid)}>
                    {convert_time(order._create_time)}
                  </td>
                  <td onClick={() => handleCustomerClick(order.uuid)}>
                    {order.billTotal}
                  </td>
                  <td onClick={() => handleCustomerClick(order.uuid)}>
                    {order.payment}
                  </td>
                  <td
                    onClick={() => handleCustomerClick(order.uuid)}
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
                    {<p>{order.status}</p>}
                  </td>
                  <td>
                    <button
                      className="bt-edit"
                      onClick={() => openPopup({ uuid: order.uuid })}
                    >
                      <RiEdit2Line></RiEdit2Line>
                    </button>

                    {/* <button className='bt-edit'><RiEdit2Line></RiEdit2Line></button> */}
                    {order.status !== "Hoàn thành" && (
                      <button
                        className="bt-delete"
                        onClick={() => openPopupDelete({ uuid: order.uuid })}
                      >
                        <AiOutlineDelete></AiOutlineDelete>
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {showPopupDelete && (
                <div className="popup">
                  <h2>Bạn muốn xóa đơn hàng này?</h2>
                  <br></br>
                  <div className="action">
                    <button onClick={closePopupDelete}>Đóng</button>
                    <button onClick={ApplyDelete}>Xóa</button>
                  </div>
                </div>
              )}

              {showPopup && (
                <div className="popup">
                  <h2 className="text-xl font-semibold mb-4">
                    Thay đổi trạng thái đơn hàng
                  </h2>
                  <select
                    className="block w-full p-2 border border-gray-300 rounded mb-4"
                    onChange={handleEditStatus}
                  >
                    <option>Trạng thái</option>
                    <option value={"Chưa giao"}>Chưa giao</option>
                    <option value={"Hoàn thành"}>Hoàn thành</option>
                    <option value={"Hủy"}>Hủy</option>
                  </select>
                  <div className="action flex justify-end">
                    <button onClick={closePopup}>Đóng</button>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={ApplyEdit}
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              )}
            </tbody>
          </table>
          <div>
            <ul className="pagination">
              <button
                className="btnext"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M16 19V5l-11 7z" transform="rotate(120 12 12)" />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </ul>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Order;
