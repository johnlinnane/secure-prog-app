import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import Alert from '../Alert';
import { Redirect } from 'react-router-dom';

require('dotenv').config({path: '../../.env'});

function CustomerZone() {
    const [userData, setUserData] = useState(null);
    const [loginFail, setLoginFail] = useState(null);


    const getUser = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: `${process.env.REACT_APP_API_BASE_URL}/api/get-customer`,
        }).then((res) => {
            setUserData(res.data);
            if (!res.data) {
                setLoginFail(true)
            }
            
        });
    };


    useEffect(() => {
        getUser();
    }, []);
    


    // ************************ CLOUDINARY SHOW PROFILE PIC ************************ 

    const [imageIds, setImageIds] = useState();





    const loadImages =  () => {
        
        axios({
            url: `${process.env.REACT_APP_API_BASE_URL}/api/images`,
            method: 'POST',
            withCredentials: true
        }).then( res => {
            let data = res.data;
            if (data.length) {
                setImageIds(data);
            }
        }).catch( err => console.error(err))
    };




    useEffect(() => {
        loadImages();
    }, []);


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
            await axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_BASE_URL}/api/upload`,
                data: { 
                    image: base64EncodedImage,
                    name: userData.id
                },
                withCredentials: true
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


    return (
        <div className="page_view">
            <div className=" form_container">
                {userData ? 
                      
                    <div>
                        <div className="user_section">
                            Your Username: <h1>{userData.username}</h1> 
                        </div>
                        
                        {/* ************* SHOW PROFILE PIC ************* */}

                        <div className="user_section">
                            {imageIds ?
                                <div>
                                    <p>Your Profile Picture:</p>
                                    
                                    {imageIds.map((imageId, index) => (
                                            <Image
                                                key={index}
                                                cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                                                publicId={imageId}
                                                width="300"
                                                crop="scale"
                                            />
                                    ))} 
                                </div>
                            : 
                                <div>
                                    <p>You have no profile picture uploaded.</p>
                                    <img src="/assets/images/app/profilepic.jpeg" width="300" alt="default profile" />
                                    
                                </div>
                            }
                        </div>


                        {/* ************* FILE UPLOAD ************* */}
                        <div className="user_section">
                            <div>
                                Upload a New Profile Picture:
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
                        </div>
                        {/* ************* END FILE UPLOAD ************* */}


                    </div>  
                    : null }
                    
                    { loginFail ?           
                        <Redirect to='/customer-login' />
                    : null }
                
                
                
                
            </div>
        </div>

        
           
    )

}

export default CustomerZone;
