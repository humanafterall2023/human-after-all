import { Input, useInput, Spacer } from "@nextui-org/react";
import { useMemo } from "react";
import EmailInput from "./EmailInput";

// @ts-ignore
const EmailPage = ({ navigateToPage, currentPageIndex }) => {
  return (
    <>
      <div className="w-80">
        <div className="input-container rounded bg-black relative mb-12 w-full">
          <div className="text-xs text-left font-mono font-thin text-[#d8c0b9] mb-2">
            Enter your email below, and we’ll make that dream reality.
        </div>
            <EmailInput navigateToPage={navigateToPage} currentPageIndex={currentPageIndex}/>
        </div>
      </div>
    </>
  );
};

export default EmailPage;
