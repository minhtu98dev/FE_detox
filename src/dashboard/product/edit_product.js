import React, { useRef,useState, useEffect } from 'react';
import './create_product.css'
import { Editor } from '@tinymce/tinymce-react';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Edit_Product = ({ closePopup, loading, uuid , reload}) => {
    const editorRef = useRef(null);
    const [product_name, setProductName] = useState("")
    const [tradeMake, setTradeMake] = useState("");
    const [price, setPrice] = useState(0);
    const [number, setNumber] = useState(0);
    const [label, setLabel] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [typeName, setTypeName] = useState("");
    const [avatar1, setAvatar1] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const [listTypeProduct, setListTypeProduct] = useState([]);
    const [image, setImage] = useState([]);
    const [fetchDataCompleted, setFetchDataCompleted] = useState(false);

    const [avatarUrl, setAvatarUrl] = useState("");
    const [imageUrls, setImageUrls] = useState([]);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        // Gọi API hoặc thao tác lấy dữ liệu đơn hàng ở đây
        
        const fetchData = async () => {
            try {
                const fetchedOrders = await fetch(`${backendUrl}/api/product/id/${uuid}`);
                const json = await fetchedOrders.json();
                console.log("fetchedOrders: ", json);
                setProductName(json.product_name);
                setTradeMake(json.trademake);
                setPrice(json.price);
                setNumber(json.number);
                setLabel(json.label);
                setDescription(json.description);
                setTypeName(json.type);
                setAvatarUrl(json.avatar);
                setAvatar1({});
                setAvatar2({});
                setImage([]);
                setImageUrls(json.listImage);
                if (json.hasOwnProperty("featured")) {
                    // Thuộc tính "featured" tồn tại trong đối tượng JSON
                    setIsChecked(json.featured);
                } else {
                // Thuộc tính "featured" không tồn tại trong đối tượng JSON
                setIsChecked(false);
                }
                setFetchDataCompleted(true); // Đặt cờ cho biết fetchData đã hoàn thành
                // setOrders(json);
    
            } catch (error) {
              console.log(error);
            } 
        };
        fetchData();
    
        
      }, [uuid]);



      useEffect(() => {
        // Gọi API hoặc thao tác lấy dữ liệu đơn hàng ở đây
        if (fetchDataCompleted){
            const fetchData2 = async () => {
                try {
                    const fetchedOrders = await fetch(`${backendUrl}/api/typeProduct`);
                    const json = await fetchedOrders.json();
                    
                    // Tìm chỉ số của phần tử "c" trong mảng

                    


                    // console.log("type: ", type);
                    const cIndex = json.findIndex(item => item.name === type);
                    
                    // Nếu phần tử "c" tồn tại trong mảng
                    if (cIndex !== -1) {
                        // Loại bỏ phần tử có item.name == type khỏi mảng
                        const updatedList = json.filter(item => item.name !== type);
                        // console.log("updatedList: ", updatedList);
                        // Thêm phần tử có item.name == type vào đầu mảng
                        updatedList.unshift(json[cIndex]);
                    
                        // Cập nhật state với mảng mới
                        setListTypeProduct(updatedList);
                    }
                    else {
                        // Nếu phần tử "c" không tồn tại, giữ nguyên mảng ban đầu
                        if (type === "") {
                            // Thêm phần tử mới vào đầu mảng
                            json.unshift({"name":""});
                        }
                        setListTypeProduct(json);
                    }
    
                    
                    // setListTypeProduct(json);
        
                } catch (error) {
                  console.log(error);
                } 
            };
            fetchData2();
        }
        
    
        
      }, [fetchDataCompleted,type]);
      console.log("list type: ", listTypeProduct);



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
            const url = URL.createObjectURL(file);
            setAvatarUrl(url);
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
                const files = Array.from(event.target.files);
                const urls = files.map(file => URL.createObjectURL(file));
                setImageUrls(urls);
            }
        }
    };


    
    function handleTypeProduct(event) {
        const selectedValue = event.target.value;
        setType(selectedValue);
        // Tiếp tục xử lý dữ liệu theo nhu cầu của bạn
    }
    const close = () =>{
        closePopup();
    }
    
    const add_product = ()=>{
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
            images: JSON.stringify(image)

        };
        // console.log(JSON.stringify(avatar1));
        console.log(data);
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
        const url = `${backendUrl}/api/edit/product/id/${uuid}`;
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
            <div className='product_info_top'>
                <div className='product_info_left'>

                    <div className='product_name'>
                        Tên sản phẩm: 
                        <input
                            type="product_name"
                            id="product_name"
                            value={product_name}
                            placeholder="Nhập tên sản phẩm"
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </div>

                    <div className='trade_make'>
                        Thương hiệu: 
                        <input
                            type="trade_make"
                            id="trade_make"
                            value={tradeMake}
                            placeholder="Nhập thương hiệu"
                            onChange={(e) => setTradeMake(e.target.value)}
                            required
                        />
                    </div>

                    <div className='price'>
                        Giá: 
                        <input
                            type="number"
                            id="price"
                            value={price}
                            placeholder="Giá sản phẩm"
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>

                    <div className='number'>
                        Số lượng: 
                        <input
                            type="number"
                            id="number"
                            value={number}
                            placeholder="Số lượng sản phẩm"
                            onChange={(e) => setNumber(e.target.value)}
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
                    

                    <div className='type_product'>
                        Loại:
                        {/* <select onChange={handleTypeProduct} defaultValue={type}>
                            {listTypeProduct.map((type2, index) => (
                                <option key={index} value={type2}>
                                {type2}
                                </option>
                            ))}
                        </select> */}
                        
                        <select onChange={handleTypeProduct} defaultValue={listTypeProduct.length > 0 ? listTypeProduct[0].name : ""}>
                            <option value="" disabled>
                                {typeName}
                            </option>       
                            {listTypeProduct.map((option) => (
                                <option key={option.uuid} value={option.uuid}>{option.name}</option>
                            ))}
                        </select>
                        
                    </div>
                    <div className='check_noibac'>
                        <label>Sản phẩm nổi bậc: </label>
                        <div className='input'>
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                        
                    </div>

                </div>

                

                <div className='product_info_right'>
                    <div className='avatar'>
                        Ảnh đại diện: 
                        <input
                            type="file"
                            id="avatar1"
                            // placeholder="Giới thiệu sản phẩm"
                            onChange={(event) => handleAvatar1(event)}
                        />
                    </div>
                    {avatarUrl && (
                        <div className='avatar-preview'>
                            <img src={avatarUrl} alt="Avatar Preview" width="50" height="50" />
                        </div>
                    )}
                    {/* <div className='avatar'>
                        Ảnh đại diện 2: 
                        <input
                            type="file"
                            id="avatar2"
                            // placeholder="Giới thiệu sản phẩm"
                            onChange={(event) => handleAvatar2(event)}
                        />
                    </div> */}

                    <div className='avatar'>
                        Ảnh khác: 
                        <input
                            type="file"
                            id="avatar2"
                            multiple
                            // placeholder="Giới thiệu sản phẩm"
                            onChange={(event) => handleImage(event)}
                        />
                    </div>
                    <div className='avatar-preview'>
                        {imageUrls.map((imageUrls, index) => (
                            <img key={index} src={imageUrls} alt={`Avatar Preview ${index + 1}`} width="50" height="50" />
                        ))}
                    </div>
                </div>
            </div>
            
            <div className='description'>
                Chi tiết: 
                <Editor
                    apiKey='dktrsjgv7t0oy38tkp29i0ijxq3pk9ted147urtwhky8n49u'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={description}
                    init={{
                        height: 230,
                        width:1030,
                        
                        menubar: false,
                        plugins: [
                            'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'markdown',
                            'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                            'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
                            'alignleft aligncenter alignright alignjustify | ' +
                            'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        setup: (editor) => {
                            editor.on('SkinLoaded', () => {
                                // Override z-index for TinyMCE dropdown menus
                                const style = document.createElement('style');
                                style.innerHTML = `
                                    .tox-tinymce-aux, .tox .tox-silver-sink, .tox .tox-dialog, .tox .tox-pop {
                                        z-index: 10000 !important;
                                    }
                                `;
                                document.head.appendChild(style);
                            });
                        }
                    }}
                />


                {/* <textarea
                    id="description"
                    value={description}
                    placeholder="Chi tiết sản phẩm"
                    rows="4"  
                    cols="50" 
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{
                        border: '1px solid #ccc', // Đường viền 1px với màu xám nhạt
                        borderRadius: '5px', // Góc bo tròn
                        padding: '5px' // Khoảng cách từ nội dung đến đường viền
                    }}
                ></textarea>
                 */}
            </div>

            <div className='product_info_bottom'>
                <div className='bthem'>
                    <button onClick={add_product}>Lưu</button>
                    <button onClick={close}>Đóng</button>
                </div>
            </div>
            

        </div>
    );
};

export default Edit_Product;
