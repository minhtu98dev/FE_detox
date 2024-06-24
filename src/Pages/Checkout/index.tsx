import { PiUserCircleFill } from "react-icons/pi";
import { FaAngleLeft } from "react-icons/fa6";
import { FaRegIdCard } from "react-icons/fa";
import { BsCreditCard } from "react-icons/bs";

import { useFormik } from "formik";
import * as yup from "yup";

import Input from "@/Components/Input/Input";
import Selection from "@/Components/Selection";

import { useSelector } from "react-redux";
import { selectCart } from "@/Redux/selectors/cart.selector";
import { Product } from "@/Types/Product.type";
import { formatCurrency, summaryPriceInCart } from "@/Helper/helper";
import { useAddress } from "@/Hooks/useAddress/useAddress";
import { useReducer, useState, useEffect } from "react";
import { useCartStorage } from "@/Hooks/useCartStorage";

import { useNavigate } from "react-router-dom";

const backendUrl: string = process.env.REACT_APP_BACKEND_URL || ""; // Thiết lập giá trị mặc định nếu biến môi trường không được định nghĩa
let addressState: any = {};

interface Option {
  id: string;
  name: string;
}
export interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
}


export interface UserPaymentFrm {
  email: string;
  name: string;
  phone: string;
  address: string;
  province: string;
  notePayment: string;
  cartItems: object;
  payment: string;
  billTotal: number;
  address_state: object;
}

type AddressState = {
  provinceId: number | string;
  districtId: number | string;
  wardId: number | string;
};

export default function CheckoutPage() {
  // * State to handle Address
  const { clearCartStorage } = useCartStorage();
  const navigate = useNavigate();
  const storedUsername = localStorage.getItem("username");
  const [customer, setCustomer] = useState<Customer | null>(null);
  // /get/infoCustomer/email/
  

    useEffect(() => {
      const infoCustomer = async () => {
        try {
          const response = await fetch(
            `${backendUrl}/api/get/infoCustomer/email/${storedUsername}`
          );
          const json = await response.json();
          setCustomer(json.data);
        } catch (error) {
          console.log(error);
        }
      };
      infoCustomer();
    }, [storedUsername]);
  

  const [state, setState] = useReducer(
    (data: AddressState, partialData: Partial<AddressState>): AddressState => {
      return { ...data, ...partialData };
    },
    {
      provinceId: "",
      districtId: "",
      wardId: "",
    }
  );

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const handleSelectPaymentMethod = (method: string) => {
    setPaymentMethod(method);
  };

  // const [totalBill, setTotalBill] = useState(0);

  const handleTotalBill = () => {
    const total: number = summaryPriceInCart(cartState) + 30000;
    // setTotalBill(total);
    return total;
  };

  const { getProvince, getDistrict, getWard }: any = useAddress();

  const cartState = useSelector(selectCart);

  const paymentFrm = useFormik<UserPaymentFrm>({
    initialValues: {
      email: storedUsername ?? '',
      name: customer?.name ?? 'a',
      phone: "",
      address: "",
      province: "",
      notePayment: "",
      cartItems: {},
      payment: "",
      billTotal: 0,
      address_state:{},
    },

    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("Họ và tên không được bỏ trống!")
        .matches(
          /^[a-z A-Z\s áàảạãăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệiíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ ÁÀẢẠÃĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴĐ]+$/,
          "Tên chỉ được chứa chữ cái."
        ),
      email: yup
        .string()
        .required("Email không được bỏ trống!")
        .email("Email không hợp lệ!"),
      phone: yup
        .string()
        .required("Số điện thoại không được bỏ trống!")
        .matches(/^0\d{9}$/, "Số điện thoại phải bắt đầu bằng số 0 và có 10 chữ số!")
        .min(10, "Số điện tối thiểu là 10 số!")
        .max(10, "Số điện tối đa là 10 số!"),
      address: yup.string().required("Địa chỉ không được bỏ trống!"),
      // province: yup.string().required("Tỉnh thành không được bỏ trống!"),
      notePayment: yup.string(),
    }),

    onSubmit: async (values: UserPaymentFrm) => {
      try {
        // Thêm trường cartItems vào values
        const updatedValues: UserPaymentFrm = {
          ...values,
          cartItems: cartState,
          payment: paymentMethod,
          billTotal: handleTotalBill(),
          address_state: addressState,
        };
        //console.log(updatedValues); // Log giá trị values
        //console.log(cartState); // Log giá trị cartState
        const response = await fetch(`${backendUrl}/api/order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Các headers khác nếu cần
          },
          body: JSON.stringify(updatedValues),
        });

        // Xử lý kết quả từ API
        if (response.ok) {
          const data = await response.json();
          if (data["status"] === "success") {
            alert("dat hang thanh cong");
            clearCartStorage();
            window.location.reload();
            // navigate("/");
          }
          // Xử lý dữ liệu trả về nếu cần
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.error("Error:", error);
        // Xử lý lỗi nếu cần    
      }
    },
  });

  const totalPrice: any = cartState.reduce(
    (accumulator: number, product: Product | any) => {
      return accumulator + product.quantity * product.gia_ban;
    },
    0
  );

  

  const handleChangeAddress = (name: string, value: string, options:Option[]) => {
    let updatedState: any = {};

    // Set the value for the input field
    updatedState[name] = value;
    console.log("name: ", name);
    const selectedOption = options.find(option => option.id === value);
    if (selectedOption){
      addressState[name] = selectedOption;
      console.log("addressState: ", addressState);
    }
    // Kiểm tra xem phần tử đã được tìm thấy hay không
    console.log("selectedOption: ", selectedOption);
    // updatedState[name] = selectedOption;
    
    // Additional logic for specific fields
    if (name === "provinceId") {
      // If provinceId is changed, reset districtId and wardId
      updatedState["districtId"] = "";
      updatedState["wardId"] = "";

      addressState["districtId"] = "";
      addressState["wardId"] = "";

      
    } else if (name === "districtId") {
      // If districtId is changed, reset wardId
      updatedState["wardId"] = "";
      addressState["wardId"] = "";
    }

    setState({
      ...updatedState,
    });
  };

  console.log({
    state,
  });

  const renderData = (): JSX.Element[] => {
    return cartState.map((item: Product | any, index) => {
      let { quantity, product_name, price, avatar } = item;

      return (
        <div
          className={`
            flex 
            flex-row 
            justify-between 
            text-[10px] 
            lg:text-xl
            font-light
            gap-7
            lg:gap-10 
            mb-[22px] 
            lg:leading-6 
            `}
          key={index}
        >
          <img
            className="w-[50px] h-[50px] lg:w-[80px] lg:h-[80px]"
            src={avatar}
            alt={avatar}
          />
          <div className="w-full">
            <p className="">{product_name}</p>
            <p className="text-[#777171]">Số lượng: {quantity}</p>
          </div>
          <span className="text-[#777171]">{formatCurrency(price)}</span>
        </div>
      );
    });
  };
  // Hàm xử lý khi nút "ĐẶT HÀNG" được nhấp
  const handlePlaceOrder = () => {
    // Thực hiện các thao tác khi đặt hàng ở đây
    console.log("Đã nhấp vào nút ĐẶT HÀNG");
  };

  return (
    <div className={`container mx-aut`}>
      <div className="hidden lg:flex justify-center pt-[17px] sm:pt-[27px]">
        <h1
          className={`
            p-[17px]
            text-xl
            sm:text-2xl
            font-bold
            sm:font-medium
            text-center
            sm:border-b-[1.5px]
            sm:border-b-black
        `}
        >
          Thanh toán
        </h1>
      </div>

      <form onSubmit={paymentFrm.handleSubmit}>
        <div className="flex flex-col-reverse lg:flex-row lg:mt-16">
          <div className="lg:w-[45%] lg:pe-[50px]">
            <div className="flex flex-row justify-between mb-[14px] lg:mb-5">
              <h1 className="text-[13px] lg:text-2xl leading-6 font-bold">
                <span className="lg:hidden">
                  <FaRegIdCard className="inline-block me-1" />
                </span>
                Thông tin mua hàng
              </h1>
              <div className="text-[13px] lg:text-base flex items-center">
                <PiUserCircleFill className="inline w-[18px] h-[18px]" />
                {storedUsername ? "" : (
                  <span className="ms-1 lg:ms-[10px]">Đăng nhập</span>
                )}
                {storedUsername && (
                  <p>{storedUsername}</p>
                )}
              </div>
            </div>

            <div className="relative">
              <Input
                id="email"
                name="email"
                value={storedUsername ?? undefined}
                placeholder="Email"
                onInput={paymentFrm.handleChange}
                onBlur={paymentFrm.handleChange}
                disabled={!!storedUsername}
              />

              {paymentFrm.errors.email && (
                <p className="text-rose-500 text-[9px] sm:text-sm indent-3 sm:indent-5 absolute bottom-0">
                  {paymentFrm.errors.email}
                </p>
              )}
            </div>

            <div className="relative">
              <Input
                id="name"
                name="name"
                //value={customer?.name}
                placeholder="Họ và tên"
                onInput={paymentFrm.handleChange}
                onBlur={paymentFrm.handleChange}
              />

              {paymentFrm.errors.name && (
                <p className="text-rose-500 text-[9px] sm:text-sm indent-3 sm:indent-5 absolute bottom-0">
                  {paymentFrm.errors.name}
                </p>
              )}
            </div>

            <div className="relative">
              <div className="flex">
                <Input
                  id="phone"
                  name="phone"
                  //value={paymentFrm.initialValues.phone !== "" ? paymentFrm.initialValues.phone : customer?.phone}


                  placeholder="Số điện thoại"
                  onInput={paymentFrm.handleChange}
                  onBlur={paymentFrm.handleChange}
                />

                <p
                  className={`
                  flex
                  items-center
                  justify-center
                  font-light
                  text-[#777171] 
                  w-12
                  mb-4 
                  sm:mb-6 
                  border 
                  border-s-0
                  border-[#777171] 
                  h-6 
                  sm:h-9
                  `}
                >
                  +84
                </p>
              </div>

              {paymentFrm.errors.phone && (
                <p className="text-rose-500 text-[9px] sm:text-sm indent-3 sm:indent-5 absolute bottom-0">
                  {paymentFrm.errors.phone}
                </p>
              )}
            </div>
            <div className="relative">
              <Input
                id="address"
                name="address"
                //value={customer?.address}
                placeholder="Địa chỉ"
                onInput={paymentFrm.handleChange}
                onBlur={paymentFrm.handleChange}
              />
              {paymentFrm.errors.address && (
                <p className="text-rose-500 text-[9px] sm:text-sm indent-3 sm:indent-5 absolute bottom-0">
                  {paymentFrm.errors.address}
                </p>
              )}
            </div>

            <div className="relative">
              <Selection
                title="Tỉnh thành"
                placeholder="Chọn tỉnh thành"
                options={getProvince()}
                displayKey={"name"}
                value={"id"} 
                name="provinceId"
                onChanged={handleChangeAddress}
                defaultValue={state.provinceId}
                customClassTrigger="mb-4"
              />

              <Selection
                title="Quận huyện"
                placeholder="Chọn quận/huyện"
                options={getDistrict(state.provinceId)}
                displayKey={"name"}
                value={"id"} 
                name="districtId"
                onChanged={handleChangeAddress}
                disabled={!state.provinceId}
                defaultValue={state.districtId}
                customClassTrigger="mb-4"
              />

              <Selection
                title="Phường xã"
                placeholder="Chọn phường/xã"
                options={getWard(state.districtId)}
                displayKey={"name"}
                value={"id"} 
                name="wardId"
                onChanged={handleChangeAddress}
                disabled={!state.provinceId || !state.districtId}
                defaultValue={state.wardId}
                customClassTrigger="mb-4"
              />

              {paymentFrm.errors.province && (
                <p className="text-rose-500 text-[9px] sm:text-sm indent-3 sm:indent-5 absolute bottom-0">
                  {paymentFrm.errors.province}
                </p>
              )}
            </div>
            <div className="flex items-center mb-1 lg:mb-2">
              <input
                className="w-[10px] h-[10px] lg:w-[25px] lg:h-[25px] me-1 lg:me-3"
                type="checkbox"
                name="diffientAddress"
                id="diffientAddress"
                value=""
              />
              <label
                className="text-[#777171] font-light leading-6 text-[10px] lg:text-base"
                htmlFor="diffientAddress"
              >
                {" "}
                Giao hàng đến địa chỉ khác
              </label>
            </div>
            <textarea
              id="notePayment"
              name="notePayment"
              className={`indent-3 sm:indent-5 h-[69px] sm:h-[104px] w-full mb-5 pt-1 text-[10px] sm:text-base`}
              placeholder="Ghi chú (tùy chọn)"
              style={{ border: "0.5px solid #777171" }}
              onInput={paymentFrm.handleChange}
              onBlur={paymentFrm.handleChange}
            ></textarea>

            <h1 className="text-[13px] lg:text-2xl leading-6 font-bold">
              <span className="lg:hidden">
                <BsCreditCard className="inline-block me-2 w-[25px] h-[25px]" />
              </span>
              Thanh toán
            </h1>

            <div className="py-2 lg:py-9 border-b-[1px] border-[#777171] ">
              <div className="flex items-center lg:mb-2">
                <input
                  className="w-[15px] h-[15px] lg:w-[25px] lg:h-[25px] me-3 lg:me-4"
                  type="radio"
                  name="payMethod"
                  id="COD"
                  value=""
                  checked
                  onChange={() => handleSelectPaymentMethod("COD")}
                />
                <label
                  className="text-[#777171] font-light leading-6 text-[10px] lg:text-base"
                  htmlFor="COD"
                >
                  Thanh toán khi nhận hàng(COD)
                </label>
              </div>
              <div className="flex items-center mb-2 lg:mt-5">
                <input
                  className="w-[15px] h-[15px] lg:w-[25px] lg:h-[25px] me-3 lg:me-4"
                  type="radio"
                  name="payMethod"
                  id="CARD"
                  value=""
                  onChange={() => handleSelectPaymentMethod("Chuyển khoản")}
                />
                <label
                  className="text-[#777171] font-light leading-6 text-[10px] lg:text-base"
                  htmlFor="CARD"
                >
                  Chuyển khoản qua ngân hàng
                </label>
              </div>

              <div className="lg:hidden text-xl border-t-[1px] border-[#777171]">
                <button
                  className={`
                  w-full
                  py-[8px] 
                  sm:py-[10px] 
                  bg-[#1E1E1E] 
                  text-white
                  mt-5
                  mb-4
                  lg:mb-0 
                  text-base`}
                  disabled={!paymentFrm.isValid}
                  type="submit"
                >
                  ĐẶT HÀNG
                </button>

                <div className="flex justify-center mb-9">
                  <a
                    href="/cart"
                    className="flex items-center text-xs text-[#777171]"
                  >
                    <FaAngleLeft className="inline me-1" />
                    <p>Quay về giỏ hàng</p>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex justify-end leading-6 text-[10px] lg:text-[13px] text-[#2B5C82] lg:text-black gap-4">
              <p>Chính sách đổi trả</p>
              <p>Chính sách bảo mật</p>
              <p>Điểu khoản sử dụng</p>
            </div>
          </div>

          <div
            className={`
            lg:w-[55%] 
            lg:bg-[#E0E0E0]
            lg:ps-[46px]
            lg:pe-[78px]
            pt-3
            lg:pt-[24px]
            lg:pb-[52px]`}
          >
            <h1
              className={`
              text-[15px]
              sm:text-2xl
              font-medium
              mb-3
              lg:mb-[68px]
          `}
            >
              Đơn hàng ({cartState.length} sản phẩm)
            </h1>

            {renderData()}

            <div
              className={`
            flex 
            flex-row 
            justify-between 
            gap-5 
            py-5 
            lg:py-8 
            border-y-[0.5px] 
            border-[#777171]`}
            >
              <input
                id="voucher"
                name="voucher"
                placeholder="Nhập mã giảm giá"
                onInput={paymentFrm.handleChange}
                onBlur={paymentFrm.handleChange}
                style={{ border: "0.5px solid #777171" }}
                className={`
                w-[80%] 
                indent-3 
                sm:indent-5 
                text-[10px] 
                sm:text-base 
                font-light 
                leading-6 
                text-[#777171] 
                text-center 
                lg:text-left`}
              />
              <button
                className={`
                w-[20%] 
                px-[15px] 
                py-[7px] 
                lg:py-[10px] 
                bg-[#1E1E1E] 
                text-white 
                text-xs 
                sm:text-base 
                whitespace-nowrap`}
              >
                Áp dụng
              </button>
            </div>

            <div
              className={`
              border-b-[1px] 
              border-[#777171] 
              text-[#777171]
              py-[13px]
              lg:py-5
              text-[13px]
              lg:text-xl
              font-light 
              leading-6`}
            >
              <div className="flex justify-between mb-1 lg:mb-5">
                <p>Tạm tính</p>
                <p>{formatCurrency(summaryPriceInCart(cartState))}</p>
              </div>
              <div className="flex justify-between">
                <p>Phí vận chuyển</p>
                <p>{formatCurrency(30000)}</p>
              </div>
            </div>

            <div>
              <div
                className={`
                  flex 
                  justify-between
                  text-[13px]
                  lg:text-xl 
                  mt-2 
                  lg:mt-3
                  mb-5
                  lg:mb-9`}
              >
                <p>Tổng cộng</p>
                <p>{formatCurrency(handleTotalBill())}</p>
                {/* <p>{formatCurrency(summaryPriceInCart(cartState) + 30000)}</p> */}
              </div>

              <div className="hidden lg:flex justify-between text-xl">
                <a href="/cart" className="flex items-center text-[#777171]">
                  <FaAngleLeft className="inline me-1" />
                  <p>Quay về giỏ hàng</p>
                </a>
                <button
                  className={`
                  px-[22px] 
                  py-[7px] 
                  sm:py-[10px] 
                  bg-[#1E1E1E] 
                  text-white 
                  mb-8 
                  lg:mb-0 
                  text-xs 
                  sm:text-base`}
                  // Gọi hàm handlePlaceOrder khi nút được nhấp
                  onClick={handlePlaceOrder}
                  disabled={!paymentFrm.isValid}
                  type="submit"
                >
                  ĐẶT HÀNG
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
