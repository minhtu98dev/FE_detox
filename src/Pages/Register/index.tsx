import InputFrm from "@/Components/Input/InputFrm";
import { GrClose } from "react-icons/gr";

import { Navigate } from "react-router-dom";

import { useFormik } from "formik";
import { useAuth } from "@/Auth/AuthProvider";

import * as yup from "yup";
import { useNavigate } from 'react-router-dom';

export interface UserRegisterFrm {
    name: string,
    email: string,
    password: string,
    phone: string,
}
const backendUrl: string = process.env.REACT_APP_BACKEND_URL || ''; // Thiết lập giá trị mặc định nếu biến môi trường không được định nghĩa


export default function Register() {
    const { isLogin } = useAuth();
    const navigate = useNavigate();

    const registerFrm = useFormik<UserRegisterFrm>({
        initialValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
        },
        validationSchema: yup.object().shape({
            name: yup
                .string()
                .required("Họ và tên không được bỏ trống!")
                .matches(/^[a-z A-Z\s áàảạãăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệiíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ ÁÀẢẠÃĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴĐ]+$/, "Tên chỉ được chứa chữ cái."),
            email: yup
                .string()
                .required("Email không được bỏ trống!")
                .email("Email không hợp lệ!"),
            password: yup
                .string()
                .required("Mật khẩu không được bỏ trống!")
                .min(6, "Mật khẩu phải từ 6 đến 32 ký tự.")
                .max(32, "Mật khẩu phải từ 6 đến 32 ký tự."),
            phone: yup
                .string()
                .required("Số điện thoại không được bỏ trống!")
                .matches(/\d$/, "Vui lòng chỉ điền số!")
                .min(10, "Số điện tối thiểu là 10 số!")
                .max(10, "Số điện tối đa là 10 số!"),
            
        }),
        onSubmit: async (values: UserRegisterFrm) => {
            console.log(values)
            const response = await fetch(`${backendUrl}/api/customer/register`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify( values ),
              });
      
              if (!response.ok) {
                throw new Error('Đăng ký không thành công!');
              }
        
              // Xử lý phản hồi từ backend ở đây
              const data = await response.json();
              if (data.status==="email already exits"){
                alert("email đã tồn tại");
              }
              else if(data.status==="success"){
                alert("Đăng ký thành công \n quay lại Đăng nhập");
                navigate("/login");
              }
              

            
        },
    });

    if (isLogin) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <div className="flex justify-between items-center p-5 sm:px-10">
                <h2 className="text-2xl sm:text-[32px] leading-none font-light">Đăng Ký Tài Khoản</h2>
                <a href="/">
                    <GrClose className="w-6 h-6" />
                </a>
            </div>

            <div className="container mx-auto leading-none">
                <h2
                    className={`
                    pb-[10px] 
                    mb-[20px]

                    text-xl 
                    text-center 
                    font-medium 
                    underline 
                    underline-offset-8
                    `}>Đăng Ký
                </h2>

                <form
                    className="sm:w-[400px] max-w-full mx-auto"
                    onSubmit={registerFrm.handleSubmit}
                >
                    <div className="mb-[20px]">
                        <InputFrm
                            id="name"
                            name="name"
                            label="Họ Và Tên"
                            required
                            onInput={registerFrm.handleChange}
                            onBlur={registerFrm.handleChange}
                            disabled={false}
                        />
                        {registerFrm.errors.name && (
                            <p className="text-rose-500 text-sm mt-1">{registerFrm.errors.name}</p>
                        )}
                    </div>
                    <div className="mb-[20px]">
                        <InputFrm
                            id="email"
                            name="email"
                            label="Email"
                            required
                            onInput={registerFrm.handleChange}
                            onBlur={registerFrm.handleChange}
                            disabled={false}
                        />
                        {registerFrm.errors.email && (
                            <p className="text-rose-500 text-sm mt-1">{registerFrm.errors.email}</p>
                        )}
                    </div>
                    <div className="mb-[20px]">
                        <InputFrm
                            id="password"
                            name="password"
                            type="password"
                            label="Mật Khẩu"
                            required
                            onInput={registerFrm.handleChange}
                            onBlur={registerFrm.handleChange}
                            disabled={false}
                        />
                        {registerFrm.errors.password && (
                            <p className="text-rose-500 text-sm mt-1">{registerFrm.errors.password}</p>
                        )}
                    </div>
                    <div className="mb-[20px]">
                        <InputFrm
                            id="phone"
                            name="phone"
                            label="Số Điện Thoại"
                            required
                            onInput={registerFrm.handleChange}
                            onBlur={registerFrm.handleChange}
                            disabled={false}
                        />
                        {registerFrm.errors.phone && (
                            <p className="text-rose-500 text-sm mt-1">{registerFrm.errors.phone}</p>
                        )}
                    </div>
                    {/* <div className='mb-[20px] flex items-center'>
                        <input
                            id='gioi_tinh1'
                            name='gioi_tinh'
                            type='radio'
                            value="true"
                            className="w-6 h-6 bg-[#e4e6eb] me-2"
                            style={{ border: "1px solid #e4e6eb" }}
                            onInput={registerFrm.handleChange}
                            onBlur={registerFrm.handleChange}
                            defaultChecked
                        />
                        <label htmlFor='gioi_tinh1' className='select-none ml-2 me-4'>Nam</label>
                        <input
                            id='gioi_tinh2'
                            name='gioi_tinh'
                            type='radio'
                            value="false"
                            className="w-6 h-6 bg-[#e4e6eb] me-2"
                            style={{ border: "1px solid #e4e6eb" }}
                            onInput={registerFrm.handleChange}
                            onBlur={registerFrm.handleChange}
                        />
                        <label htmlFor='gioi_tinh2' className='select-none mx-2'>Nữ</label>
                    </div> */}

                    <button
                        type="submit"
                        disabled={!registerFrm.isValid}
                        className="w-full bg-black text-white h-[80px]"
                    >
                        Đăng ký
                    </button>
                </form>

                <div
                    className={`
                    sm:w-[400px] 
                    max-w-full 
                    mx-auto 
                    flex 
                    justify-center
                    gap-5 
                    my-[30px] 
                    `}>
                    <a
                        href="/login"
                        className="
                        text-center 
                        font-medium 
                        underline
                        underline-offset-8">
                        Quay về Đăng nhập !
                    </a>
                </div>
            </div>
        </div>
    );
}