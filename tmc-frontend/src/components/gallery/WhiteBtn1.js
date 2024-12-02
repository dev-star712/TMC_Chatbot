export const WhiteBtn1 = ({ name, handleClick, upperCase, isFit }) => {
  const className = `${
    upperCase ? "uppercase" : ""
  } text-zinc-950 text-lg font-semibold`;
  return (
    <div
      onClick={handleClick}
      className={`${
        isFit ? "w-fit" : "w-full"
      } px-4 text-center py-3 cursor-pointer mx-auto rounded-full magicborder`}
    >
      <div className={className}>{name}</div>
    </div>
  );
};
