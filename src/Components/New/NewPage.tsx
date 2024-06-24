import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useParams } from "react-router-dom";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

type NewsItem = {
  uuid: string;
  title: string;
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
        <div className="mx-[50px] lg:mx-[100px] xl:mx-[200px] mt-[70px]">
          {/* {news.description} */}
            <img src={news.image_url} alt="image" />
           {news.title }
           <br></br><br></br>
          <p dangerouslySetInnerHTML={{ __html: news.description }}></p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
