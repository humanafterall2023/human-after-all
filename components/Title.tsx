import { Spacer } from "@nextui-org/react";
import Schedule from "./Schedule";
import { Image as ImageInfo } from "@/lib/types";
import { useState, useEffect } from "react";

// @ts-ignore
const Title = ({ navigateToPage, handleReset, toggle, setToggle }) => {
  const [images, setImages] = useState<ImageInfo[]>([]);
  useEffect(() => {
    fetch("/api/gallery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count: 10 }),
    })
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error("Error:", error));
  }, []);
  

  return (
    <div className="mt-16 w-full">
      <div style={{ fontWeight: 348, letterSpacing: "2px" }} className="text-xl text-left text-[#d8c0b9] mb-4 flex flex-row justify-between">
        <div
          style={{cursor: "pointer"}}
          onClick={() => {
            localStorage.setItem("prompt1", "");
            setToggle(!toggle)
          }}
        >
          HUMAN AFTER ALL
        </div>
        <br />
        <div onClick={() => {
            localStorage.setItem("prompt1", "");
            setToggle(!toggle)
          }} style={{cursor: "pointer", fontSize: "1.8rem", color: "#d8c0b9"}}>
          {toggle ? <div
                style={{
                  backgroundColor: "#d8c0b9",
                  marginTop: 8,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                }}
              /> : <div
              style={{
                backgroundColor: "black",
                border: "1px solid #d8c0b9",
                marginTop: 8,
                width: 12,
                height: 12,
                borderRadius: "50%",
              }}
            /> }
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
                  <div className="flex flex-row" style={{cursor: "pointer", borderRadius: "2px", border: "0.5px solid #d8c0b9"}} onClick={() => {
                    window.location.href="/gallery";
                  }}>
                    {
                      images.length > 6 ? images.slice(0, 6).map((d) => {
                        return (<img src={d.thumbnailUrl}/>);
                      }) : <span/>
                    }
                  </div>
              <br />
              <div className="text-[#d8c0b9] mb-4 font-mono" style={{fontSize:"1.3rem", fontWeight: 348, letterSpacing: "2px"}}>MOTIVE</div>
              <div className="text-[#d8c0b9] font-mono text-sm">
              <p className="font-mono" style={{textIndent:"0px"}}>HUMAN AFTER ALL will bring together thought leaders, technologists, artists, and companies alike for a 10 day symposium inside Calatrava’s iconic Oculus WTC at Canvas 3.0.</p>
              <br/>
              <p className="font-mono" style={{textIndent:"0px"}}>Through a range of dialogues, presentations, and interactive programs — we’ll explore the spectacular and alarming potentials of AI, bringing new perspectives and deeper understanding to this evolving landscape.</p>
              </div>
              </div>
              <br/>
              <Schedule />
              <br/>
              <button className="mb-4 text-right text-mono font-mono font-thin" onClick={() => {
                window.location.href="mailto:humanafterallai@gmail.com";
              }} style={{color: "#d8c0b9"}}>+ CONTACT US</button>
            </>
          }
        </div>
      )}
    </div>
  );
};

export default Title;
