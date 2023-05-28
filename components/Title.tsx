import { Spacer } from "@nextui-org/react";
import { FaGripLines } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";

// @ts-ignore
const Title = ({ handleReset, isSchedule, isInfo, setisSchedule, setisInfo }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="mt-16 w-full mb-8">
      <div className="text-xl text-left text-[#d8c0b9] font-bold mb-4 flex flex-row justify-between">
        <div onClick={() => {
          handleReset()
          setisSchedule(false);
          setisInfo(false);
          }}>
          <i>HUMAN AFTER ALL</i>
        </div>
        <br />
        <div className="mt-0.5" onClick={() => setToggle(!toggle)}>
          <FaGripLines />
        </div>
      </div>

      {toggle ? (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="border-gray-600 border rounded flex flex-row justify-between text-right"
        >
          <img src="large.png" alt="Oculus Image" className="ml-4" />
          <div className="flex flex-col justify-between m-2">
            <div
              onClick={() => {
                setToggle(false);
                setisSchedule(true);
                setisInfo(false);
              }}
              className="text-[#d8c0b9] text-sm m-1 text-right"
            >
              PROGRAM
            </div>
            <a href="/team" className="text-[#d8c0b9] text-sm m-1 text-right">
              BIOS
            </a>
            <a
              href="/gallery"
              className="text-[#d8c0b9] text-sm m-1 text-right"
            >
              DREAMS
            </a>
            <a href="/" className="text-[#d8c0b9] text-sm m-1 text-right">
              CONTACT
            </a>
            <div
              onClick={() => {
                setToggle(false);
                setisInfo(true);
                setisSchedule(false);
              }}
              className="text-[#d8c0b9] text-sm m-1 text-right"
            >
              INFO
            </div>
          </div>
        </motion.div>
      ) : (
        <>
          <div className="text-sm text-left text-[#d8c0b9] font-mono">
            The Surreal Matrix of AI, 
            <br/>
            Art, and the Motion Picture
          </div>

          {!isSchedule && !isInfo && (
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
              <div className="w-full border-b border-gray-300 h-1 mt-8"></div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Title;
