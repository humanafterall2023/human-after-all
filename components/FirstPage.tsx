import { Input, useInput } from "@nextui-org/react";
import { useMemo } from "react";

// @ts-ignore
const FirstPage = ({ navigateToPage, currentPageIndex, setToggle }) => {
  const { value, reset, bindings } = useInput("");


  // @ts-ignore
  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      localStorage.setItem("prompt1", e.target.value);
      navigateToPage(currentPageIndex + 1);
      e.preventDefault();
    }
  };

  // @ts-ignore
  const onBlur = async (e) => {
    if (!e.target.value) {
      e.target.focus();
    } else if (!localStorage.getItem("prompt1")){
      localStorage.setItem("prompt1", e.target.value);
      navigateToPage(currentPageIndex + 1);
    }
    e.preventDefault();
  };

  return (
    <>
      <div className="w-80 mb-40">
        <div className="input-container rounded bg-black relative mb-12 w-full">
          <div className="text-xs text-left font-mono font-thin text-[#d8c0b9] mb-2">
            Hello, Human. Type a word that describes humans in New York
            <span style={{ fontFamily: "courier" }}>:</span>
          </div>
          <Input
            style={{ textAlign: "left", margin: "0" }}
            autoFocus
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
            width="100%"
            rounded={false}
            bordered={true}
            onKeyPress={handleKeyPress}
            onBlur={onBlur}
          />
        </div>
      </div>
    </>
  );
};

export default FirstPage;
