import { useState } from "react";
import Gallery from "../app/gallery/page";

// @ts-ignore
const FinalPage = ({ imageUrl }) => {

  return (
    <>
          <div className="input-container border-[#d8c0b9] border-2 rounded bg-black w-80 relative h-80">
            <div
              className="top-0 left-0 h-80 w-80 absolute"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
          <div className="text-xs text-center font-mono font-thin text-[#d8c0b9] m-4">
            You've unlocked our community gallery, special events,and have
            access to print your masterpiece onto a t-shirt or hoodie and mint
            an NFT. See you soon, human.
          </div>
          <div className="input-container border-[#d8c0b9] border-2 rounded p-1 bg-black w-5/6 relative">
            <a
              className="text-xs text-center font-mono font-thin text-[#d8c0b9] flex items-center justify-center h-10"
              href="/gallery"
            >
              Community Gallery
            </a>
          </div>

          <div className="input-container border-[#d8c0b9] border-2 rounded p-1 bg-black w-5/6 relative">
            <a
              href="/events"
              className="text-xs text-center font-mono font-thin text-[#d8c0b9] flex items-center justify-center h-10"
            >
              Events
            </a>
          </div>
          <div className="input-container border-[#d8c0b9] border-2 rounded p-1 bg-black w-5/6 relative mb-4">
            <a
              href="https://www.google.com"
              className="text-xs text-center font-mono font-thin text-[#d8c0b9] flex items-center justify-center h-10"
            >
              Merch
            </a>
          </div>
    </>
  );
};

export default FinalPage;
