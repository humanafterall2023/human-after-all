import EmailInput from "./EmailInput";

// @ts-ignore
const PreviewPage = ({ query, imageUrl, setisEmailPressed }) => {
  return (
    <>
      <div className="input-container border-[#d8c0b9] border-2 rounded bg-black w-80 relative h-80">
        <div
          className="top-0 left-0 h-80 w-80 absolute"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.5,
          }}
        />
        <div className="input-container border-[#d8c0b9] border-t-2 border-b-2 border-l-0 border-r-0 p-1 bg-black w-full relative mt-36">
          <EmailInput setisEmailPressed={setisEmailPressed} />
        </div>
      </div>
      <div className="text-xs text-center font-mono font-thin text-[#d8c0b9] mb-20">
        {query}
      </div>
    </>
  );
};

export default PreviewPage;
