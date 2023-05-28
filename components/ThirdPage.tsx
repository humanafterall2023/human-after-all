import { Input, useInput } from "@nextui-org/react";
import { useMemo } from "react";

// @ts-ignore
const ThirdPage = ({ navigateToPage, currentPageIndex }) => {
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
        navigateToPage(currentPageIndex + 1);
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
      <div className="w-80 mb-40">
        <div className="input-container rounded bg-black relative mb-12 w-full">
          <div className="text-xs text-left font-mono font-thin text-[#d8c0b9] mb-2">
          If your favorite painter were to create that memory, whom would it be?
          </div>
          <Input
            style={{ textAlign: "left", margin: "0" }}
            className="bg-black font-mono top-0 left-0 right-0 bottom-0 text-left flex w-full max-w-lg h-20"
            aria-label="Enter text to generate an image"
            clearable
            shadow={false}
            onClearClick={reset}
            css={{
              $$inputColor: "black",
              borderRadius: "$pill",
              "::placeholder": {
                color: "#d8c0b9",
              },
            }}
            status="primary"
            helperColor="primary"
            helperText={helper.text}
            width="100%"
            rounded={false}
            bordered={false}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </>
  );
};

export default ThirdPage;
