// @ts-ignore
const Title = ({ isPressed }) => {
  return (
    <div className="mt-32">
      <h1 className="text-xl text-center text-[#d8c0b9] font-bold">
        <i>WE'RE HUMAN, &nbsp; AFTER ALL</i>
      </h1>
      {!isPressed && (
        <>
          <p className="text-[#658280] text-center text-lg m-0">
            JUNE 2 - 17 , 2023 <br />
            OCULUS X CANVAS 3.0
          </p>
        </>
      )}
    </div>
  );
};

export default Title;
