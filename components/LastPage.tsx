import { Input, useInput, Spacer } from "@nextui-org/react";
import { useMemo } from "react";
import EmailInput from "./EmailInput";

// @ts-ignore
const LastPage = () => {
  const { value, reset, bindings } = useInput("");

  const helper = useMemo(() => {
    if (!value)
      return {
        text: "",
        color: "",
      };
    return {
      text: "Enter a valid email",
      color: "error",
    };
  }, [value]);

  // @ts-ignore
  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      console.log("enter press here! " + e.target.value);
      e.preventDefault();

      const input = {
        id: "imageId",
        response1: "AAA",
        response2: "BBBB",
        response3: "CCCCC",
        userEmail: "humanafterall2023@gmail.com",
      };

      try {
        const response = await fetch("/api/create_image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input,
          }),
        });

        if (!response.ok) {
          throw new Error("Error generating image");
        }

        const result = await response.json();
        console.log("RESULT", result);

        // Handle the result as needed
      } catch (error) {
        console.error(error);
        // Handle the error appropriately
      }
    }
  };

  return (
    <>
      <div className="w-80">
        <div className="input-container rounded bg-black relative w-full flex-row text-center snap-center">
          <div className="text-xs font-mono font-thin text-[#d8c0b9] mb-2">
            Thanks for dreaming with us...
          </div>
          <img
            src="large.png"
            alt="Oculus Image"
            className="border-gray-600 border rounded mt-2 text-center p-20 snap-center "
          />
          <div className="text-xs font-mono font-thin text-[#d8c0b9] mt-2 mb-2">
            Tap your dream to make it an NFT :)
            <br />
            Surreal, right?
          </div>
        </div>
      </div>
    </>
  );
};

export default LastPage;
