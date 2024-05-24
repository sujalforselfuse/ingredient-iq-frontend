import React from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import Camera from '../components/Camera'
import { useState } from 'react'
export default function Scan() {
    const [capturedImage, setCapturedImage] = useState(null);


    const handleCapture = (imageSrc) => {
        console.log('Captured image:', imageSrc);
        setCapturedImage(imageSrc);
      };
  return (
    <div>
      <Navbar></Navbar>
      <Input></Input>
      <Camera onCapture={handleCapture} />
        {/* {capturedImage && (
          <div>
            <h3>Captured Image:</h3>
            <img src={capturedImage} alt="Captured" />
          </div>
        )} */}
    </div>
  )
}
