import { useEffect, useState } from "react";
import { Image as ImageInfo } from "@/lib/types";
// @ts-ignore
const LastPage = ({ setToggle }) => {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("large.png");

  useEffect(() => {
    const input = {
      response1: localStorage.getItem("prompt1"),
      response2: localStorage.getItem("prompt2"),
      response3: localStorage.getItem("prompt3"),
      userEmail: localStorage.getItem("email"),
    };
    const response = fetch("/api/create_image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }).then((d) =>
      d.json().then((result) => {
        setImageUrl(result.imageUrl);
      })
    );
  }, []);

  useEffect(() => {
    fetch("/api/gallery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "{}",
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

  const isOpenAILoading = imageUrl === "large.png";

  return (
    <>
      <div className="w-80">
        <div className="input-container rounded bg-black relative w-full flex-row text-center snap-center">
          <div className="text-xs font-mono font-thin text-[#d8c0b9] mb-2">
            {isOpenAILoading ? "I'm working..." : "Here's what I created"}
          </div>
          {isOpenAILoading ? (
            <div
              style={{
                height: "200px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="blink"
                style={{
                  backgroundColor: "white",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                }}
              />
            </div>
          ) : (
            <img src={imageUrl} alt="Oculus Image" />
          )}
          <i>{localStorage.getItem("prompt1")}</i>
          <div className="text-xs font-mono font-thin text-[#d8c0b9] mb-2">
            I'll keep you posted on{" "}
            <a onClick={() => setToggle(true)}>our events</a>.
          </div>
          <br />
          <div className="text-xs font-mono font-thin text-[#d8c0b9] mb-2">
            Here are some dreams of others:
          </div>
          <br />
          {!selectedImage ? (
            <div className="grid grid-cols-3 gap-4">
              {images.map((image) => (
                // @ts-ignore
                <img
                  key={image.id}
                  src={image.thumbnailUrl}
                  alt={image.response1}
                  onClick={() => handleClick(image)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-4">
              <button className="mb-4 ml-4 text-right" onClick={handleBack}>
                Back to Gallery
              </button>
              {isLoading ? (
                <div>Loading...</div> // Display loading state while the image is loading
              ) : (
                // @ts-ignore
                <>
                  <img
                    src={selectedImage.imageUrl}
                    alt={selectedImage.response1}
                    className="mx-auto max-w-full"
                  />
                  <i>{selectedImage.response1}</i>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LastPage;
