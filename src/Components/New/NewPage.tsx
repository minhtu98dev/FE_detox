import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { Content } from "@radix-ui/react-dialog";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

type NewsItem = {
  uuid: string;
  title: string;
  label: string;
  content: string;
  description: string;
  image_url: string;
  // Add other fields as necessary
};
export default function NewPaginate() {
  const { uuid } = useParams();
  console.log("uuid: ", uuid);

  const [news, setNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/get/news/uuid/${uuid}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const json = await response.json();
        console.log("Fetched News: ", json);
        setNews(json);
      } catch (error) {
        console.error("Error fetching data: ", error);
        // setError(error.message);
      }
    };

    fetchData();
  }, [uuid]);

  return (
    <div>
      {news ? (
        <div>
          <img
            src={news.image_url}
            alt=""
            className="w-screen max-h-[300px] object-cover mb-20 md:mb-7.5 sm:mb-5"
          />
          <div className="flex justify-center">
            <div className="max-w-[400px] md:max-w-[700px] mx-auto">
              <h1 className="font-bold text-[#34495e] text-3xl md:mt-10 ">
                {news.title}
              </h1>
              <h2 className="text-[#83add8] text-xl italic mt-4 text-left mb-4">
                {news.label}
              </h2>
              <p dangerouslySetInnerHTML={{ __html: news.description }}></p>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
