import React, { useState, useEffect } from 'react';
import './create_product.css'
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const EditTypeProduct = ({ closePopup, loading, uuid , reload}) => {

    const [product_name, setProductName] = useState("")
    const [tradeMake, setTradeMake] = useState("");
    const [price, setPrice] = useState(0);
    const [number, setNumber] = useState(0);
    const [label, setLabel] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [avatar1, setAvatar1] = useState({});
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        // Gọi API hoặc thao tác lấy dữ liệu đơn hàng ở đây
        
        const fetchData = async () => {
            try {
                const fetchedOrders = await fetch(`${backendUrl}/api/get/typeProduct/id/${uuid}`);
                const json = await fetchedOrders.json();
                console.log("fetchedOrders: ", json);
                setProductName(json.name);
                setLabel(json.label);
                setDescription(json.description);
                setAvatar1({});
                if (json.hasOwnProperty("featured")) {
                    // Thuộc tính "featured" tồn tại trong đối tượng JSON
                    setIsChecked(json.featured);
                } else {
                // Thuộc tính "featured" không tồn tại trong đối tượng JSON
                setIsChecked(false);
                }
                // setOrders(json);
    
            } catch (error) {
              console.log(error);
            } 
        };
        fetchData();
    
        
      }, [uuid]);






    const handleAvatar1 = (event)=>{
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result;
            // console.log(base64String);
            const data1 = {
                name: file.name,
                base64: base64String
            };
            setAvatar1(data1);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
        
    };
    const [avatar2, setAvatar2] = useState({});

    const handleAvatar2 = (event)=>{
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result;
            // console.log(base64String);
            const data2 = {
                name: file.name,
                base64: base64String
            };
            setAvatar2(data2);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
        
        
    };

    const [image, setImage] = useState([]);

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
                    base64: base64String
                };
                imageArray.push(imageData);
    
                // Nếu đã đọc xong tất cả các ảnh, cập nhật state
                if (imageArray.length === selectedFiles.length) {
                    setImage(imageArray);
                }
            };
    
            if (file) {
                reader.readAsDataURL(file);
            }
        }
    };


    const handleTypeProduct = ()=>{
        
    }
    const close = () =>{
        closePopup();
    }
    
    const add_product = ()=>{
        const data = {
            name: product_name,
            label: label,
            description: description,
            avatar1: JSON.stringify(avatar1),
            
        };
        // console.log(JSON.stringify(avatar1));
        // console.log(data);
        if (!data.name) {
            alert("Vui lòng nhập tên");
            return;
        }
        if (!data.trademake) {
            data.trademake = "không thương hiệu"
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
        const url = `${backendUrl}/api/edit/typeProduct/id/${uuid}`;
        const params = data;
    
        const queryParams = new URLSearchParams(params);
        closePopup();
        loading();
        fetch(`${url}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(data =>{
                // console.log(data);
                
                alert("Thay đổi sản phẩm thành công");
                reload();
                
            }
                
            )
          .catch(error => console.error('Error:', error));
        





        // console.log("data: ", data);
    }


    return(
        <div className='create_product'>
            <h2>Thay đổi thông tin sản phẩm</h2>
            <div className='product_name'>
                Loại sản phẩm: 
                <input
                    type="product_name"
                    id="product_name"
                    value={product_name}
                    placeholder="Nhập loại sản phẩm"
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
            </div>

            


            <div className='label'>
                Giới thiệu: 
                <input
                    type="text"
                    id="label"
                    value={label}
                    placeholder="Giới thiệu sản phẩm"
                    onChange={(e) => setLabel(e.target.value)}
                    required
                />
            </div>
            <div className='description'>
                Chi tiết: 
                <textarea
                    id="description"
                    value={description}
                    placeholder="Chi tiết sản phẩm"
                    rows="4"  
                    cols="50" 
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                
            </div>

            
            
            <div className='avatar'>
                Ảnh đại diện 1: 
                <input
                    type="file"
                    id="avatar1"
                    // placeholder="Giới thiệu sản phẩm"
                    onChange={(event) => handleAvatar1(event)}
                />
            </div>
            
            


            <div className='bthem'>
                <button onClick={add_product}>Lưu</button>
                <button onClick={close}>Đóng</button>
            </div>

        </div>
    );
};

export default EditTypeProduct;
