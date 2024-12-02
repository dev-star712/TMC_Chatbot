export const GrayBtn = ({
  name,
  handleClick,
  upperCase,
  isFit,
  magicbutton,
}) => {
  const className = `${
    upperCase ? "uppercase" : ""
  } text-zinc-950 text-sm font-semibold text-white`;
  return (
    <div
      onClick={handleClick}
      className={`${isFit ? "w-fit" : "w-full"} ${
        magicbutton
          ? "magicbutton px-6 py-3"
          : `bg-[#131313] hover:bg-[#272727] border-black px-4 py-2`
      } cursor-pointer  flex justify-center border items-center self-center rounded-full`}
    >
      <div className={className}>
        <div className="flex flex-row items-center  ">{name} </div>
      </div>
    </div>
  );
};
