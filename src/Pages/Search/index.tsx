import { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import sp from "../../assets/image/sp4.png";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
interface Product {
  product_name: string;
  uuid: string;
  avatar: string;
}
interface TypeProduct {
  name: string;
  uuid: string;
}
export default function Search() {
  const [isVisible, setIsVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [listTypes, setListTypes] = useState<TypeProduct[]>([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Gọi API hoặc thao tác lấy dữ liệu đơn hàng ở đây
    
    const listCustomer = async () => {
        try {
            const customers = await fetch(`${backendUrl}/api/typeProduct`);
            const json = await customers.json();
            console.log("setListTypes: ", json);
            if (json){setListTypes(json);}
                

        } catch (error) {
          console.log(error);
        } 
    };
    listCustomer();

  }, []);

  const fetchDataSearch = async () => {
    try {
        // Thêm độ trễ 1 giây (1000 miliseconds) trước khi gọi API
        setTimeout(async () => {
          const fetchedOrders = await fetch(`${backendUrl}/api/get/product/name/${searchTerm}`);
          const json = await fetchedOrders.json();
          console.log("fetchedOrders: ", json);
          setListProducts(json);
        }, 100);
      } catch (error) {
        console.log(error);
      } 
    };

    const fetchDataType = async (uuid:string) => {
      try {
          // Thêm độ trễ 1 giây (1000 miliseconds) trước khi gọi API
          setTimeout(async () => {
            const fetchedOrders = await fetch(`${backendUrl}/api/product/type/${uuid}`);
            const json = await fetchedOrders.json();
            console.log("fetchedOrders: ", json);
            setListProducts(json);
          }, 100);
        } catch (error) {
          console.log(error);
        } 
      };

  

  const handleClose = () => {
    setIsVisible(false);
    navigate("/");
  };

  const handleSearch = () => {
    console.log("Search term:", searchTerm);
    fetchDataSearch();
    // Thêm chức năng tìm kiếm ở đây, ví dụ:
    // navigate(`/search?query=${searchTerm}`);
  };

  const handleCategoryClick = (category: string) => {
    console.log("Category clicked:", category);
    fetchDataType(category);
    // Thêm chức năng khi click vào category ở đây, ví dụ:
    // navigate(`/category/${category}`);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between items-center p-5 sm:p-10">
        <h2 className="text-2xl sm:text-[32px] leading-none font-light">
          Tìm kiếm
        </h2>
        <button onClick={handleClose}>
          <GrClose className="w-6 h-6" />
        </button>
      </div>
      <div className="flex justify-center mt-10">
        <div className="border-b-2 w-[350px] lg:w-[600px] flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Sản phẩm cần tìm"
            className="flex-grow text-sm lg:text-base font-semibold outline-none"
          />
          <button onClick={handleSearch}>
            <IoSearchSharp size={25} className="ml-4 mb-2" />
          </button>
        </div>
      </div>
      <div>
        <div className="lg:flex lg:justify-center lg:items-center">
          <ul className="mx-[70px] md:mx-[200px] text-base lg:text-xl font-normal grid grid-cols-3  md:grid-cols-4 lg:grid-cols-5 gap-5 mt-6 justify-center">
            {listTypes.map((category) => (
              <li
                key={category.name}
                className="hover:font-semibold hover:text-blue-900 cursor-pointer"
                onClick={() => handleCategoryClick(category.uuid)}
              >
                <h1>{category.name}</h1>
              </li>
            ))}
            
            
            
            
          </ul>
        </div>
      </div>
      <div>
        <ul className="mx-[50px] lg:mx-[200px] grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          
          {listProducts.map((product) => (
          <li key={product.uuid} className="text-center mt-10">
            <img src={product.avatar} alt={product.product_name} style={{ width: "30%" }} className="mx-auto" />
            <h1 className="mt-auto">{product.product_name}</h1>
          </li>
          ))}
          
          
        </ul>
      </div>
    </div>
  );
}
