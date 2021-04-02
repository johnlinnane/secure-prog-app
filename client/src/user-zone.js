import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import Alert from './Alert';

require('dotenv').config();

function UserZone() {
    const [data, setData] = useState(null);

    const getUser = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "/api/user",
        }).then((res) => {
            setData(res.data);
            console.log(res.data);
            
        });
    };
    useEffect(() => {
        getUser();
    }, []);
    



    // ************************ CLOUDINARY SHOW PROFILE PIC ************************ 

    const [imageIds, setImageIds] = useState();
    const loadImages = async (imageId) => {
        console.log('load images')
        try {
            // const res = await fetch('/api/images');
            const res = await axios({
                url: '/api/images',
                method: 'POST',
                // data: {
                //     image_id: imageId
                // }
            });
            // const data = await res.json();
            const data = await res.data;
            setImageIds(data);
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        loadImages();
    }, []);

    console.log(imageIds)

    // ************************ CLOUDINARY FILE UPLOAD STUFF ************************ 
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
            setErrMsg('something went wrong!');
        };
    };










    const uploadImage = async (base64EncodedImage) => {




        try {
            // await fetch('/api/upload', {
            //     method: 'POST',
            //     body: JSON.stringify({ data: base64EncodedImage }),
            //     headers: { 'Content-Type': 'application/json' },
            // });
            

            await axios({
                method: "POST",
                url: "/api/upload",
                data: { 
                    // image: base64EncodedImage,
                    image: base64EncodedImage,
                    name: data.id
                }
            });


            setFileInputState('');
            setPreviewSource('');
            setSuccessMsg('Image uploaded successfully');
        } catch (err) {
            console.error(err);
            setErrMsg('Something went wrong!');
        }
    };

    // ************************

    console.log(imageIds)
    


    return (
        <div className="page_view">
            <div className="centre_text form_container">
                {data ? 
                    <div>
                        <h1>Your Username: {data.id}</h1> 
                        
                        {/* ************* SHOW PROFILE PIC ************* */}

                        <h1 className="title">Profiler</h1>
                        <div className="gallery">
                            {imageIds &&
                                imageIds.map((imageId, index) => (
                                    <Image
                                        key={index}
                                        cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                                        publicId={imageId}
                                        width="300"
                                        crop="scale"
                                    />
                                ))}
                        </div>


                        {/* ************* FILE UPLOAD ************* */}
                        
                        <div>
                            <h1 className="title">Upload a Profile Picture</h1>
                            <Alert msg={errMsg} type="danger" />
                            <Alert msg={successMsg} type="success" />

                            <form onSubmit={handleSubmitFile} className="form">
                                <input
                                    // id="fileInput"
                                    className="file_input form_element" 
                                    type="file"
                                    name="image"
                                    onChange={handleFileInputChange}
                                    value={fileInputState}

                                />
                                {previewSource && (
                                    <img
                                        src={previewSource}
                                        alt="chosen"
                                        style={{ height: '300px' }}
                                    />
                                )}
                                <button type="submit" className="form_element">
                                    Submit
                                </button>
                            </form>

                        </div>
                        {/* ************* END FILE UPLOAD ************* */}


                    </div>                



                : 
                    <h1>You are not logged in</h1> 
                }


                


                


            </div>
        </div>
    );
}

export default UserZone;
