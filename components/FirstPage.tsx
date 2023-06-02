import { Input, useInput } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { useState, useEffect } from "react";
import NoSSR from "react-no-ssr";
// @ts-ignore
const FirstPage = ({ navigateToPage, currentPageIndex, setToggle }) => {
  const { value, reset, bindings } = useInput("");
  const [isAIPrompt, setIsAIPrompt] = useState(Math.random() > 0.5);


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
      //e.target.focus();
    } else {
      localStorage.setItem("prompt1", e.target.value);
      navigateToPage(currentPageIndex + 1);
    }
    e.preventDefault();
  };

  useEffect(() => {
    if (isAIPrompt) {
      localStorage.setItem("prompt2", "AI");
    } else {
      localStorage.setItem("prompt2", "humans");
    }
  }, []);

  return (
    <NoSSR>
      <div className="w-80">
          <div className="text-sm text-left text-[#d8c0b9] font-mono">
            The Surreal Matrix of AI,
            <br />
            Art, and the Motion Picture
          </div>
          <div className="flex flex-row justify-between mt-4">
            <div className="text-xs text-left text-[#d8c0b9] font-mono mt-2" style={{fontSize: "0.8rem"}}>
              Oculus, NYC
              <Spacer y={0.5} />
              Canvas 3.0
              <Spacer y={0.5} />
              June 4 - 12, 2023
            </div>
          </div>
          <br/>
          <div className="input-container rounded bg-black relative mb-12 w-full">
          <div className="text-s text-left font-mono font-thin text-[#d8c0b9] mb-4">
            Hello :) Type a word to describe {isAIPrompt ? "artificial intelligence" : "humans"}:
          </div>
          <Input
            style={{ textAlign: "left", margin: "0", fontSize: "16px !important", border: "0.5px solid #d8c0b9", borderRadius: "2px", padding: "4px" }}
            autoFocus
            size={"xl"}
            className="bg-black font-mono top-0 left-0 right-0 bottom-0 text-left flex w-full max-w-lg h-20"
            aria-label="Enter text to generate an image"
            shadow={false}
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
            onKeyPress={handleKeyPress}
            onBlur={onBlur}
          />
          <br/>
          <br/>
          <button className="mb-4 text-right text-mono font-mono font-thin" onClick={() => {
            setToggle(true);
          }} style={{color: "#d8c0b9"}}>+ MORE INFO</button>
        </div>
      </div>
    </NoSSR>
  );
};

export default FirstPage;
