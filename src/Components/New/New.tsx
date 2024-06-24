import React, { useEffect, useState } from "react";
import img1 from "../../assets/img_new/1.png";
import img2 from "../../assets/img_new/2.png";
import img3 from "../../assets/img_new/3.png";
import img4 from "../../assets/img_new/4.png";
import NewPaginate from "./NewPaginate";
import { useNavigate } from "react-router-dom";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const maxLabel = 140;
export default function New() {
  const navigate = useNavigate();
  const [list_news, setList_news] = useState([]);
  useEffect(() => {
    // Gọi API hoặc thao tác lấy dữ liệu đơn hàng ở đây

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
  console.log(list_news[0]);
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
    <div className="grid grid-cols-1 mx-[25px] md:mx-[130px] mt-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mx-5 md:mx-0">
        <div className="flex flex-col items-start md:items-center">
          <img
            className="w-full h-[200px] object-cover md:h-[350px]"
            src={list_news[0]?.["image_url"] || ""}
            alt=""
          />
          <h1 className="text-sm md:text-lg font-medium text-left md:text-center mt-4 ">
            {list_news[0]?.["title"] || ""}
          </h1>
          <span className="block text-left md:text-center text-xs md:text-[16px] object-cover text-gray-500 mt-2 mb-2">
            {truncateTitle(list_news[0]?.["label"] || "", maxLabel)}
          </span>
          <button
            onClick={() => handleButton({ uuid: list_news[0]?.["uuid"] || "" })}
            className="text-xs md:text-base border-b-2 border-black transition-transform transform hover:scale-105"
          >
            Xem thêm
          </button>
        </div>
        <div className="gap-2 grid md:grid-cols-1">
          <div className="gap-2 grid md:grid-cols-1">
            <div className="flex flex-col md:flex-row md:space-x-4 md:h-[140px] mb-3">
              <img
                className="min-w-[180px] h-[200px] object-cover md:min-w-[220px] md:h-[150px]"
                src={list_news[1]?.["image_url"] || ""}
                alt=""
              />
              <div className="flex flex-col items-start justify-between">
                <div>
                  <h1 className="text-sm font-medium mt-4 md:mt-0">
                    {list_news[1]?.["title"] || ""}
                  </h1>
                  <span className="block text-gray-500 text-xs mt-2 mb-2 md:mb-0">
                    {/* {list_news[1]?.["label"] || ""} */}
                    {truncateTitle(list_news[1]?.["label"] || "", maxLabel)}
                  </span>
                </div>
                {/* <button className="text-xs md:text-base border-b-2 border-black transition-transform transform hover:scale-105 mb-4 md:mb-0">
                  Xem thêm
                </button> */}
                <button
                  onClick={() =>
                    handleButton({ uuid: list_news[1]?.["uuid"] || "" })
                  }
                  className="text-xs md:text-base border-b-2 border-black transition-transform transform hover:scale-105"
                >
                  Xem thêm
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4 md:h-[140px] mb-3">
              <img
                className="min-w-[180px] h-[200px] object-cover md:min-w-[220px] md:h-[150px]"
                src={list_news[2]?.["image_url"] || ""}
                alt=""
              />
              <div className="flex flex-col items-start justify-between">
                <div>
                  <h1 className="text-sm font-medium mt-4 md:mt-0">
                    {list_news[2]?.["title"] || ""}
                  </h1>
                  <span className="block text-gray-500 text-xs mt-2 mb-2 md:mb-0">
                    {/* {list_news[2]?.["label"] || ""} */}
                    {truncateTitle(list_news[2]?.["label"] || "", maxLabel)}
                  </span>
                </div>
                {/* <button className="text-xs md:text-base border-b-2 border-black transition-transform transform hover:scale-105 mb-4 md:mb-0">
                  Xem thêm
                </button> */}
                <button
                  onClick={() =>
                    handleButton({ uuid: list_news[2]?.["uuid"] || "" })
                  }
                  className="text-xs md:text-base border-b-2 border-black transition-transform transform hover:scale-105"
                >
                  Xem thêm
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4 md:h-[140px]">
              <img
                className="min-w-[180px] h-[200px] object-cover md:min-w-[220px] md:h-[150px]"
                src={list_news[3]?.["image_url"] || ""}
                alt=""
              />
              <div className="flex flex-col items-start justify-between">
                <div>
                  <h1 className="text-sm font-medium mt-4 md:mt-0">
                    {list_news[3]?.["title"] || ""}
                  </h1>
                  <span className="block text-gray-500 text-xs mt-2 mb-2 md:mb-0">
                    {/* {list_news[3]?.["label"] || ""} */}
                    {truncateTitle(list_news[3]?.["label"] || "", maxLabel)}
                  </span>
                </div>
                {/* <button className="text-xs md:text-base border-b-2 border-black transition-transform transform hover:scale-105 mb-4 md:mb-0">
                  Xem thêm
                </button> */}
                <button
                  onClick={() =>
                    handleButton({ uuid: list_news[3]?.["uuid"] || "" })
                  }
                  className="text-xs md:text-base border-b-2 border-black transition-transform transform hover:scale-105"
                >
                  Xem thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* tin tuc 2 */}
      <NewPaginate />
    </div>
  );
}
