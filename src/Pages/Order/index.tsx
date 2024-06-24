import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./list_order.css";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { formatCurrency } from "@/Helper/helper";

export interface UserContactFrm {
  name: string;
  email: string;
  contentContact: string;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  name: string;
  id_order: string;
  _create_time: string;
  phone: string;
  billTotal: string;
  status: string;
  address: string;
}

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function OrderUser() {
  const { email } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(4);

  useEffect(() => {
    const infoCustomer = async () => {
      try {
        const response = await fetch(
          `${backendUrl}/api/get/infoCustomer/email/${email}`
        );
        const json = await response.json();
        setCustomer(json.data);
      } catch (error) {
        console.log(error);
      }
    };
    infoCustomer();
  }, [email]);

  useEffect(() => {
    const orderCustomer = async () => {
      try {
        const response = await fetch(
          `${backendUrl}/api/get/order/customer/${email}`
        );
        const json = await response.json();
        setOrders(json.data);
      } catch (error) {
        console.log(error);
      }
    };
    orderCustomer();
  }, [email]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < Math.ceil(orders.length / ordersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const convert_time = (str_time: string) => {
    const date = new Date(str_time);
    return `${("0" + date.getDate()).slice(-2)}/${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}/${date.getFullYear()}`;
  };

  return (
    <div className="relative">
      <div>
        <div>
          <h3 className="flex justify-center mt-5 text-xl font-bold">
            Đơn hàng đã mua
          </h3>
          <div>
            <div>
              <div className="mx-[20px] md:mx-[100px] lg:mx-[300px] xl:mx-[400px] flex justify-between items-center mb-2 mt-8 text-[10px] md:text-sm lg:text-base font-semibold">
                <div className="flex-1 text-start mb-5">STT</div>
                <div className="flex-1 text-start mb-5">Tên khách hàng</div>
                <div className="flex-1 text-start mb-5">Địa chỉ</div>
                <div className="flex-1 text-start mb-5">Ngày mua hàng</div>
                <div className="flex-1 text-start mb-5">Số điện thoại</div>
                <div className="flex-1 text-end mb-5">Tổng tiền</div>
              </div>
            </div>
          </div>
          {currentOrders.map((order, index) => (
            <div
              className="mx-[20px] md:mx-[100px] lg:mx-[300px] xl:mx-[400px] border-b-[1.5px] border-b-[#989494] flex justify-between items-center mb-8 text-[10px] md:text-sm lg:text-base"
              key={order.id}
            >
              <div className="flex-1  text-start mb-5">{index + 1}</div>
              <div className="flex-1 text-start mb-5">{order.name}</div>
              <div className="flex-1 text-start mb-5">{order.address}</div>
              <div className="flex-1 text-start mb-5">
                {convert_time(order._create_time)}
              </div>
              <div className="flex-1 text-start mb-5">{order.phone}</div>
              <div className="flex-1 text-end mb-5">
                {formatCurrency(parseFloat(order.billTotal))}
              </div>
            </div>
          ))}
          <div>
            <ul className="pagination flex justify-center mt-5 gap-5 text-xs md:text-base">
              <button onClick={prevPage} disabled={currentPage === 1}>
                <FaArrowLeftLong />
              </button>
              {Array.from(
                { length: Math.ceil(orders.length / ordersPerPage) },
                (_, i) => (
                  <button
                    key={i}
                    className={currentPage === i + 1 ? "font-extrabold" : ""}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                )
              )}
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(orders.length / ordersPerPage)
                }
              >
                <FaArrowRightLong />
              </button>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
