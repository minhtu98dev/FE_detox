import React, { useState, useEffect } from 'react';
import './product.css'
import { RiEdit2Line } from 'react-icons/ri';
import { AiOutlineDelete } from 'react-icons/ai';

import TotalProduct from './total_product';
import TYpeProduct from './type_product';
import Create_Product from './create_product';
import Edit_Product from './edit_product';
import LoadingSpinner from '../loading';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

// import EditOrder from './edit_order';
const Product = () => {
  const [isLoading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersMonth, setOrdersMonth] = useState([]);
  const [revenueTotal, setRevenueTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5); // Số đơn hàng trên mỗi trang
  const [search, setSearch] = useState('');
  // Giả sử orders là một mảng chứa thông tin đơn hàng
  const fetchDataReload = async () => {
    try {
        // Thêm độ trễ 1 giây (1000 miliseconds) trước khi gọi API
        setTimeout(async () => {
          const fetchedOrders = await fetch(`${backendUrl}/api/product`);
          const json = await fetchedOrders.json();
          console.log("fetchedOrders: ", json);
          setOrders(json);
        }, 1000);
      } catch (error) {
        console.log(error);
      } 
    };
  useEffect(() => {
    // Gọi API hoặc thao tác lấy dữ liệu đơn hàng ở đây
    
    const fetchData = async () => {
        try {
            const fetchedOrders = await fetch(`${backendUrl}/api/product`);
            const json = await fetchedOrders.json();
            console.log("fetchedOrders: ", json);

            setOrders(json);

        } catch (error) {
          console.log(error);
        } 
    };
    fetchData();

    // const revenue = async () => {
    //     try {
    //         const json = await fetchedOrders.json();
    //         // console.log("fetchedOrders: ", json);

    //         setRevenueTotal(json["revenue"]);

    //     } catch (error) {
    //       console.log(error);
    //     } 
    // };
    // revenue();
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



  // Thay đổi số lượng đơn hàng trên mỗi trang
  const handleOrdersPerPageChange = (e) => {
    setOrdersPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Chuyển về trang đầu tiên khi thay đổi số lượng đơn hàng trên mỗi trang
  };

  const [status_edit, setStatusEdit] = useState("");
  const handleEditStatus = (e) =>{
    console.log(e.target.value);
    setStatusEdit(e.target.value);
  }


  const convert_time =(str_time) =>{
    const date = new Date(str_time);
    const formattedDate = `${("0" + date.getDate()).slice(-2)}/${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()} ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${("0" + date.getSeconds()).slice(-2)}`;
    return formattedDate
  }

  const [showPopupCreate, setShowPopupCreate] = useState(false);
  const openPopupCreate = () => {
    setShowPopupCreate(true);
  };
  
  const closePopupCreate = () => {
    setShowPopupCreate(false);
    
    // fetchDataReload();
  };

  const reloadData = () =>{
    console.log("tat loading");
    setLoading(false);
    fetchDataReload();
  }



  const [showPopup, setShowPopup] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [uuid_edit, setUuidEdit] = useState("");
  
  const openPopup = ({uuid}) => {
    setUuidEdit(uuid);
    setShowPopup(true);
  };
  
  const closePopup = () => {
    setShowPopup(false);
    fetchDataReload();
  };

  const openPopupDelete = ({uuid}) => {
    setUuidEdit(uuid);
    setShowPopupDelete(true);
  };
  
  const closePopupDelete = () => {
    setShowPopupDelete(false);
  };
  const ApplyDelete =()=>{
    
    const url = `${backendUrl}/api/delete/product/id/${uuid_edit}`;

    setLoading(true);
    fetch(`${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        })
        .then(response => response.json())
        .then(data =>{
          // console.log(data);
          
          alert("Xóa sản phẩm thành công");
          setLoading(false);
          fetchDataReload();
        })
        .catch(error => console.error('Error:', error));
        
        // navigate("/cart")
        // window.scrollTo(0, 0);





    setShowPopupDelete(false);
    
    // monthorderReload();
    // revenueReload();
  }

  const ApplyEdit = () => {

    const data_edit = {
        uuid: uuid_edit,
        status: status_edit
    }



    console.log(data_edit);
    const params = data_edit;

    const queryParams = new URLSearchParams(params);

    fetch(`${backendUrl}/api/edit/order?${queryParams}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
        
        // navigate("/cart")
        // window.scrollTo(0, 0);





    setShowPopup(false);
    fetchDataReload();
  };
  
  const handleLoading = () => {
    setLoading(true); // Đặt isLoading thành true
  };

  const fetchDataSearch = async () => {
    try {
        // Thêm độ trễ 1 giây (1000 miliseconds) trước khi gọi API
        setTimeout(async () => {
          const fetchedOrders = await fetch(`${backendUrl}/api/get/product/name/${search}`);
          const json = await fetchedOrders.json();
          console.log("fetchedOrders: ", json);
          setOrders(json);
        }, 100);
      } catch (error) {
        console.log(error);
      } 
    };

  const get_product_search = () =>{
    console.log(search);
    fetchDataSearch();
  }
  return (
    <div className='admin-product'>
        {/* Thêm lớp overlay */}
        {isLoading && <div className="overlay"><LoadingSpinner /></div>}
        {showPopup && <div className="overlay"></div>}

        {showPopupCreate && <div className="overlay"></div>}
        <div className='thongtin'>
            <TotalProduct total={orders.length}></TotalProduct>
            <TYpeProduct total={1}></TYpeProduct>
            
        </div>

        <h3>SẢN PHẨM</h3>

        <div className='top'>
            <div className='top-left'>
                <div className='show'>
                    Sản phẩm/trang 
                    <select onChange={handleOrdersPerPageChange} value={ordersPerPage}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                </div>
                <div className='search'>
                
                    <input
                        type="search"
                        id="search"
                        value={search}
                        placeholder="Search..."
                        onChange={(e) => setSearch(e.target.value)}
                        required
                    />
                    <button onClick={get_product_search}>Tìm tên</button>
                </div>
            </div>
            <div className='top-right'>
                <button onClick={openPopupCreate}>+ Thêm sản phẩm</button>
            </div>
        </div>

      



      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Loại</th>
            <th>Giá tiền</th>
            <th>Số lượng</th>
            <th>Trạng thái</th>
            
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <img src={order.avatar} style={{ width: '30px' }} alt="doanh_so_Image" />
                    {order.product_name}
                </div>

                
                </td>
              <td>{order.type}</td>
              <td>{order.price}</td>
              <td>{order.number}</td>
              <td className={
                order.status === "Còn hàng" ? "status-delivered" :
                order.status === "Hết hàng" ? "status-cancelled" :
                ""
                }>{<p>{order.status}</p>}
                </td>
              <td>
                <button className='bt-edit' onClick={() => openPopup({ uuid: order.uuid })}><RiEdit2Line></RiEdit2Line></button>

                {/* <button className='bt-edit'><RiEdit2Line></RiEdit2Line></button> */}
                <button className='bt-delete'onClick={() => openPopupDelete({ uuid: order.uuid })}><AiOutlineDelete></AiOutlineDelete></button>
              </td>
            </tr>
          ))}


        {showPopupCreate &&(
          <div className="popup">
            <Create_Product closePopup={closePopupCreate} loading={handleLoading} reload={reloadData}></Create_Product>
          </div>
        )}
        {showPopupDelete && (
          <div className="popup">
            <h2>Bạn muốn xóa sản phẩm này?</h2>
            <div className='action'>
                <button onClick={closePopupDelete}>Đóng</button>
                <button onClick={ApplyDelete}>Xóa</button>
            </div>
          </div>
        )}
        {showPopup && (
        <div className="popup">
            <Edit_Product closePopup={closePopup} loading={handleLoading} uuid={uuid_edit} reload={reloadData}></Edit_Product>
            
        </div>
        )}
        </tbody>
      </table>
      <div>
        
        <ul className="pagination">
            <button className='btnext' onClick={prevPage} disabled={currentPage === 1}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M16 19V5l-11 7z" transform="rotate(120 12 12)"/>
</svg>
            </button>
            {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, i) => (
                <button
                    key={i}
                    className={currentPage === i + 1 ? "active" : ""}
                    onClick={() => paginate(i + 1)}
                >
                    {i + 1}
                </button>
            ))}
            <button className='btnext' onClick={nextPage} disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M8 5v14l11-7z"/>
</svg>
            </button>
        </ul>
      </div>
    </div>
  );
};

export default Product;
