import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

interface NewsItem {
  id: number;
  image_url: string;
  title: string;
  content: string;
  description: string;
  uuid: string;
}

const maxLabel = 200;

export default function NewPaginate() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const fetchedNews = await fetch(`${backendUrl}/api/get/news`);
        const json = await fetchedNews.json();
        console.log("newsssss: ", json);

        const slicedAllNews = json.slice(4); // Lưu toàn bộ dữ liệu tin tức từ mục thứ 5 trở đi vào state allNews
        setAllNews(slicedAllNews);
        setPageCount(Math.ceil(slicedAllNews.length / 4)); // Tính tổng số trang cần thiết để hiển thị toàn bộ tin tức (trừ đi 4 mục đầu tiên)
        setNews(slicedAllNews.slice(0, 4)); // Hiển thị dữ liệu của trang đầu tiên ngay khi tải
      } catch (error) {
        console.log(error);
      }
    };
    fetchData1();
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = () => {
    const startIndex = currentPage * 4;
    const slicedNews = allNews.slice(startIndex, startIndex + 4);
    setNews(slicedNews);
  };

  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  function truncateTitle(title: string, maxLength: number): string {
    if (!title) return "";
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

  const navigate = useNavigate();
  const handleButton = (params: { uuid: string }) => {
    console.log("Button clicked with uuid:", params.uuid);
    navigate(`/NewPaginate/${params.uuid}`);
  };

  return (
    <div>
      {/* Hiển thị danh sách tin tức */}
      <div className="grid grid-cols-1 mt-8 gap-4 mx-5 md:mx-0 lg:gap-8">
        {news.map((newsItem) => (
          <div key={newsItem.id}>
            <div className="gap-2 grid lg:grid-cols-1 lg:h-[140px]">
              <div className="flex flex-col md:flex-row md:space-x-4">
                <img
                  className="min-w-[180px] object-cover h-[200px] md:min-w-[220px] md:h-[150px]"
                  src={newsItem.image_url}
                  alt=""
                />
                <div className="flex flex-col items-start justify-between">
                  <div>
                    <h1 className="text-sm font-medium mt-4 md:mt-0">
                      {newsItem.title}
                    </h1>
                    <span className="block text-gray-500 text-xs mt-2 mb-2 md:mb-0">
                      {truncateTitle(newsItem.content, maxLabel)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleButton({ uuid: newsItem.uuid })}
                    className="text-xs md:text-base border-b-2 border-black transition-transform transform hover:scale-105"
                  >
                    Xem thêm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      <ReactPaginate
        previousLabel={<FaArrowLeftLong />}
        nextLabel={<FaArrowRightLong />}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-center items-center gap-4 mt-8"}
        activeClassName={"font-extrabold"}
      />
    </div>
  );
}
