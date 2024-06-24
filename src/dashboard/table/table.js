import React, { useState, useEffect } from 'react';

const Table = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5); // Số đơn hàng trên mỗi trang

  // Giả sử orders là một mảng chứa thông tin đơn hàng
  useEffect(() => {
    // Gọi API hoặc thao tác lấy dữ liệu đơn hàng ở đây
    // Ví dụ:
    const fetchedOrders = [
      { id: 1, customerName: 'Khách hàng A', status: 'Hoàn thành', total: 100 },
      { id: 2, customerName: 'Khách hàng B', status: 'Đang xử lý', total: 150 },
      // Thêm các thông tin đơn hàng khác vào đây
    ];
    setOrders(fetchedOrders);
  }, []);

  // Tính chỉ số của đơn hàng đầu tiên và đơn hàng cuối cùng trên trang hiện tại
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Thay đổi số lượng đơn hàng trên mỗi trang
  const handleOrdersPerPageChange = (e) => {
    setOrdersPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Chuyển về trang đầu tiên khi thay đổi số lượng đơn hàng trên mỗi trang
  };

  return (
    <div>
      <h1>Đơn hàng</h1>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên khách hàng</th>
            <th>Trạng thái</th>
            <th>Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.customerName}</td>
              <td>{order.status}</td>
              <td>{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <select onChange={handleOrdersPerPageChange} value={ordersPerPage}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, i) => (
            <li key={i}>
              <button onClick={() => paginate(i + 1)}>{i + 1}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Table;
