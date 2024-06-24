// ! React Library
import { Fragment, useCallback, useDeferredValue, useState } from "react";
import { useQuery } from "react-query";
import { useCartStorage } from "@/Hooks/useCartStorage";
import { useDispatch } from "react-redux";
import { actions } from "@/Redux/actions/cart.action";

// ! Component
import Banner from "@/Components/Banner";
import { CategoryTabs } from "@/Components/CategoryTab";
import { ProductCard } from "@/Components/ProductCard";
import { HPagination } from "@/Components/Pagination";
import { Divider } from "@/Components/Divider";
import { ImageGallery } from "@/Components/ImageGallery";
import Modal from "@/Components/Modal/Modal";
import BlankPage from "@/Components/BlankPage/BlankPage";
import Quantity from "@/Components/Quantity/Quantity";
import { Button } from "@/Components/ui/button";

// ! Assests
import Slider1 from "@/assets/image/detail/slide-1.png";
import Slider2 from "@/assets/image/detail/slide-2.png";
import Slider3 from "@/assets/image/detail/slide-3.png";
import Slider4 from "@/assets/image/detail/slide-4.png";

// ! Helpers
import { HandleAddCart, formatCurrency } from "@/Helper/helper";

// ! Apis and Types
import { getProducts } from "@/Apis/Product/Product.api";
import { getProductTypes } from "@/Apis/Product/ProductType.api";
import { Product } from "@/Types/Product.type";

const PAGE_SIZE = 8;

const TAB_TYPE_ALL = {
  uuid: 0,
  name: "Tất cả",
  isDelete: false,
};

const DEFAULT_QUANTITY = 1;

export default function Products() {
  const dispatch: any = useDispatch();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [typeId, setTypeId] = useState<number>(0);
  const [detailProduct, setDetailProduct] = useState<Product>();
  const [page, setPage] = useState(1);
  const [quantityState, setQuantityState] = useState<number>(DEFAULT_QUANTITY);
  const { saveCartStorage } = useCartStorage();

  const { isLoading: isLoadingProductList, data: productList }: any = useQuery({
    queryKey: ["products", page, typeId],
    queryFn: () => {
      const controller = new AbortController();

      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getProducts(page, PAGE_SIZE, typeId, controller.signal);
    },
    keepPreviousData: true,
    retry: 0,
  });

  console.log("Query productList:", productList);

  const { isLoading: isLoadingProductType, data: productType }: any = useQuery({
    queryKey: ["typeProduct"],
    queryFn: () => {
      const controller = new AbortController();

      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getProductTypes(controller.signal);
    },
    keepPreviousData: true,
    retry: 0,
  });
  console.log("productType: ", productType);
  console.log("isLoadingProductType: ", isLoadingProductType);
  const handleToggleModal = (visible: boolean) => {
    setIsVisible(visible);

    if (!visible) {
      setQuantityState(DEFAULT_QUANTITY);
    }
  };

  const slideImages = [Slider1, Slider2, Slider3, Slider4];

  const renderXMLBody = () => {
    return (
      <div className="grid grid-cols-2 mt-12">
        <div>
          <ImageGallery
            slides={detailProduct?.listImage || []}
            options={{}}
            customClass="pr-10 w-full"
            showArrow
          />
        </div>

        <div className="text-center text-black">
          <h3 className="text-2xl font-light">{detailProduct?.product_name}</h3>

          <div className="my-5">
            <span className=" font-light text-base text-[#777171]">
              Thương hiệu{" "}
              <span className="font-medium text-black">
                {detailProduct?.trademake}
              </span>
            </span>
          </div>

          <p className="font-normal text-4xl">
            {formatCurrency(detailProduct?.price || 0)}
          </p>

          <p className="font-light text-sm mt-3">{detailProduct?.label}</p>

          <div className="my-6 flex items-center justify-center">
            <div className="pr-1">
              <Quantity
                defaultValue={DEFAULT_QUANTITY}
                limit={detailProduct?.number}
                onChanged={handleQuantityChanged}
                hasPreventByLimit
              />
            </div>

            <div className="flex-1 ml-1">
              <Button size={"cart"} variant={"cart-btn"} onClick={handleCart}>
                Thêm vào giỏ hàng
              </Button>
            </div>
          </div>

          <Divider className="my-6" />

          <span className="text-sm font-light text-[#777171]">
            Gọi đặt mua:{" "}
            <span className="font-medium text-black">0904 229 229</span> để
            nhanh chóng đặt hàng
          </span>
        </div>
      </div>
    );
  };

  const deferredProductList = useDeferredValue(productList?.data?.data || []);
  const deferredProductType = useDeferredValue(productType?.data || []);

  const handleQuantityChanged = (quantity: number) => {
    setQuantityState(quantity);
  };

  const handleCart = () => {
    const payload = {
      ...detailProduct,
      quantity: quantityState,
    };

    const resolveCart = HandleAddCart(payload);

    // * convert JSON string để lưu xuống local storage
    saveCartStorage(resolveCart);

    // * Thao tác với state cart trong reducer
    dispatch(actions.setCart(resolveCart));

    handleToggleModal(false);
  };

  const handleShowDetailProduct = useCallback(
    (uuid: string | number) => {
      handleToggleModal(true);

      const findProductById: Product = deferredProductList.find(
        (prod: Product) => prod.uuid === uuid
      );
      console.log("findProductById: ", findProductById);
      setDetailProduct(findProductById);
    },
    [deferredProductList]
  );

  return (
    <main>
      <div className="relative">
        <img
          className="h-[160px] md:h-[400px] w-full object-cover"
          src="https://images.pexels.com/photos/7615574/pexels-photo-7615574.jpeg"
          alt=""
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-[16px] md:text-[42px] font-bold text-white">
            Cửa hàng
          </h1>
        </div>
      </div>

      <Modal
        visible={isVisible}
        onChangeVisible={handleToggleModal}
        renderHeader={null}
        renderBody={renderXMLBody()}
      />

      <div className="container mb-16 mt-24">
        {!isLoadingProductType && (
          <CategoryTabs
            options={[TAB_TYPE_ALL, ...deferredProductType]}
            onHandleToggleTab={(typeId: number) => {
              setTypeId(typeId);
              setPage(1);
            }}
            isShowSummary={true}
            // summaryIndex={productList?.data.total}
            summaryIndex={productList?.data?.total}
            defaultTab={0}
          />
        )}
      </div>

      {isLoadingProductList ? (
        <div className="container grid grid-cols-4 gap-5">
          {Array.from(Array(PAGE_SIZE).keys()).map((_, idx) => {
            return <ProductCard key={idx} isSkeleton />;
          })}
        </div>
      ) : (
        <>
          {deferredProductList.length ? (
            <div className="container grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mx-auto">
              {deferredProductList.map((product: Product, idx: any) => {
                return (
                  <Fragment key={`${product.uuid}_${idx}`}>
                    <ProductCard
                      {...product}
                      onShowDetail={(uuid: string | any) => {
                        handleShowDetailProduct(uuid);
                      }}
                    />
                  </Fragment>
                );
              })}
            </div>
          ) : (
            <BlankPage
              text="Không có sản phẩm nào"
              subText="Vui lòng chọn danh mục khác"
              isHaveColor
            />
          )}

          <div className="w-full mx-auto pt-10 pb-10">
            <HPagination
              total={productList?.data.total}
              pageSize={8}
              current={page}
              onChangePage={(page: number) => {
                setPage(page);
              }}
            />
          </div>
        </>
      )}
    </main>
  );
}
