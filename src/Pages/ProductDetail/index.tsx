import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, MouseEvent } from "react";

import Banner from "@/Components/Banner";
import { ImageGallery } from "@/Components/ImageGallery/ImageGallery";
import { EmblaOptionsType } from "embla-carousel";
import ProductInformation from "./components/ProductInformation/ProductInformation";
import { ProductDetailSkeleton } from "./components/Skeleton";

import { getProduct } from "@/Apis/Product/Product.api";

import "./style.css";

export default function ProductDetail() {
  const OPTIONS: EmblaOptionsType = {};
  const { id } = useParams();

  const { isLoading, data }: any = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id as string),
    enabled: id !== undefined,
  });

  const slideImages = data?.data?.listImage;
  const [activeButton, setActiveButton] = useState(1); // Trạng thái của button đang được chọn
  // Hàm xử lý sự kiện click vào button
  const handleButtonClick = (
    buttonId: number,
    event: MouseEvent<HTMLButtonElement>
  ): void => {
    console.log(buttonId);
    setActiveButton(buttonId); // Cập nhật trạng thái của button đang được chọn
    event.preventDefault(); // Ngăn chặn hành vi mặc định của button
  };

  return (
    <main>
      <div className="relative mb-20">
        <img
          className="h-[160px] md:h-[400px] w-full object-cover"
          src="https://images.pexels.com/photos/4443487/pexels-photo-4443487.jpeg"
          alt=""
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-[16px] md:text-[42px] font-bold text-white">
            Thông tin sản phẩm
          </h1>
        </div>
      </div>

      {isLoading ? (
        <ProductDetailSkeleton />
      ) : (
        <div className="container grid grid-cols-1 lg:grid-cols-2 mb-24 my-7">
          <ImageGallery
            slides={slideImages}
            options={OPTIONS}
            customClass="pr-0 lg:pr-28"
          />

          <ProductInformation {...data?.data} />
        </div>
      )}

      <div className="details">
        <div className="button_type">
          <div className="list_button">
            <button
              className={`bt ${activeButton === 1 ? "active" : ""}`}
              onClick={(event: MouseEvent<HTMLButtonElement>) =>
                handleButtonClick(1, event)
              }
            >
              Thông tin chi tiết
            </button>
            <button
              className={`bt ${activeButton === 2 ? "active" : ""}`}
              onClick={(event: MouseEvent<HTMLButtonElement>) =>
                handleButtonClick(2, event)
              }
            >
              Đánh giá
            </button>
          </div>
        </div>

        <div className="thong-tin">
          {activeButton === 1 && (
            <p
              dangerouslySetInnerHTML={{ __html: data?.data?.description }}
            ></p>
          )}
          {activeButton === 2 && <p>chưa có đánh giá</p>}
        </div>
      </div>
    </main>
  );
}
