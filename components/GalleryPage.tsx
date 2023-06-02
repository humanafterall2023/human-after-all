import { useEffect, useState } from "react";
import { Image as ImageInfo } from "@/lib/types";
import { FaInfoCircle } from "react-icons/fa";
// @ts-ignore
const GalleryPage = () => {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count: 1000 }),
    })
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
    <>
      <div className="w-80">
        <div className="input-container rounded bg-black relative w-full flex-row snap-center">
            <div className="text-xs font-mono font-thin text-[#d8c0b9] mb-2" style={{fontSize:"1.1rem", fontWeight: 260, letterSpacing: "2px"}}>
              GALLERY
            </div>
            <br />
            {!selectedImage ? (
              <>
              <button className="mb-4 text-right text-mono font-mono font-thin" onClick={() => {
                window.location.href="/";
              }} style={{color: "#d8c0b9"}}>+ CREATE IMAGE</button>
              <br/>
              <div className="grid grid-cols-3 gap-4">
                {images.map((image) => (
                  // @ts-ignore
                  <img
                    style={{cursor: "pointer"}}
                    key={image.id}
                    src={image.thumbnailUrl}
                    alt={image.response1}
                    onClick={() => handleClick(image)}
                  />
                ))}
              </div></>
            ) : (
              <div className="mt-4">
                {isLoading ? (
                  <div>Loading...</div> // Display loading state while the image is loading
                ) : (
                  // @ts-ignore
                  <>
                    <div className="text-xs font-mono font-thin text-[#d8c0b9] mb-2" style={{fontSize:"1.1rem", fontWeight: 260, letterSpacing: "2px"}}>
                      {selectedImage.response1}
                    </div>
                    <br/>
                    <img
                      style={{borderRadius: "2px", border: "1px solid #d8c0b9"}}
                      src={selectedImage.imageUrl}
                      alt={selectedImage.response1}
                      className="mx-auto max-w-full"
                    />
                    <br/>
                    <button className="mb-4 text-right text-mono font-mono font-thin" style={{color: "#d8c0b9"}} onClick={handleBack}>&#60; GALLERY</button>
                  </>
                )}
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default GalleryPage;
