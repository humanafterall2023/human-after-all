import { Input, useInput } from "@nextui-org/react";
import { useMemo } from "react";

// @ts-ignore
const FirstPage = ({ query, setQuery, setisPressed, setImageUrl }) => {
  
  const { value, reset, bindings } = useInput("");

  const validateEmail = (value: any) => {
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };

  const helper = useMemo(() => {
    if (!value)
      return {
        text: "",
        color: "",
      };
    const isValid = validateEmail(value);
    return {
      text: isValid ? "Correct email" : "Enter a valid email",
      color: isValid ? "success" : "error",
    };
  }, [value]);

  // @ts-ignore
  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      setisPressed(true);
      setQuery(e.target.value);
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
        setImageUrl(result.imageUrl);

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
        <div className="input-container border-[#d8c0b9] border-2 rounded p-1 bg-black relative mb-12 w-full">
          <Input
            style={{ textAlign: "center" }}
            className="bg-black font-mono top-0 left-0 right-0 bottom-0 mx-auto text-center flex w-full max-w-lg"
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
            placeholder="+ Enter text to generate an image"
            rounded={false}
            bordered={false}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="text-xs text-center font-mono font-thin text-[#d8c0b9]">
          Be as descriptive as possible.
          <br />
          AI will take care of the rest.
          <br />
          <br />
          Seriously, anything you can imagine.
          <br />
          A blue duck?
          <br />
          <br />
          Go wild :)
        </div>
      </div>
      <div className="text-xs text-center font-mono font-thin text-[#d8c0b9]">
        Login
      </div>
    </>
  );
};

export default FirstPage;
