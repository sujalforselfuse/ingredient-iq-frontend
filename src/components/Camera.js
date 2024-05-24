import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import Cropper from 'react-easy-crop';
import axios from 'axios';

import getCroppedImg from './Crophelper'; // Helper function to get the cropped image

const Camera = ({ onCapture }) => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef]);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
    
        try {
          const response = await axios.post('http://localhost:8000/api/cloudinary/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          return response.data.result;
        } catch (error) {
          console.error('Error uploading to Cloudinary', error);
          throw error;
        }
      };
      const showCroppedImage = useCallback(async () => {
        try {
          const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
    
          // Convert base64 to a file object
          const response = await fetch(croppedImage);
          const blob = await response.blob();
          const file = new File([blob], 'cropped.jpg', { type: 'image/jpeg' });
    
          // Upload the file to Cloudinary
          const uploadResult = await uploadToCloudinary(file);
    
          // Handle the Cloudinary response (e.g., save the URL)
          onCapture(uploadResult.secure_url);
          console.log(uploadResult.secure_url);
        } catch (e) {
          console.error(e);
        }
      }, [imgSrc, croppedAreaPixels, onCapture]);

    /* const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
            setImgSrc(null); // Clear the image to show the cropped version
            onCapture(croppedImage);
        } catch (e) {
            console.error(e);
        }
    }, [imgSrc, croppedAreaPixels, onCapture]); */

    return (
        <div className='mt-6 text-center'>
            <h2 className='text-center mb-1'>Capture Ingredient Photo</h2>
            {!imgSrc ? (
                <>
                    <Webcam className='p-6'
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width="100%"
                    />


                    <button onClick={capture}>
                        <svg class="w-10 h-10 text-gray-800 p-2 border-2  rounded-full border-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M7.5 4.586A2 2 0 0 1 8.914 4h6.172a2 2 0 0 1 1.414.586L17.914 6H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1.086L7.5 4.586ZM10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" clip-rule="evenodd" />
                        </svg>


                    </button>
                </>
            ) : (
                <>
                    <div style={{ position: 'relative', width: '100%', height: 400 }}>
                        <Cropper
                            className='p-6'
                            image={imgSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={4 / 3}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>

                    <button onClick={showCroppedImage}>
                        <svg class="w-10 h-10 text-gray-800 p-2 border-2  rounded-full border-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                        </svg>

                    </button>
                </>
            )}
        </div>
    );
};

export default Camera;
