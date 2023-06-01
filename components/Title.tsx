import { Spacer } from "@nextui-org/react";
import Schedule from "./Schedule";
import { Image as ImageInfo } from "@/lib/types";
import { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa"
// @ts-ignore
const Title = ({ handleReset, toggle, setToggle }) => {
  const [images, setImages] = useState<ImageInfo[]>([]);
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
  

  return (
    <div className="mt-16 w-full mb-8">
      <div style={{ fontWeight: 260, letterSpacing: "2px" }} className="text-xl text-left text-[#d8c0b9] mb-4 flex flex-row justify-between">
        <div
          style={{cursor: "pointer"}}
          onClick={() => {
            setToggle(!toggle)
          }}
        >
          HUMAN AFTER ALL
        </div>
        <br />
        <div  style={{cursor: "pointer", fontSize: "1.8rem", color: "#d8c0b9"}}>
          {toggle ? "" : ""}
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
                <div className="text-xs text-left text-[#d8c0b9] font-mono mt-2" style={{fontSize: "0.8rem"}}>
                  Oculus, NYC
                  <Spacer y={0.5} />
                  Canvas 3.0
                  <Spacer y={0.5} />
                  June 4 - 12, 2023
                </div>
              </div>
              <div className="w-full">
                  <br/>
                  <div className="flex flex-row">
                    {
                      images.length > 5 ? images.slice(0, 5).map((d) => {
                        return (<img src={d.thumbnailUrl}/>);
                      }) : <span/>
                    }
                    <div style={{
                      backgroundColor: "#d8c0b9",
                      cursor: "pointer", 
                      fontSize: "2.5rem",
                      width: 50,
                      height: 50,
                      margin: 2,
                      borderRadius: "50%",
                      display:"flex",
                      justifyContent:"center",
                      alignItems:"center",
                      color: "black",
                    }}
                      className="pulse"
                      onClick={() => {
                        setToggle(false);
                      }}
                    ><span style={{marginTop: -4}}>+</span></div>
                  </div>
              <br />
              <br/>
              <div className="text-[#d8c0b9] mb-4 font-mono" style={{fontSize:"1.3rem", fontWeight: 260, letterSpacing: "2px"}}>MOTIVE</div>
              <div className="text-[#d8c0b9] font-mono text-sm">
              <br/>
              <p className="font-mono" style={{textIndent:"20px"}}>Human After All is a week long symposium in Oculus WTC transit hub from June 4th to the 12th. We seek to explore the questions surrounding Artificial Intelligence and the myriad of ways that it has already - and will continue to - impact and enhance our human experience.</p>
              <p className="font-mono" style={{textIndent:"20px"}}>    Curating a range of dialogues, presentations, and interactive programs HAA brings together intersectional thought leaders and companies that help us understand the spectacular and alarming potential of AI, accepting narratives of fear and embracing the unknowable and…it will be… marvelous.</p>
              </div>
              </div>
              <br/>
              <Schedule />
            </>
          }
        </div>
      )}
    </div>
  );
};

export default Title;
