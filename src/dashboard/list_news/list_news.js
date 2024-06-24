import React, { useRef,useState, useEffect } from 'react';
// import './product.css'
import './add_news.css'

import { RiEdit2Line } from 'react-icons/ri';
import { AiOutlineDelete } from 'react-icons/ai';

// import TotalProduct from './total_product';
// import TYpeProduct from './type_product';
// import Create_Product from './create_product';
// import Edit_Product from './edit_product';
import LoadingSpinner from '../loading';
import { Editor } from '@tinymce/tinymce-react';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

// import EditOrder from './edit_order';
const News = () => {
  
  const [isLoading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const [clickEdit, setClickEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [clickAdd, setClickAdd] = useState(false);

  const editorRef = useRef(null);
    const [title, setTitle] = useState("");
    const [label, setLabel] = useState("");
    const [title_edit, setEditTitle] = useState("");
    const [label_edit, setEditLabel] = useState("");

    const [imageSrc, setImageSrc] = useState(null);
    const [image_title_base64, setImage_title] = useState("");
    const [imageSrcEdit, setImageSrcEdit] = useState(null);
    const [image_title_base64_edit, setImage_title_edit] = useState({});
  
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5); // Số đơn hàng trên mỗi trang
  const [search, setSearch] = useState('');
  // Giả sử orders là một mảng chứa thông tin đơn hàng
  const fetchDataReload = async () => {
    try {
        // Thêm độ trễ 1 giây (1000 miliseconds) trước khi gọi API
        setTimeout(async () => {
          const fetchedOrders = await fetch(`${backendUrl}/api/get/news`);
          const json = await fetchedOrders.json();
          console.log("fetchedOrders: ", json);
          setOrders(json);
        }, 1000);
      } catch (error) {
        console.log(error);
      } 
    };
  
    useEffect(() => {
        // Gọi API hoặc thao tác lấy dữ liệu đơn hàng ở đây
        
        const fetchData = async () => {
            try {
                const fetchedOrders = await fetch(`${backendUrl}/api/get/news`);
                const json = await fetchedOrders.json();
                console.log("fetchedOrders: ", json);
    
                setOrders(json);
    
            } catch (error) {
              console.log(error);
            } 
        };
        fetchData();
    
        
      }, []);
  // Tính chỉ số của đơn hàng đầu tiên và đơn hàng cuối cùng trên trang hiện tại
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Xử lý chuyển đến trang kế tiếp
  const nextPage = () => {
    if (currentPage < Math.ceil(orders.length / ordersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Xử lý trở về trang trước đó
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };



  // Thay đổi số lượng đơn hàng trên mỗi trang
  const handleOrdersPerPageChange = (e) => {
    setOrdersPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Chuyển về trang đầu tiên khi thay đổi số lượng đơn hàng trên mỗi trang
  };

  const [status_edit, setStatusEdit] = useState("");
  const handleEditStatus = (e) =>{
    console.log(e.target.value);
    setStatusEdit(e.target.value);
  }


  const convert_time =(str_time) =>{
    const date = new Date(str_time);
    const formattedDate = `${("0" + date.getDate()).slice(-2)}/${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()} ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${("0" + date.getSeconds()).slice(-2)}`;
    return formattedDate
  }

  const [showPopupCreate, setShowPopupCreate] = useState(false);
  const openPopupCreate = () => {
    setShowPopupCreate(true);
  };
  
  const closePopupCreate = () => {
    setShowPopupCreate(false);
    
    // fetchDataReload();
  };

  const reloadData = () =>{
    console.log("tat loading");
    setLoading(false);
    fetchDataReload();
  }



  const [showPopup, setShowPopup] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [uuid_edit, setUuidEdit] = useState("");
  
  const openPopup = ({uuid}) => {
    setUuidEdit(uuid);
    setShowPopup(true);
  };
  
  const closePopup = () => {
    setShowPopup(false);
    fetchDataReload();
  };

  const openPopupDelete = ({uuid}) => {
    setUuidEdit(uuid);
    setShowPopupDelete(true);
  };
  
  const closePopupDelete = () => {
    setShowPopupDelete(false);
  };
  const ApplyDelete =()=>{
    
    const url = `${backendUrl}/api/delete/news/id/${uuid_edit}`;

    setLoading(true);
    fetch(`${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        })
        .then(response => response.json())
        .then(data =>{
          // console.log(data);
          
          alert("Xóa sản phẩm thành công");
          setLoading(false);
          fetchDataReload();
        })
        .catch(error => console.error('Error:', error));
        
        // navigate("/cart")
        // window.scrollTo(0, 0);





    setShowPopupDelete(false);
    
    // monthorderReload();
    // revenueReload();
  }

  const ApplyEdit = () => {

    const data_edit = {
        uuid: uuid_edit,
        status: status_edit
    }



    console.log(data_edit);
    const params = data_edit;

    const queryParams = new URLSearchParams(params);

    fetch(`${backendUrl}/api/edit/order?${queryParams}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
        
        // navigate("/cart")
        // window.scrollTo(0, 0);





    setShowPopup(false);
    fetchDataReload();
  };
  
  const handleLoading = () => {
    setLoading(true); // Đặt isLoading thành true
  };

  const fetchDataSearch = async () => {
    try {
        // Thêm độ trễ 1 giây (1000 miliseconds) trước khi gọi API
        setTimeout(async () => {
          const fetchedOrders = await fetch(`${backendUrl}/api/get/news/title/${search}`);
          const json = await fetchedOrders.json();
          console.log("fetchedOrders: ", json);
          setOrders(json);
        }, 100);
      } catch (error) {
        console.log(error);
      } 
    };

  const get_product_search = () =>{
    console.log(search);
    fetchDataSearch();
  }
  const add_product = () =>{
    setClickEdit(false);
    setClickAdd(true);
  }
  
  const editNews = ({order})=>{
    console.log("click edit");
    setClickEdit(true);
    setClickAdd(false);
    setDataEdit(order);
    
  }
  




  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result;
            // console.log(base64String);
            const data2 = {
                name: file.name,
                base64: base64String
            };
            setImage_title(data2);
        };

        reader.onload = (e) => {
            setImageSrc(e.target.result);
        };
        reader.readAsDataURL(file);


    }
};

const handleImageUploadEdit = (event) => {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
          const base64String = reader.result;
          // console.log(base64String);
          const data2 = {
              name: file.name,
              base64: base64String
          };
          setImage_title_edit(data2);
      };

      reader.onload = (e) => {
          setImageSrcEdit(e.target.result);
      };
      reader.readAsDataURL(file);


  }
};
const actionEdit = () => {
    if (editorRef.current) {

        if (!title_edit) {
            if (dataEdit.title){
              setEditTitle(dataEdit.title);
            
            }
            else{
              alert("Vui lòng nhập tiêu đề");
              return;
            }
            
        }
        if (!label_edit) {
          if (dataEdit.label){
            setEditLabel(dataEdit.label)
          
          }
          else{
            alert("Vui lòng nhập mô tả");
            return;
          }
        }
        

        const data2 = {
            title: title_edit,
            label: label_edit,
            image_base64: JSON.stringify(image_title_base64_edit),
            description: editorRef.current.getContent(),
            uuid: dataEdit.uuid
        };
        console.log(data2);

        fetch(`${backendUrl}/api/edit/news`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data2)
          })
          .then(response => response.json())
          .then(data =>{
                // console.log(data);
                
                alert("Thay đổi thành công");
                setLoading(false);
                fetchDataReload();
                setClickAdd(false);
              setClickEdit(false);
            }
                
            )
          .catch(error => console.error('Error:', error));
      
        // console.log(data2);
    }
};
const log = () => {
  if (editorRef.current) {

      if (!title) {
          alert("Vui lòng nhập tiêu đề");
          return;
      }
      if (!label) {
          alert("Vui lòng nhập mô tả");
          return;
      }
      if (!image_title_base64) {
          alert("Vui lòng thêm ảnh");
          return;
      }

      const data2 = {
          title: title,
          label: label,
          image_base64: JSON.stringify(image_title_base64),
          description: editorRef.current.getContent()
      };
      console.log(data2);

      fetch(`${backendUrl}/api/add/news`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data2)
        })
        .then(response => response.json())
        .then(data =>{
              // console.log(data);
              
              alert("Thêm thành công");
              setLoading(false);
              fetchDataReload();
              setClickAdd(false);
              setClickEdit(false);
          }
              
          )
        .catch(error => console.error('Error:', error));
    
      // console.log(data2);
  }
};

  
  const setEditTitlehandel = (e) => {
    setDataEdit({
      ...dataEdit,
      title: e.target.value,
  });
    setEditTitle(e.target.value);
};

const setEditLabelhandel = (e) => {
  setDataEdit({
    ...dataEdit,
    label: e.target.value,
});
  setEditLabel(e.target.value);
};

  return (
    <div className='admin-product'>
        {/* Thêm lớp overlay */}
        {isLoading && <div className="overlay"><LoadingSpinner /></div>}
        {showPopup && <div className="overlay"></div>}

        {showPopupCreate && <div className="overlay"></div>}
        {/* <div className='thongtin'>
            <TotalProduct total={orders.length}></TotalProduct>
            <TYpeProduct total={1}></TYpeProduct>
            
        </div> */}

        <h3>DANH SÁCH TIN TỨC</h3>

        <div className='top'>
            <div className='top-left'>
                <div className='show'>
                    Dữ liệu/trang 
                    <select onChange={handleOrdersPerPageChange} value={ordersPerPage}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                </div>
                <div className='search'>
                
                    <input
                        type="search"
                        id="search"
                        value={search}
                        placeholder="Search..."
                        onChange={(e) => setSearch(e.target.value)}
                        required
                    />
                    <button onClick={get_product_search}>Tìm</button>
                    <button onClick={add_product}>Thêm</button>
                </div>
            </div>
            {/* <div className='top-right'>
                <button onClick={openPopupCreate}>+ Thêm sản phẩm</button>
            </div> */}
        </div>

      



      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tiêu đề</th>
            <th>Mô tả</th>
            <th>Ảnh</th>
            
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.title}</td>
              <td>{order.label}</td>
              <td><img src={order.image_url} style={{ width: '200px' }} alt="doanh_so_Image" /></td>
              
              
              <td  style={{ width: '140px' }}>
                {/* <button className='bt-edit' onClick={() => openPopup({ uuid: order.uuid })}><RiEdit2Line></RiEdit2Line></button> */}

                <button className='bt-edit'onClick={() => editNews({ order })}><RiEdit2Line></RiEdit2Line></button>
                <button className='bt-delete'onClick={() => openPopupDelete({ uuid: order.uuid })}><AiOutlineDelete></AiOutlineDelete></button>
              </td>
            </tr>
          ))}


        {showPopupCreate &&(
          <div className="popup">
            {/* <Create_Product closePopup={closePopupCreate} loading={handleLoading} reload={reloadData}></Create_Product> */}
          </div>
        )}
        {showPopupDelete && (
          <div className="popup">
            <h2>Bạn chắc chắn xóa?</h2>
            <div className='action'>
                <button onClick={closePopupDelete}>Đóng</button>
                <button onClick={ApplyDelete}>Xóa</button>
            </div>
          </div>
        )}
        {showPopup && (
        <div className="popup">
            {/* <Edit_Product closePopup={closePopup} loading={handleLoading} uuid={uuid_edit} reload={reloadData}></Edit_Product> */}
            
        </div>
        )}
        </tbody>
      </table>
      <div>
        
        <ul className="pagination">
            <button className='btnext' onClick={prevPage} disabled={currentPage === 1}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M16 19V5l-11 7z" transform="rotate(120 12 12)"/>
</svg>
            </button>
            {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, i) => (
                <button
                    key={i}
                    className={currentPage === i + 1 ? "active" : ""}
                    onClick={() => paginate(i + 1)}
                >
                    {i + 1}
                </button>
            ))}
            <button className='btnext' onClick={nextPage} disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M8 5v14l11-7z"/>
</svg>
            </button>
        </ul>
      </div>





      {clickAdd && (
      <>
        {/* <News></News> */}
            <h1 style={{ fontWeight: 'bold', textAlign: 'center', fontSize:'20px', marginTop: '30px' }}>THÊM MỚI BÀI VIẾT</h1>
            <h1>NỘI DUNG SẢN PHẨM</h1>
            <Editor
                apiKey='dktrsjgv7t0oy38tkp29i0ijxq3pk9ted147urtwhky8n49u'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<p>Chi tiết sản phẩm.</p>"
                init={{
                    height: 300,
                    menubar: false,
                    plugins: [
                        'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'markdown',
                        'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                        'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
                        'alignleft aligncenter alignright alignjustify | ' +
                        'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <div className='add_news'>

                <div className='container'>
                    <div className='title'>
                        <p>Tiêu đề: </p>
                        <p>Giới thiệu: </p>
                        
                    </div>
                    <div className='label'>
                        
                        <input
                            type="text"
                            id="title"
                            value={title}
                            placeholder="Nhập tiêu đề"
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <textarea
                            id="label"
                            value={label}
                            placeholder="giới thiệu"
                            rows="3"  
                            cols="50" 
                            onChange={(e) => setLabel(e.target.value)}
                            required
                            style={{
                                border: '1px solid #ccc', // Đường viền 1px với màu xám nhạt
                                borderRadius: '5px', // Góc bo tròn
                                padding: '5px' // Khoảng cách từ nội dung đến đường viền
                            }}
                        ></textarea>
                        
                    
                    </div>

                </div>
                <div className="App">
                    {imageSrc && (
                        <div className="image-container">
                            
                            <img src={imageSrc} alt="Hình ảnh đã tải lên" />
                        </div>
                    )}
                    <div>
                        <h1>Ảnh bìa</h1>
                        <input type="file" accept="image/*" onChange={handleImageUpload} />
                    </div>
                    
                    
                </div>
                <button onClick={log}>Lưu</button>   
            </div>
            
            
        </>

                  )}

{clickEdit && (
      <>
        {/* <News></News> */}
            <h1 style={{ fontWeight: 'bold', textAlign: 'center', fontSize:'20px', marginTop: '30px' }}>CHỈNH SỬA BÀI VIẾT</h1>
            <h1>NỘI DUNG SẢN PHẨM</h1>
            <Editor
                apiKey='dktrsjgv7t0oy38tkp29i0ijxq3pk9ted147urtwhky8n49u'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={dataEdit.description}
                init={{
                    height: 300,
                    menubar: false,
                    plugins: [
                        'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'markdown',
                        'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                        'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
                        'alignleft aligncenter alignright alignjustify | ' +
                        'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <div className='add_news'>

                <div className='container'>
                    <div className='title'>
                        <p>Tiêu đề: </p>
                        <p>Giới thiệu: </p>
                        
                    </div>
                    <div className='label'>
                        
                        <input
                            type="text"
                            id="title"
                            value={dataEdit.title}
                            placeholder="Nhập tiêu đề"
                            onChange={setEditTitlehandel}
                            required
                        />
                        <textarea
                            id="label"
                            value={dataEdit.label}
                            placeholder="giới thiệu"
                            rows="3"  
                            cols="50" 
                            onChange={setEditLabelhandel}
                            required
                            style={{
                                border: '1px solid #ccc', // Đường viền 1px với màu xám nhạt
                                borderRadius: '5px', // Góc bo tròn
                                padding: '5px' // Khoảng cách từ nội dung đến đường viền
                            }}
                        ></textarea>
                        
                    
                    </div>

                </div>
                <div className="App">
                    {dataEdit.image_url && (
                        <div className="image-container">
                            
                            <img src={dataEdit.image_url} alt="Hình ảnh đã tải lên" />
                        </div>
                    )}
                    <div>
                        <h1>Ảnh bìa</h1>
                        <input type="file" accept="image/*" onChange={handleImageUploadEdit} />
                    </div>
                    
                    
                </div>
                <button onClick={actionEdit}>Lưu</button>   
            </div>
            
            
        </>

                  )}
    </div>


  );
};

export default News;
