import React, { useState, useEffect } from "react";
import "./create_product.css";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Create_Product = ({ closePopup, loading, reload }) => {
  const [product_name, setProductName] = useState("");

  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [avatar1, setAvatar1] = useState({});

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
    }
  };

  const close = () => {
    closePopup();
  };
  const add_product = () => {
    const data = {
      name: product_name,
      label: label,
      description: description,
      avatar1: JSON.stringify(avatar1),
    };
    // console.log(JSON.stringify(avatar1));
    console.log(data);
    if (!data.name) {
      alert("Vui lòng nhập tên");
      return;
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
    fetch(`${backendUrl}/api/add/typeProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);

        alert("thêm loại sản phẩm thành công");
        reload();
      })
      .catch((error) => console.error("Error:", error));

    // console.log("data: ", data);
  };

  return (
    <div className="type_product">
      <h2 className="font-bold text-xl">Thêm loại sản phẩm</h2>
      <div className="product_name">
        Tên loại:
        <input
          type="product_name"
          id="product_name"
          value={product_name}
          placeholder="Nhập tên loại"
          onChange={(e) => setProductName(e.target.value)}
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
          placeholder="Giới thiệu"
          onChange={(e) => setLabel(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="description">
        Chi tiết:
        <textarea
          id="description"
          value={description}
          placeholder="Chi tiết"
          rows="4"
          cols="50"
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-600 rounded-md px-4 py-2"
          required
        ></textarea>
      </div>

      <div className="avatar">
        <h4 className="mt-3">Ảnh đại diện:</h4>
        <input
          type="file"
          id="avatar1"
          // placeholder="Giới thiệu sản phẩm"
          onChange={(event) => handleAvatar1(event)}
        />
      </div>

      <div className="bthem">
        <button onClick={close}>Hủy</button>
        <button onClick={add_product}>Thêm</button>
      </div>
    </div>
  );
};

export default Create_Product;
