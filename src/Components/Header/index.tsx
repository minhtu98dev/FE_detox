import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useWindowDimensions from "@/Hooks/useWindowDimension";
import { useSelector } from "react-redux";

import { selectCart } from "@/Redux/selectors/cart.selector";

import { CircleUserRound, ShoppingCart, Search, Menu, X } from "lucide-react";
import { HiOutlineLogin } from "react-icons/hi";
import { RiBillLine } from "react-icons/ri";

import logo from "assets/image/logo1.png";

import "./styles.scss";

const MENU_REDIRECT = [
  {
    path: "/",
    name: "trang chủuuuuuuuuuuuuuuuuuuu",
  },
  {
    path: "/products",
    name: "cửa hàng",
  },
  {
    path: "/media",
    name: "truyền thông",
  },
  {
    path: "/contact",
    name: "liên hệ",
  },
];

const MENU_REDIRECT2 = [
  {
    path: "/",
    name: "trang chủ",
  },
  {
    path: "/products",
    name: "cửa hàng",
  },
  {
    path: "/media",
    name: "truyền thông",
  },
  {
    path: "/contact",
    name: "liên hệ",
  },
];

export default function Header() {
  const location = useLocation();
  const { width } = useWindowDimensions();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const cartState = useSelector(selectCart);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isUseTransition = location.pathname === "/";

  const memorizeMenu = useMemo(() => {
    if (width > 1200) {
      return MENU_REDIRECT;
    } else {
      return MENU_REDIRECT2;
    }
  }, [width]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (width > 1200) {
      setIsOpenMenu(false);
    }
  }, [width]);

  const storedUsername = localStorage.getItem("username");
  const isAdmin = localStorage.getItem("isAdmin");
  const backendUrl: string = process.env.REACT_APP_BACKEND_URL || "";
  const navigate = useNavigate();

  if (isAdmin) {
    navigate("/admin");
  }

  const handleButtonUserLogout = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/api/logout/email/${storedUsername}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Đăng xuất không thành công!");
      }

      const data = await response.json();
      if (data.status === "success") {
        alert("Đăng xuất thành công");
        localStorage.removeItem("username");
        navigate("/login");
        window.scrollTo(0, 0);
      } else {
        alert("Lỗi đăng xuất");
      }
    } catch (error) {
      // console.error('Lỗi đăng xuất:', error.message);
    }
  };

  const handleButtonOrder = async () => {
    navigate(`/orderUser/${storedUsername}`);
  };

  const handleOrderClick = () => {
    handleButtonOrder();
    setIsOpenMenu(false);
  };

  const handleUsernameClick = () => {
    handleOrderClick();
    setIsOpenMenu(false);
  };

  return (
    <header
      className={`header ${
        isUseTransition ? "header__transparent" : "header__whitebox"
      } ${
        isScrolled
          ? "header__transparent__scrolling"
          : "header__whitebox__scrolling"
      } z-50
  hover:bg-white
  hover:text-black
  `}
    >
      <div className="header-menu">
        <ul className="header-menu-container">
          {memorizeMenu.map((menu, idx) => {
            return (
              <Link
                className="header-menu-link font-semibold text-sm transition-transform transform hover:scale-105 hover:font-extrabold"
                to={menu.path}
                key={idx}
              >
                {menu.name}
              </Link>
            );
          })}
        </ul>

        {!isOpenMenu && (
          <Menu
            className="cursor-pointer header-menu-icons"
            onClick={() => {
              setIsOpenMenu(true);
            }}
          />
        )}
      </div>

      <div className="header-logo mt-6">
        <Link className="header-menu-link" to={"/"}>
          {" "}
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="header-actions">
        <div className="flex flex-row">
          <Link to="/search">
            <Search className="mr-10 cursor-pointer header-actions-search" />
          </Link>

          {storedUsername ? (
            <div className={`dropdown ${isDropdownOpen ? "active" : ""}`}>
              <CircleUserRound className="mr-10 cursor-pointer header-actions-userInfo" />
              <div className="dropdown-content mr-10">
                <div className="flex flex-col items-start ">
                  <div className="text-lg font-medium mt-1">
                    Xin chào {storedUsername}
                  </div>
                  <div className="flex items-center mt-3">
                    <RiBillLine size={30} className="mr-4" />
                    <button
                      onClick={handleButtonOrder}
                      className="text-lg font-medium ml-4"
                    >
                      Đơn hàng
                    </button>
                  </div>
                  <div className="flex items-center mt-3">
                    <HiOutlineLogin size={30} className="mr-2" />
                    <button
                      onClick={handleButtonUserLogout}
                      className="text-lg font-medium ml-4"
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <CircleUserRound className="mr-10 cursor-pointer header-actions-userInfo" />
            </Link>
          )}

          <Link to="/cart">
            <div className="relative">
              <ShoppingCart className="cursor-pointer" />
              <div
                className="flex items-center justify-center absolute border rounded-full border-red-600"
                style={{
                  top: -10,
                  right: -10,
                  width: 15,
                  height: 15,
                }}
              >
                <p className="text-xs mb-0 text-red-600">{cartState.length}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <nav
        className="header-navMenu flex flex-col justify-between"
        style={{
          width: isOpenMenu ? "100%" : "0px",
        }}
      >
        {isOpenMenu && (
          <>
            <ul className="header-navMenu-container mb-4">
              {memorizeMenu.map((menu, idx) => {
                return (
                  <Link
                    className="header-navMenu-link font-bold"
                    to={menu.path}
                    key={idx}
                    onClick={() => {
                      setIsOpenMenu(false);
                    }}
                  >
                    {menu.name}
                  </Link>
                );
              })}
            </ul>

            <div className="h-[160px] border-t-2 flex items-center justify-start pl-[15px]">
              {storedUsername ? (
                <div className="">
                  <Link to="/search" className="flex items-center mb-4">
                    <Search size={35} />
                    <div className="font-semibold text-base lg:text-lg mx-2 ">
                      Tìm sản phẩm
                    </div>
                  </Link>
                  <div className="flex items-center">
                    <CircleUserRound size={35} />
                    <div
                      onClick={handleUsernameClick}
                      className="ml-2 font-semibold text-base lg:text-lg cursor-pointer"
                    >
                      Chào {storedUsername}
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <HiOutlineLogin size={35} />
                    <button
                      onClick={handleButtonUserLogout}
                      className="font-semibold text-base lg:text-lg mx-2 "
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="flex items-center space-x-2">
                  <CircleUserRound size={35} />
                  <h3 className="font-semibold text-lg">LOGIN</h3>
                </Link>
              )}
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
