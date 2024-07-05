import React, { useEffect, useState, useCallback } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import logofb from "../../assets/img_home/logo-fb.png";
import baner from "../../assets/img_home/baner3.jpg";
import baner1 from "../../assets/img_home/baner4.jpg";
import logotiktok from "../../assets/img_home/logo-tiktok.png";
import logoinsta from "../../assets/img_home/logo-insta.png";
import logoyt from "../../assets/img_home/logo-yt.png";
import logozalo from "../../assets/img_home/logo-zalo.png";
import logophone from "../../assets/img_home/logo-phone.png";
import { Carousel } from "../../Components/Carousel/Carousel";
import { ProductCard } from "@/Components/ProductCard";

import { useNavigate } from "react-router-dom";

const backendUrl: string = process.env.REACT_APP_BACKEND_URL || ""; // Thiết lập giá trị mặc định nếu biến môi trường không được định nghĩa

interface ProductFeatured {
  uuid: string;
  // Định nghĩa kiểu cho dữ liệu đơn hàng
  // Đảm bảo rằng kiểu này phản ánh cấu trúc của dữ liệu bạn nhận được từ API
}

const fetchData = async (
  backendUrl: string,
  setProductFeatured: React.Dispatch<React.SetStateAction<ProductFeatured[]>>
) => {
  console.log("get data");
  try {
    console.log(backendUrl);
    const fetchedOrders = await fetch(`${backendUrl}/api/product/featured`);
    console.log("fetchedOrders: ", fetchedOrders);
    if (!fetchedOrders.ok) {
      throw new Error("Lỗi khi tải dữ liệu");
    }
    const contentType = fetchedOrders.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Dữ liệu không phải là JSON");
    }
    const json = await fetchedOrders.json();
    console.log("fetchedOrders: ", json);
    setProductFeatured(json);
  } catch (error) {
    console.log(error);
  }
};

export default function Home() {
  const [productFeatured, setProductFeatured] = useState<ProductFeatured[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Gọi fetchData() khi component được tạo ra (mounted)
    fetchData(backendUrl, setProductFeatured);
  }, []); // Chỉ gọi fetchData() một lần, khi component được tạo ra (mounted)

  const slides: string[] = [baner, baner1];
  useEffect(() => {
    const handlePlayButtonClick = () => {
      const videoUrl = "https://www.youtube.com/watch?v=fYUYUhdsxiY";

      // Kiểm tra nếu URL của video là đường dẫn mong muốn
      if (videoUrl === "https://www.youtube.com/watch?v=fYUYUhdsxiY") {
        window.open(videoUrl); // Mở video trong một cửa sổ mới
        // Hoặc sử dụng logic phát video ưa thích của bạn ở đây
      } else {
        alert("Không thể phát video từ đường dẫn này.");
      }
    };

    const playButton = document.getElementById("playButton");
    if (playButton) {
      playButton.addEventListener("click", handlePlayButtonClick);
    }

    // Xóa event listener khi component bị unmount để tránh memory leak
    return () => {
      if (playButton) {
        playButton.removeEventListener("click", handlePlayButtonClick);
      }
    };
  }, []);

  const handleClick = () => {
    window.location.href = "https://zalo.me/0904229229";
  };

  const firstFourProducts = productFeatured.slice(0, 4);

  // const deferredProductList = useDeferredValue(
  //   productFeatured || []
  // );
  const [detailProduct, setDetailProduct] = useState<object>();
  const handleShowDetailProduct = useCallback(
    (uuid: string | number) => {
      // handleToggleModal(true);

      // const findProductById: Product = firstFourProducts.find(
      //   (prod: Product) => prod.uuid === uuid
      // );
      console.log("uuid: ", uuid);
      console.log("firstFourProducts: ", firstFourProducts);
      const foundProduct = firstFourProducts.find(
        (product) => product.uuid === uuid
      );

      console.log("findProductById: ", foundProduct);
      setDetailProduct(foundProduct);
    },
    [detailProduct]
  );

  const RenderProductCards = () => {
    return firstFourProducts.map((product, idx) => {
      console.log("product: ", product);
      return (
        <Fragment key={`${idx}`}>
          <ProductCard
            {...product}
            onShowDetail={(uuid: string | any) => {
              handleShowDetailProduct(uuid);
            }}
          />
        </Fragment>
      );
    });
  };

  const [list_news, setList_news] = useState([]);
  useEffect(() => {
    // Gọi API hoặc thao tác lấy dữ liệu đơn hàng ở đây
    console.log("jfnvdcjdnc");
    const fetchData = async () => {
      try {
        const fetchedOrders = await fetch(`${backendUrl}/api/get/news`);
        const json = await fetchedOrders.json();
        console.log("fetchedOrders: ", json);

        setList_news(json);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const maxLabel = 90;

  function truncateTitle(title: string, maxLength: number): string {
    if (title.length <= maxLength) {
      return title;
    }

    const truncated = title.substring(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(" ");

    if (lastSpaceIndex > 0) {
      return truncated.substring(0, lastSpaceIndex) + "...";
    }

    return truncated + "...";
  }

  const handleButton = (params: { uuid: string }) => {
    console.log("Button clicked with uuid:", params.uuid);
    navigate(`/NewPaginate/${params.uuid}`);
    // Add your logic here
  };

  return (
    <div className="relative">
      {/* carosel */}
      <Carousel>
        {slides.map((s, index) => (
          <img
            key={index}
            className="w-full h-[500px] object-cover md:object-none md:h-[800px]"
            src={s}
            alt=""
          />
        ))}
      </Carousel>
      {/* quảng cáo 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-5 xl:gap-6 mx-8 my-auto md:mx-16">
        {/* Cột 1 */}
        <div className="h-[60vw] md:h-[400px] relative overflow-hidden group">
          <img
            src="https://images.pexels.com/photos/616833/pexels-photo-616833.jpeg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Link to="/products">
              <button className="text-white text-2xl md:text-3xl md:font-bold">
                Xem ngay
              </button>
            </Link>
          </div>
        </div>

        {/* Cột 2 */}
        <div className="h-[60vw] md:h-[400px] relative overflow-hidden group">
          <img
            src="https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Link to="/products">
              <button className="text-white text-2xl md:text-3xl md:font-bold">
                Xem ngay
              </button>
            </Link>
          </div>
        </div>

        {/* Cột 3 */}
        <div className="h-[60vw] md:h-[400px] relative overflow-hidden group">
          <img
            src="https://images.pexels.com/photos/4443486/pexels-photo-4443486.jpeg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Link to="/products">
              <button className="text-white text-2xl md:text-3xl md:font-bold">
                Xem ngay
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* quảng cáo 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 mb-10 gap-5 xl:gap-6 mx-8 my-auto md:mx-16">
        {/* Cột 1 */}
        <div className="h-[60vw] md:h-[300px] relative overflow-hidden group">
          <img
            src="https://images.pexels.com/photos/7615566/pexels-photo-7615566.jpeg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Link to="/products">
              <button className="text-white text-2xl md:text-3xl md:font-bold">
                Xem ngay
              </button>
            </Link>
          </div>
        </div>
        {/* Cột 2 */}
        <div className="h-[60vw] md:h-[300px] relative overflow-hidden group">
          <img
            src="https://images.pexels.com/photos/7615470/pexels-photo-7615470.jpeg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Link to="/products">
              <button className="text-white text-2xl md:text-3xl md:font-bold">
                Xem ngay
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Genji vietnam */}
      <div className="mt-20">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-medium mb-5">
            VỀ GENJI VIETNAM
          </h1>
          <p className="w-[350px] md:w-[600px] mx-auto text-gray-600 ">
            GENJI Việt Nam là đối tác chiến lược của Nhật Bản và Hoa Kỳ, chuyên
            nhập khẩu và phân phối các sản phẩm bảo vệ sức khỏe và chăm sắc đẹp
            của Nhật Bản đã được tin dùng rộng rãi trên thế giới.
          </p>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 mx-auto max-w-7xl mb-24 mt-16">
          <div className="w-[250px] mx-auto">
            <div className="h-[200px] content-center">
              <img
                src="https://bizweb.dktcdn.net/100/426/692/themes/948727/assets/icon_uti_1.png"
                alt=""
                className="mx-auto h-[120px]"
              />
            </div>
            <h3 className="text-center font-medium text-lg mb-1">
              NHÀ SẢN XUẤT KINH NGHIỆM
            </h3>
            <span className="block text-center text-gray-500 text-sm">
              GENJI VietNam có hơn 40 năm kinh nghiệm nghiên cứu và sản xuất
            </span>
          </div>

          <div className="w-[250px] mx-auto">
            <div className="h-[200px] content-center">
              <img
                src="https://bizweb.dktcdn.net/100/426/692/themes/948727/assets/icon_uti_2.png"
                alt=""
                className="mx-auto h-[120px]"
              />
            </div>
            <h3 className="text-center font-medium text-lg mb-1">
              CÔNG NGHỆ HIỆN ĐẠI
            </h3>
            <span className="block text-center text-gray-500 text-sm">
              100% nghiên cứu và sản xuất với công nghệ hiện đại tại nhà máy
              Nhật Bản
            </span>
          </div>

          <div className="w-[250px] mx-auto">
            <div className="h-[200px] content-center">
              <img
                src="https://bizweb.dktcdn.net/100/426/692/themes/948727/assets/icon_uti_3.png"
                alt=""
                className="mx-auto h-[120px]"
              />
            </div>
            <h3 className="text-center font-medium text-lg mb-1">
              ĐẠT CHUẨN NHẬT BẢN
            </h3>
            <span className="block text-center text-gray-500 text-sm">
              Các chứng nhận của Genji bao gồm JAS Organic, ISO 9001, GMP...
            </span>
          </div>

          <div className="w-[250px] mx-auto">
            <div className="h-[200px] content-center">
              <img
                src="https://bizweb.dktcdn.net/100/426/692/themes/948727/assets/icon_uti_4.png"
                alt=""
                className="mx-auto h-[120px]"
              />
            </div>
            <h3 className="text-center font-medium text-lg mb-1">
              CHỨNG NHẬN BỞI THỊ TRƯỜNG MỸ
            </h3>
            <span className="block text-center text-gray-500 text-sm">
              Được nhiều người Việt tại Mỹ tin dùng
            </span>
          </div>
        </div>
      </div>

      {/* sản phẩm nổi bật */}
      <div className="flex flex-col items-center mt-8">
        <h1 className="text-xl md:text-3xl font-medium mb-20">
          SẢN PHẨM NỔI BẬT
        </h1>
        <div className="container grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
          {RenderProductCards()}
        </div>
        <a
          href="/products"
          className="border-b-2 border-black text-sm md:text-xl text-black font-semibold transform hover:scale-105 transition-transform"
        >
          Xem thêm
        </a>
      </div>

      {/* lắng nghe */}
      <div className="mt-8 relative">
        <div className="w-full h-[360px] md:h-[320px] object-cover object-center bg-[#cfcfcf]"></div>

        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex justify-center items-center">
            <div className="text-center md:text-left max-w-[320px]">
              <h1 className="text-black text-[16px] md:text-[23px] font-semibold mt-4 mb-2 md:mb-4">
                GENJI LẮNG NGHE BẠN
              </h1>
              <p className="text-[#777171] text-[14px] md:text-[16px] mb-2 md:mb-4">
                Mọi phản hồi của khách hàng rất quan trọng với chúng tôi. Vui
                lòng để lại phản hồi về chất lượng dịch vụ. Genji Việt Nam xin
                cám ơn!
              </p>
              <Link to="/contact">
                <button className="bg-[#FFA734] text-[12px] md:text-[16 px] text-white font-semibold py-2 px-4 transition-transform transform hover:scale-105">
                  ĐÓNG GÓP Ý KIẾN
                </button>
              </Link>
            </div>
          </div>

          <div className=" flex justify-center flex-col items-center text-center md:text-left">
            <div>
              <h1 className="text-[#777171]  text-[14px] md:text-[16px] md:font-medium">
                hotline
              </h1>
              <h1 className="text-black font-medium text-[14px] md:text-[18px] md:font-bold text-xl">
                0904 229 229
              </h1>
              <h1 className="text-[#777171] text-[14px] md:text-[16px] md:font-medium mt-1 md:mt-7">
                Email
              </h1>
              <h1 className="text-black font-medium text-[14px] md:text-[18px] md:font-bold text-xl md:mb-16">
                genjivietnam@gmail.com
              </h1>
            </div>
          </div>
          {/* 1111 */}
          <div className="flex justify-center items-center">
            {/* Logo Facebook */}
            <a
              href="https://www.facebook.com/detoxderuderu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={logofb}
                alt="Facebook"
                className="w-[50px] h-[55px] md:w-[85px] md:h-[90px] object-contain transition-transform transform hover:scale-105"
              />
            </a>
            {/* Logo TikTok */}
            <a
              href="https://www.tiktok.com/@deru.deru.official"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={logotiktok}
                alt="TikTok"
                className="w-[40px] h-[45px] md:w-[70px] md:h-[75px] object-contain transition-transform transform hover:scale-105"
              />
            </a>

            {/* Logo Instagram */}
            <a
              href="https://www.instagram.com/hokkaidovietnam1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={logoinsta}
                alt="Instagram"
                className="w-[50px] h-[55px] md:w-[85px] md:h-[90px] object-contain transition-transform transform hover:scale-105"
              />
            </a>
            {/* Logo YouTube */}
            <a
              href="https://www.youtube.com/@hokkaidovietnam"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={logoyt}
                alt="YouTube"
                className="w-[30px] h-[35px] md:w-[50px] md:h-[55px] object-contain transition-transform transform hover:scale-105"
              />
            </a>
          </div>
        </div>
      </div>

      {/* tin tức */}
      <div className="flex flex-col items-center mt-16">
        <h1 className="text-xl md:text-3xl font-medium mb-8">TIN TỨC</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-4">
          {/* Cột 1 */}
          <div className="flex flex-col items-center">
            <div className="w-full md:w-[350px] h-[250px]">
              <img
                className="w-full h-full object-cover"
                src={list_news[0]?.["image_url"] || ""}
                alt=""
              />
            </div>
            <div className="flex flex-col items-center w-[350px]">
              <h1 className="text-lg font-medium text-center mt-4">
                {truncateTitle(list_news[0]?.["title"] || "", 60)}
              </h1>
              <span className="block text-center text-gray-500 mt-2 mb-2">
                {truncateTitle(list_news[0]?.["label"] || "", maxLabel)}
              </span>
              <button
                onClick={() =>
                  handleButton({ uuid: list_news[0]?.["uuid"] || "" })
                }
                className="border-b-2 border-black transition-transform transform hover:scale-105"
              >
                Xem thêm
              </button>
            </div>
          </div>

          {/* Cột 2 */}
          <div className="flex flex-col items-center">
            <div className="w-full md:w-[350px] h-[250px]">
              <img
                className="w-full h-full object-cover"
                src={list_news[1]?.["image_url"] || ""}
                alt=""
              />
            </div>
            <div className="flex flex-col items-center w-[350px]">
              <h1 className="text-lg font-medium text-center mt-4">
                {truncateTitle(list_news[1]?.["title"] || "", 60)}
              </h1>
              <span className="block text-center text-gray-500 mt-2 mb-2">
                {truncateTitle(list_news[1]?.["label"] || "", maxLabel)}
              </span>
              <button
                onClick={() =>
                  handleButton({ uuid: list_news[1]?.["uuid"] || "" })
                }
                className="border-b-2 border-black transition-transform transform hover:scale-105"
              >
                Xem thêm
              </button>
            </div>
          </div>

          {/* Cột 3 */}
          <div className="flex flex-col items-center">
            <div className="w-full md:w-[350px] h-[250px]">
              <img
                className="w-full h-full object-cover"
                src={list_news[2]?.["image_url"] || ""}
                alt=""
              />
            </div>
            <div className="flex flex-col items-center w-[350px]">
              <h1 className="text-lg font-medium text-center mt-4">
                {truncateTitle(list_news[2]?.["title"] || "", 60)}
              </h1>
              <span className="block text-center text-gray-500 mt-2 mb-2">
                {truncateTitle(list_news[2]?.["label"] || "", maxLabel)}
              </span>
              <button
                onClick={() =>
                  handleButton({ uuid: list_news[2]?.["uuid"] || "" })
                }
                className="border-b-2 border-black transition-transform transform hover:scale-105"
              >
                Xem thêm
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex flex-col gap-4">
          {/* Nút 1 */}
          <div className="flex justify-end">
            <button onClick={handleClick} className="animate-bounce">
              <img
                src={logozalo}
                alt=""
                className="w-[63px] h-[50px] lg:w-[83px] lg:h-[70px]"
              />
            </button>
          </div>
          {/* Nút 2 */}
          <div className="flex justify-end">
            <a href="tel:0904229229" className="animate-bounce mr-[5px]">
              <img
                src={logophone}
                alt=""
                className="w-[50px] h-[50px] lg:w-[63px] lg:h-[63px]"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
