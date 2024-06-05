import React, { useRef, useState, useEffect } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import './UploadImage.css';
import { Box, Button } from '@mui/material';

const UploadImage = ({ propertyDetails, setPropertyDetails, nextStep, prevStep }) => {
  const [imageURL, setImageURL] = useState(propertyDetails.image);

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, image: imageURL }));
    nextStep();
  };

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'deqeq93p3',
        uploadPreset: 'ap9sotpf',
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === 'success') {
          setImageURL(result.info.secure_url);
          setPropertyDetails((prevDetails) => ({
            ...prevDetails,
            image: result.info.secure_url,
          }));
        }
      }
    );
  }, [setPropertyDetails]);

  const openWidget = () => {
    widgetRef.current.open();
  };

  return (
    <div className='flexColCenter uploadWrapper'>
      {!imageURL ? (
        <div className='flexColCenter uploadZone' onClick={()=> widgetRef.current?.open()}>
          <AiOutlineCloudUpload size={50} color='grey' />
          <span>Upload Image</span>
        </div>
      ) : (
        <div className='uploadedImage' onClick={()=> widgetRef.current?.open()}>
          <img src={imageURL} alt='Uploaded' />
        </div>
      )}

      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="outlined" onClick={prevStep} style={{ marginRight: '8px' }}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext} disabled={!imageURL}>
          Next
        </Button>
      </Box>
    </div>
  );
};

export default UploadImage;
