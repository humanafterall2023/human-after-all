import { Spacer } from "@nextui-org/react";
import { FaGripLines } from "react-icons/fa";
import Schedule from "./Schedule";
import Info from "./Info";

// @ts-ignore
const Title = ({ handleReset, toggle, setToggle }) => {
  return (
    <div className="mt-16 w-full mb-8">
      <div className="text-xl text-left text-[#d8c0b9] font-bold mb-4 flex flex-row justify-between">
        <div
          onClick={() => {
            handleReset();
          }}
        >
          HUMAN AFTER ALL
        </div>
        <br />
        <div className="mt-0.5" onClick={() => setToggle(!toggle)}>
          <FaGripLines />
        </div>
      </div>

      {toggle && (
        <div className="w-80 mb-40">
          <div className="text-sm text-left text-[#d8c0b9] font-mono">
            The Surreal Matrix of AI,
            <br />
            Art, and the Motion Picture
          </div>

          {
            <>
              <div className="flex flex-row justify-between mt-4">
                <div className="text-xs text-left text-[#d8c0b9] font-mono mt-2">
                  Oculus, NYC
                  <Spacer y={0.5} />
                  Canvas 3.0
                  <Spacer y={0.5} />
                  June 4 - 17, 2023
                </div>
                <img
                  src="small.png"
                  alt="Oculus Image"
                  className="float-right mt-2"
                />
              </div>
              <div className="w-full justify-center">
              <div className="w-full border-b border-gray-300 h-1 mt-8"></div>
              <br />
              <div className="text-[#d8c0b9] text-center mb-4 text-mono">ABOUT</div>
              <div className="w-full border-b border-gray-300 h-0.5"></div>
              <div className="text-[#d8c0b9] text-mono text-sm">
              <br/>
              <p style={{textIndent:"20px"}}>Human After All is a week long symposium in Oculus WTC transit hub from June 4th to the 12th. We seek to explore the questions surrounding Artificial Intelligence and the myriad of ways that it has already - and will continue to - impact and enhance our human experience.</p>
              <p style={{textIndent:"20px"}}>    Curating a range of dialogues, presentations, and interactive programs HAA brings together intersectional thought leaders and companies that help us understand the spectacular and alarming potential of AI, accepting narratives of fear and embracing the unknowable and…it will be… marvelous.</p>
              </div>
              </div>
              <div className="w-full border-b border-gray-300 h-1 mt-8"></div>
              <Schedule />
              <div className="w-full border-b border-gray-300 h-1 mt-8"></div>
              <Info />
            </>
          }
        </div>
      )}
    </div>
  );
};

export default Title;
