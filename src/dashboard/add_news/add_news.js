import React, { useRef,useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Label } from '@radix-ui/react-select';
//import './add_news.css'
import { Description } from '@radix-ui/react-dialog';
import News from '../list_news/list_news';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function AddNews() {
    const editorRef = useRef(null);
    const [title, setTitle] = useState("");
    const [label, setLabel] = useState("");
    const [imageSrc, setImageSrc] = useState(null);
    const [image_title_base64, setImage_title] = useState("");

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
                }
                    
                )
              .catch(error => console.error('Error:', error));
          
            // console.log(data2);
        }
    };
    return (
        <>
        <News></News>
            
            
        </>
    );
}
