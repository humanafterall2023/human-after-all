"use client";
import React, { useState, useEffect } from "react";
import { createTheme, NextUIProvider } from "@nextui-org/react";

const theme = createTheme({
  type: "dark", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: "#d8c0b9",
      primaryLightHover: "#d8c0b9",
      primaryLightActive: "#d8c0b9",
      primaryLightContrast: "#d8c0b9",
      primary: "#d8c0b9",
      primaryBorder: "#d8c0b9",
      primaryBorderHover: "#d8c0b9",
      primarySolidHover: "#d8c0b9",
      primarySolidContrast: "$white",
      primaryShadow: "#d8c0b9",

      gradient:
        "linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)",
      link: "#5E1DAD",

      // you can also create your own color
      myColor: "#d8c0b9",

      // ...  more colors
    },
    space: {},
    fonts: {},
  },
});

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  // @ts-ignore
  const handleClick = (image) => {
    setIsLoading(true); // Set loading state to true
    setSelectedImage(null); // Clear previous selected image
    const img = new Image();
    img.src = image.imageUrl;
    img.onload = () => {
      setSelectedImage(image);
      setIsLoading(false); // Set loading state to false when the image has loaded
    };
  };

  const handleBack = () => {
    setSelectedImage(null);
  };

  return (
    <NextUIProvider theme={theme}>
    <main className="flex flex-col items-center bg-black min-h-screen p-8">
      <a className="text-xl text-center text-[#d8c0b9] font-bold" href="/">
        <i>HUMAN, &nbsp; AFTER ALL</i>
      </a>
    <div className="absolute top-20">
      <h1 className="text-center">Gallery</h1>
      {!selectedImage ? (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            // @ts-ignore
            <img key={image.id} src={image.thumbnailUrl} alt={image.response1} onClick={() => handleClick(image)} />
          ))}
        </div>
      ) : (
        <div className="mt-4">
          <button className="mb-4 ml-4 text-right" onClick={handleBack}>
            Back
          </button>
          {isLoading ? (
            <div>Loading...</div> // Display loading state while the image is loading
          ) : (
            // @ts-ignore
            <img src={selectedImage.imageUrl} alt={selectedImage.response1} className="mx-auto max-w-full" />
          )}
        </div>
      )}
    </div>
      </main>
      </NextUIProvider>
  );
};

export default Gallery;
