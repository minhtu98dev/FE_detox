import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

import "./create_product.css";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Create_Product = ({ closePopup, loading, reload }) => {
  const editorRef = useRef(null);

  const [product_name, setProductName] = useState("");
  const [tradeMake, setTradeMake] = useState("");
  const [price, setPrice] = useState(0);
  const [number, setNumber] = useState(0);
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [listTypeProduct, setListTypeProduct] = useState([]);
  const [avatar1, setAvatar1] = useState({});

  useEffect(() => {
    // Gọi API hoặc thao tác lấy dữ liệu đơn hàng ở đây

    const fetchData = async () => {
      try {
        const fetchedOrders = await fetch(`${backendUrl}/api/typeProduct`);
        const json = await fetchedOrders.json();
        console.log("fetchedOrders: ", json);

        setListTypeProduct(json);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const handleAvatar1 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      // console.log(base64String);
      const data1 = {
        name: file.name,
        base64: base64String,
      };
      setAvatar1(data1);
    };
    if (file) {
      reader.readAsDataURL(file);
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };
  const [avatar2, setAvatar2] = useState({});

  const handleAvatar2 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      // console.log(base64String);
      const data2 = {
        name: file.name,
        base64: base64String,
      };
      setAvatar2(data2);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const [image, setImage] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleImage = (event) => {
    const selectedFiles = event.target.files;
    const imageArray = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;
        const imageData = {
          name: file.name,
          base64: base64String,
        };
        imageArray.push(imageData);

        // Nếu đã đọc xong tất cả các ảnh, cập nhật state
        if (imageArray.length === selectedFiles.length) {
          setImage(imageArray);
        }
      };

      if (file) {
        reader.readAsDataURL(file);
        const files = Array.from(event.target.files);
        const urls = files.map((file) => URL.createObjectURL(file));
        setImageUrls(urls);
      }
    }
  };

  function handleTypeProduct(event) {
    const selectedValue = event.target.value;
    setType(selectedValue);
    // Tiếp tục xử lý dữ liệu theo nhu cầu của bạn
  }
  const close = () => {
    closePopup();
  };
  const add_product = () => {
    const data = {
      name: product_name,
      trademake: tradeMake,
      price: price,
      number: number,
      label: label,
      description: editorRef.current.getContent(),
      type: type,
      featured: isChecked,
      avatar1: JSON.stringify(avatar1),
      // avatar1_name: avatar1.name,
      // avatar1_base64: avatar1.base64,
      avatar2: JSON.stringify(avatar2),
      images: JSON.stringify(image),
    };
    // console.log(JSON.stringify(avatar1));
    // console.log(data);
    if (!data.name) {
      alert("Vui lòng nhập tên");
      return;
    }
    if (!data.trademake) {
      data.trademake = "không thương hiệu";
    }
    if (!data.label) {
      alert("vui lòng nhập giới thiệu sản phẩm");
      return;
    }
    if (!data.description) {
      alert("Chi tiết sản phẩm");
      return;
    }
    // if (!data.avatar1_name) {
    //     alert("ảnh sản phẩm");
    //     return;
    // }
    const params = data;

    const queryParams = new URLSearchParams(params);
    closePopup();
    loading();
    fetch(`${backendUrl}/api/add/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);

        alert("thêm sản phẩm thành công");
        reload();
      })
      .catch((error) => console.error("Error:", error));

    // console.log("data: ", data);
  };
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="create_product">
      <h2>Thêm sản phẩm mới</h2>
      <div className="product_info_top">
        <div className="product_info_left">
          <div className="product_name">
            Tên sản phẩm:
            <input
              type="product_name"
              id="product_name"
              value={product_name}
              placeholder="Nhập tên sản phẩm"
              onChange={(e) => setProductName(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="price">
            Giá:
            <input
              type="number"
              id="price"
              value={price}
              placeholder="Giá sản phẩm"
              onChange={(e) => setPrice(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="number">
            Số lượng:
            <input
              type="number"
              id="number"
              value={number}
              placeholder="Số lượng sản phẩm"
              onChange={(e) => setNumber(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="label">
            Giới thiệu:
            <input
              type="text"
              id="label"
              value={label}
              placeholder="Giới thiệu sản phẩm"
              onChange={(e) => setLabel(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="type_product">
            Loại:
            <select
              onChange={handleTypeProduct}
              defaultValue={"detux"}
              className="border border-gray-600 rounded-md "
            >
              {listTypeProduct.map((option) => (
                <option key={option.uuid} value={option.uuid}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="check_noibac">
            <label className="mt-2">Sản phẩm nổi bậc: </label>
            <div className="input">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="mx-2"
              />
            </div>
          </div>
        </div>

        <div className="product_info_right">
          <div className="avatar mb-4">
            <h4 className="mt-3">Ảnh đại diện:</h4>
            <input
              type="file"
              id="avatar1"
              // placeholder="Giới thiệu sản phẩm"
              onChange={(event) => handleAvatar1(event)}
            />
          </div>
          {avatarUrl && (
            <div className="avatar-preview">
              <img
                src={avatarUrl}
                alt="Avatar Preview"
                width="50"
                height="50"
              />
            </div>
          )}

          <div className="avatar">
            <h4 className="mt-3">Ảnh khác:</h4>
            <input
              type="file"
              id="avatar2"
              multiple
              // placeholder="Giới thiệu sản phẩm"
              onChange={(event) => handleImage(event)}
            />
          </div>
          <div className="avatar-preview">
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Avatar Preview ${index + 1}`}
                width="50"
                height="50"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="description mt-3">
        <h4 className="mb-3">Chi tiết:</h4>
        <Editor
          apiKey="dktrsjgv7t0oy38tkp29i0ijxq3pk9ted147urtwhky8n49u"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue=""
          init={{
            height: 230,
            width: 1030,
            menubar: false,
            plugins: [
              "autolink",
              "code",
              "link",
              "lists",
              "emoticons",
              "image",
              "media",
              "table",
              "wordcount",
              "fullscreen",
              "help",
              "charmap",
              "advlist",
            ],
            toolbar:
              "undo redo | casechange blocks | bold italic backcolor | " +
              "alignleft aligncenter alignright alignjustify | " +
              "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>

      <div className="product_info_bottom">
        <div className="bthem">
          <button onClick={close}>Hủy</button>
          <button onClick={add_product}>Thêm</button>
        </div>
      </div>
    </div>
  );
};

export default Create_Product;
