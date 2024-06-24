import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Skeleton } from "../ui/skeleton";
import { Product } from "@/Types/Product.type";
import { actions } from "@/Redux/actions/cart.action";
import { HandleAddCart, formatCurrency } from "@/Helper/helper";
import "./styles.scss";
import { toast } from "react-toastify";
import { useCartStorage } from "@/Hooks/useCartStorage";

export type PropTypes = {
  onShowDetail?: Function;
  isSkeleton?: Boolean;
};
const DEFAULT_QUANTITY = 1;
export type MergedType = PropTypes & Product;

export const ProductCard: React.FC<PropTypes | MergedType | any> = (
  props: PropTypes | MergedType | any
) => {
  const {
    price,
    uuid,
    product_name,
    onShowDetail,
    isSkeleton = false,
    avatar,
  } = props;

  const { saveCartStorage } = useCartStorage();
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const [quantityState] = useState<number>(DEFAULT_QUANTITY);
  const handleClickDetail = (_id: number | string) => {
    navigate(`/product/${_id}`);
  };

  const SkeletonProduct = () => {
    console.log("SkeletonProduct");
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-96 w-full" />

        <div className="mx-auto space-y-2 w-full">
          <Skeleton className="my-4 h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  };
  const handleAddCart = () => {
    const payload = {
      ...props,
      quantity: quantityState,
    };

    const resolveCart = HandleAddCart(payload);

    // * convert JSON string để lưu xuống local storage
    saveCartStorage(resolveCart);

    // * Thao tác với state cart trong reducer
    dispatch(actions.setCart(resolveCart));
    toast.success("Thêm giỏ hàng thành công", {
      position: "bottom-center",
    });
  };

  return (
    <>
      {isSkeleton ? (
        SkeletonProduct()
      ) : (
        <div className="cursor-pointer w-full">
          <div className="w-[170px] md:w-[230px] lg:w-[250px] h-fit group mx-auto">
            <div className="relative overflow-hidden">
              <div
                onClick={() => {
                  if (window.innerWidth <= 992) return; // Chỉ thực hiện khi ở chế độ di động
                  console.log("click");
                  console.log("onShowDetail: ", onShowDetail);
                  onShowDetail && onShowDetail(uuid);
                }}
              >
                <div>
                  <img
                    src={avatar}
                    alt=""
                    className="mx-auto w-full h-[250px] md:h-[350px] xl:h-[400px] object-cover"
                  />
                </div>
              </div>
              <div>
                {/* Phần dành cho màn hình di động */}
                {/* <div className="block lg:hidden">
                  <div className="h-[50px] w-full flex items-end justify-end -bottom-10">
                    <button
                      className="bg-[#121212] text-sm text-white w-full h-[50px]"
                      onClick={handleAddCart}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div> */}

                {/* Phần dành cho màn hình lớn */}
                <div className="">
                  <div className="absolute h-[50px] lg:h-[70px] w-full bg-slate-500/0 flex items-end justify-end -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      className="bg-[#121212] text-sm lg:text-base text-white w-full h-[50px] lg:h-[70px]"
                      onClick={handleAddCart}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3
                className="text-[13px] md:text-base my-4 font-light"
                onClick={() => {
                  handleClickDetail(uuid);
                }}
              >
                {product_name}
              </h3>
              <p className="mb-7 text-sm md:text-base font-medium">
                {formatCurrency(price)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
