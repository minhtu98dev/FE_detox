import React, { useState, useEffect } from "react";
// import './list_customer.css'
import { RiEdit2Line } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
// import Total_bill from '../total_bill/total_bill';
// import Bill_month from '../bill_month/bill_month';
// import Doanhso from '../doanhso/doanhso';
// import EditOrder from './edit_order';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const ListContacts = ({ list_contacts, onDelete }) => {
  const [contacts, setContacts] = useState([]);
  // Sử dụng useEffect để cập nhật state contacts khi list_customers thay đổi
  useEffect(() => {
    setContacts(list_contacts);
  }, [list_contacts]);

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5); // Số đơn hàng trên mỗi trang
  const [search, setSearch] = useState("");

  const get_customer_search = () => {
    console.log(search);
    fetchDataSearch();
  };
  // useEffect(() => {
  //   // Gọi API hoặc thao tác lấy dữ liệu đơn hàng ở đây
  //   const fetchData = async () => {
  //       try {
  //           const fetchedOrders = await fetch(`${backendUrl}/api/get/order`);
  //           const json = await fetchedOrders.json();
  //           console.log("fetchedOrders: ", json);

  //           setOrders(json);

  //       } catch (error) {
  //         console.log(error);
  //       }
  //   };
  //   fetchData();

  // }, []);

  // Tính chỉ số của đơn hàng đầu tiên và đơn hàng cuối cùng trên trang hiện tại
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentcontacts = contacts.slice(indexOfFirstOrder, indexOfLastOrder);

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Xử lý chuyển đến trang kế tiếp
  const nextPage = () => {
    if (currentPage < Math.ceil(contacts.length / ordersPerPage)) {
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

  const [status_delete, setStatusDelete] = useState("");
  const handleDeleteStatus = (e) => {
    console.log(e.target.value);
    setStatusDelete(e.target.value);
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

  //   const [showPopup, setShowPopup] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [uuid_edit, setUuidEdit] = useState("");
  const getUserNameByUUID = (uuid) => {
    const customerWithUUID = contacts.find((contact) => contact.uuid === uuid);
    return customerWithUUID;
  };
  //   const openPopup = ({uuid}) => {
  //     setUuidEdit(uuid);
  //     console.log(uuid);
  //     const data_user_edit = getUserNameByUUID(uuid);
  //     setUsername(data_user_edit.name);
  //     setUserAddress(data_user_edit.address);
  //     setUserPhone(data_user_edit.phone);
  //     setUserEmail(data_user_edit.email);
  //     setShowPopup(true);
  //   };

  //   const closePopup = () => {
  //     setShowPopup(false);
  //   };

  const openPopupDelete = ({ uuid }) => {
    setUuidEdit(uuid);
    setShowPopupDelete(true);
  };

  const closePopupDelete = () => {
    setShowPopupDelete(false);
  };

  const fetchDataSearch = async () => {
    try {
      // Thêm độ trễ 1 giây (1000 miliseconds) trước khi gọi API
      setTimeout(async () => {
        const fetchedOrders = await fetch(
          `${backendUrl}/api/get/contact/name/${search}`
        );
        const json = await fetchedOrders.json();
        console.log("fetchedOrders: ", json);
        setContacts(json.data);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const ApplyDelete = () => {
    const url = `${backendUrl}/api/delete/contact/id/${uuid_edit}`;

    fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
    alert("Xóa thành công");
    // navigate("/cart")
    // window.scrollTo(0, 0);
    onDelete(uuid_edit);

    setShowPopupDelete(false);
    // fetchDataReload();
  };

  const handleCustomerClick = (event) => {
    onDelete(event); // Gọi hàm xóa từ component cha
  };

  return (
    <div className="admin-order">
      {/* {showPopup && <div className="overlay"></div>}
        {showPopupDelete && <div className="overlay"></div>} */}

      <div className="thongtin">
        {/* <Total_bill total={orders.length}></Total_bill>
            <Bill_month total={ordersMonth.length}></Bill_month>
            <Doanhso total={revenueTotal}></Doanhso> */}
      </div>

      <h3>LIÊN HỆ KHÁCH HÀNG</h3>

      <div className="top">
        <div className="top-left">
          <div className="show">
            Dữ liệu/trang
            <select onChange={handleOrdersPerPageChange} value={ordersPerPage}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
          {/* <div className='search'>
                
                    <input
                        type="search"
                        id="search"
                        value={search}
                        placeholder="Search..."
                        onChange={(e) => setSearch(e.target.value)}
                        required
                    />
                    <button onClick={get_customer_search}>Tìm tên</button>
                </div> */}
        </div>
        <div className="top-right">
          {/* <button>+ Create contact</button> */}
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên khách hàng</th>
            <th>Email</th>
            <th>Thời gian</th>
            <th>Nội dung</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentcontacts.map((contact, index) => (
            <tr key={contact.id}>
              <td>{index + 1}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{convert_time(contact._create_time)}</td>
              <td>{contact.content}</td>

              <td>
                {/* <button className='bt-edit' onClick={() => openPopup({ uuid: contact.uuid })}><RiEdit2Line></RiEdit2Line></button> */}

                <button
                  className="bt-delete"
                  onClick={() => openPopupDelete({ uuid: contact.uuid })}
                >
                  <AiOutlineDelete></AiOutlineDelete>
                </button>
              </td>
            </tr>
          ))}

          {showPopupDelete && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
              <div className="bg-white p-8 rounded shadow-lg">
                <h2 className="mb-5 text-xl font-bold">
                  Bạn muốn xóa sản phẩm này ?
                </h2>
                <div className="action flex justify-center mt-4">
                  <button onClick={closePopupDelete}>Đóng</button>
                  <button onClick={ApplyDelete}>Xóa</button>
                </div>
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
            { length: Math.ceil(contacts.length / ordersPerPage) },
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
              currentPage === Math.ceil(contacts.length / ordersPerPage)
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
    </div>
  );
};

export default ListContacts;
