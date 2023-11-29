import React, { useState } from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Carosal = () => {
  const images = [
    "https://swiperjs.com/demos/images/nature-4.jpg",
    "https://swiperjs.com/demos/images/nature-3.jpg",
    "https://swiperjs.com/demos/images/nature-5.jpg",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Previous button
  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  // Next button
  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  // clicking the image to show it
  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} textAlign="center" mb={2}>
        <Box elevation={3}>
          <img
            src={images[currentImageIndex]}
            alt={`imgs ${currentImageIndex + 1}`}
            style={{ maxWidth: '100%', maxHeight: '400px' }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <IconButton onClick={goToPrevious}>
          <NavigateBeforeIcon />
        </IconButton>
        <Typography variant="caption">
          Image {currentImageIndex + 1} of {images.length}
        </Typography>
        <IconButton onClick={goToNext}>
          <NavigateNextIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12} mt={2}>
        <Grid container justifyContent="center" spacing={1}>
          {images.map((image, index) => (
            <Grid item key={index}>
              <img
                src={image}
                alt={` img ${index + 1}`}
                style={{ width: '50px', cursor: 'pointer' }}
                onClick={() => handleImageClick(index)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Carosal;
