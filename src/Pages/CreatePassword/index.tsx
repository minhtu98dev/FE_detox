import { Navigate } from "react-router-dom";

import InputFrm from "@/Components/Input/InputFrm";
import { GrClose } from "react-icons/gr";

import { useAuth } from "@/Auth/AuthProvider";
import { useFormik } from "formik";
import { useParams } from 'react-router-dom';

import * as yup from "yup";
import { useNavigate } from 'react-router-dom';

const backendUrl: string = process.env.REACT_APP_BACKEND_URL || ''; // Thiết lập giá trị mặc định nếu biến môi trường không được định nghĩa


export interface UserLoginFrm {
    email: string;
    otp: string;
    password: string;
    pre_password: string;
    remember: boolean;
}

export default function CreatePassword() {
    const { mail } = useParams();
    const { isLogin } = useAuth();
    const navigate = useNavigate();

    const loginFrm = useFormik<UserLoginFrm>({
        initialValues: {
            email: mail || '',
            otp: "",
            password: "",
            pre_password: "",
            remember: false,
        },
        validationSchema: yup.object().shape({
            otp: yup
                .string()
                .required("OTP không được bỏ trống!")
                .min(6, "OTP gồm 6 ký tự.")
                .max(6, "OTP gồm 6 ký tự."),
            password: yup
                .string()
                .required("Mật khẩu không được bỏ trống!")
                .min(6, "Mật khẩu phải từ 6 đến 32 ký tự.")
                .max(32, "Mật khẩu phải từ 6 đến 32 ký tự."),
            pre_password: yup
                .mixed()
                .required("Nhập lại mật khẩu không được bỏ trống!")
                .oneOf([yup.ref('password'), ""], "Mật khẩu không khớp."), // Kiểm tra nếu giống với password
        
            remember: yup
                .boolean()
        }),
        onSubmit: async(values: UserLoginFrm) => {
            console.log(values)
            const response = await fetch(`${backendUrl}/api/change_password`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  // Các headers khác nếu cần
                },
                body: JSON.stringify(values),
              });

            // Xử lý kết quả từ API
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                if (data["status"]==="success"){
                    alert("Thay đổi mật khẩu thành công \n Quay lại đăng nhập")
                    navigate(`/login`);
                }
                // Xử lý dữ liệu trả về nếu cần
            } else {
                throw new Error('Something went wrong');
            }

            
        },
    });

    if (isLogin) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <div className="flex justify-between items-center p-5 sm:p-10">
                <h2 className="text-2xl sm:text-[32px] leading-none font-light">Tài Khoản Của Tôi</h2>
                <a href="/">
                    <GrClose className="w-6 h-6" />
                </a>
            </div>

            <div className="container mx-auto pt-[20px] sm:pt-[50px] leading-none">
                <h2
                    className={`
                    sm:pb-[10px] 
                    mb-[75px]

                    text-xl 
                    text-center 
                    font-medium 
                    underline 
                    underline-offset-8
                    `}>Tạo mật khẩu mới
                </h2>

                <form
                    className="sm:w-[400px] mx-auto"
                    onSubmit={loginFrm.handleSubmit}
                >
                    <div className="mb-[32px]">
                        <p>Email: {mail}</p>
                    </div>
                    <div className="mb-[32px]">
                        <InputFrm
                            id="otp"
                            name="otp"
                            label="otp"
                            required
                            onInput={loginFrm.handleChange}
                            onBlur={loginFrm.handleChange}
                            disabled={false}
                        />
                        {loginFrm.errors.otp && (
                            <p className="text-rose-500 text-sm mt-1">{loginFrm.errors.otp}</p>
                        )}
                    </div>
                    <div className="mb-[30px]">
                        <InputFrm
                            id="password"
                            name="password"
                            type="password"
                            label="Mật khẩu"
                            required
                            onInput={loginFrm.handleChange}
                            onBlur={loginFrm.handleChange}
                            disabled={false}
                        />
                        {loginFrm.errors.password && (
                            <p className="text-rose-500 text-sm mt-1">{loginFrm.errors.password}</p>
                        )}
                    </div>
                    <div className="mb-[30px]">
                        <InputFrm
                            id="pre_password"
                            name="pre_password"
                            type="password"
                            label="Nhập lại mật khẩu"
                            required
                            onInput={loginFrm.handleChange}
                            onBlur={loginFrm.handleChange}
                            disabled={false}
                        />
                        {loginFrm.errors.pre_password && (
                            <p className="text-rose-500 text-sm mt-1">{loginFrm.errors.pre_password}</p>
                        )}
                    </div>
                    {/* <div className='mb-[30px] flex items-center'>
                        <input
                            id='remember'
                            name='remember'
                            type='checkbox'
                            className="w-6 h-6 bg-[#e4e6eb] me-2"
                            style={{ border: "1px solid #e4e6eb" }}
                            onInput={loginFrm.handleChange}
                            onBlur={loginFrm.handleChange}
                        />
                        <label htmlFor='remember' className='select-none ml-2 text-zinc-400'>Duy trì đăng nhập</label>
                    </div> */}

                    <button
                        type="submit"
                        disabled={!loginFrm.isValid}
                        className="w-full bg-black text-white h-[80px]"
                    >
                        Xác nhận
                    </button>
                </form>

                <div
                    className={`
                    sm:w-[400px] 
                    max-w-full 
                    mx-auto 
                    flex 
                    justify-between
                    gap-5 
                    mt-[50px] 
                    mb-[30px]
                    `}>
                    <a
                        href="/login"
                        className="
                        text-center 
                        font-medium 
                        underline
                        underline-offset-8">
                        Đăng nhập ?
                    </a>
                    <a
                        href="/register"
                        className="
                        text-center 
                        font-medium
                        mb-6
                        underline
                        underline-offset-8">
                        Đăng ký tài khoản
                    </a>

                </div>
            </div>
        </div>
    );
}
