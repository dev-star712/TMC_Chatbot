import {
  Typography,
  Accordion,
  AccordionHeader,
} from "@material-tailwind/react";
import { WhiteBtn } from "./WhiteBtn";
import { GrayBtn } from "./GrayBtn";
import React, { useState, useEffect } from "react";
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-90" : "-rotate-90"
      } h-5 w-5 transition-transform transform origin-center `}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}
export function RefineSearch({
  taxonomy,
  search,
  setFilter,
  clearFilter,
  setOpenModal,
  mobile,
  cash,
  finance,
  mileage,
  selected,
  setSelected,
}) {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenHeight]);
  const toggleSelected = () => {
    setSelected(!selected);
  };
  const [open, setOpen] = useState([]);

  const handleOpen = (value) => {
    if (!open.includes(value)) setOpen([...open, value]);
    else setOpen(open.filter((item) => item !== value));
  };
  const handleResize = () => {
    setScreenHeight(window.innerHeight);
  };

  return (
    <div className="h-full lg:h-auto bg-white px-[30px] rounded-2xl">
      <Typography variant="h4" className="py-4  " color="gray">
        Refine Search
      </Typography>

      <Accordion
        className="remove-border"
        open={open.includes(1)}
        icon={<Icon id={1} open={open} />}
      >
        <AccordionHeader onClick={() => handleOpen(1)}>
          <div className="flex justify-between w-full">
            <h4 className="flex items-center text-base">MAKE</h4>
            {search.make.length !== 0 && (
              <div
                className="flex items-center text-sm underline"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFilter(["make"]);
                }}
              >
                clear
              </div>
            )}
          </div>
        </AccordionHeader>
        <div className={`${open.includes(1) ? "block py-4 " : "hidden py-4 "}`}>
          <div className="flex flex-col uppercase">
            {Object.keys(taxonomy.make).map((item) => {
              return (
                <div
                  key={item}
                  className={`mr-3 p-2  uppercase ${false ? "font-bold" : ""}`}
                >
                  <label className="custom-checkboxr mr-1">
                    <input
                      id={item}
                      type="checkbox"
                      className="hidden"
                      onChange={(e) => {
                        setFilter("make", item, e.target.checked);
                      }}
                      checked={search.make.includes(item)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <label
                    htmlFor={item}
                    className={`custom-checkboxr ${
                      search.make.includes(item) ? "font-bold" : ""
                    } ${!taxonomy.make[item] ? "text-gray-400" : ""}`}
                  >{`${item} (${taxonomy.make[item]})`}</label>
                </div>
              );
            })}
          </div>
        </div>
      </Accordion>
      <Accordion
        className="remove-border"
        open={open.includes(2)}
        icon={<Icon id={2} open={open} />}
      >
        <AccordionHeader onClick={() => handleOpen(2)}>
          <div className="flex justify-between w-full">
            <h4 className="flex items-center text-base">MODEL</h4>
            {search.model.length !== 0 && (
              <div
                className="flex items-center text-sm underline"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFilter(["model"]);
                }}
              >
                clear
              </div>
            )}
          </div>
        </AccordionHeader>
        <div className={`${open.includes(2) ? "block py-4 " : "hidden py-4 "}`}>
          <div className="flex flex-col uppercase">
            {Object.keys(taxonomy.model).map((item) => {
              return (
                <div
                  key={item}
                  className={`mr-3 p-2  uppercase ${false ? "font-bold" : ""}`}
                >
                  <label className="custom-checkboxr mr-1">
                    <input
                      id={item}
                      type="checkbox"
                      className="hidden"
                      onChange={(e) => {
                        setFilter("model", item, e.target.checked);
                      }}
                      checked={search.model.includes(item)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <label
                    htmlFor={item}
                    className={`custom-checkboxr ${
                      search.model.includes(item) ? "font-bold" : ""
                    } ${!taxonomy.model[item] ? "text-gray-400" : ""}`}
                  >
                    {`${item} (${taxonomy.model[item]})`}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </Accordion>
      <Accordion
        className="remove-border"
        open={open.includes(3)}
        icon={<Icon id={3} open={open} />}
      >
        <AccordionHeader onClick={() => handleOpen(3)}>
          <div className="flex justify-between w-full">
            <h4 className="flex items-center text-base">BODY TYPE</h4>
            {search.bodyType.length !== 0 && (
              <div
                className="flex items-center text-sm underline"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFilter(["bodyType"]);
                }}
              >
                clear
              </div>
            )}
          </div>
        </AccordionHeader>
        <div className={`${open.includes(3) ? "block py-4 " : "hidden py-4 "}`}>
          <div className="flex flex-col uppercase">
            {Object.keys(taxonomy.bodyType).map((item) => {
              return (
                <div
                  key={item}
                  className={`mr-3 p-2  uppercase ${false ? "font-bold" : ""}`}
                >
                  <label className="custom-checkboxr mr-1">
                    <input
                      id={item}
                      type="checkbox"
                      className="hidden"
                      onChange={(e) => {
                        setFilter("bodyType", item, e.target.checked);
                      }}
                      checked={search.bodyType.includes(item)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <label
                    htmlFor={item}
                    className={`custom-checkboxr ${
                      search.bodyType.includes(item) ? "font-bold" : ""
                    } ${!taxonomy.bodyType[item] ? "text-gray-400" : ""}`}
                  >
                    {`${item} (${taxonomy.bodyType[item]})`}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </Accordion>
      <Accordion
        className="remove-border"
        open={open.includes(9)}
        icon={<Icon id={9} open={open} />}
      >
        <AccordionHeader onClick={() => handleOpen(9)}>
          <div className="flex justify-between w-full">
            <h4 className="flex items-center text-base">PRICE</h4>
            {((selected &&
              !(
                cash.cashMin === cash.cashRange[0] &&
                cash.cashMax === cash.cashRange[1]
              )) ||
              (!selected &&
                !(
                  finance.financeMin === finance.financeRange[0] &&
                  finance.financeMax === finance.financeRange[1]
                ))) && (
              <div
                className="flex items-center text-sm underline"
                onClick={(e) => {
                  e.stopPropagation();
                  cash.setCashMax(cash.cashRange[1]);
                  cash.setCashMin(cash.cashRange[0]);
                  finance.setFinanceMax(finance.financeRange[1]);
                  finance.setFinanceMin(finance.financeRange[0]);
                }}
              >
                clear
              </div>
            )}
          </div>
        </AccordionHeader>
        <div className={`${open.includes(9) ? "block py-4 " : "hidden py-4 "}`}>
          <div className="w-full">
            <div
              className="text-[14px] toggle-container flex w-full justify-center items-center"
              onClick={toggleSelected}
            >
              <div className={` dialog-button ${selected ? "" : "disabled"}`}>
                {selected ? "CASH" : "FINANCE"}
              </div>
              <div className="flex w-2/3 flex-row justify-between text-white uppercase ">
                <div>Cash</div>
                <div>Finance</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4  justify-between mt-6">
            <div className="w-full flex flex-row items-center">
              <div className="uppercase text-lg  ">min:</div>
              <select
                type="text"
                className="mt-2 bg-[#f6f6f6] px-6 py-3 ml-2 border-2 w-full rounded-full"
                onChange={(e) => {
                  console.log(e.target.value);
                  if (selected) {
                    cash.setCashMin(e.target.value * 1);
                  } else {
                    finance.setFinanceMin(e.target.value * 1);
                  }
                }}
                value={selected ? cash.cashMin : finance.financeMin}
              >
                {selected
                  ? Array.from(
                      {
                        length: (cash.cashMax - cash.cashRange[0]) / 2000 + 1,
                      },
                      (_, i) => i * 2000 + cash.cashRange[0]
                    ).map((price) => {
                      return (
                        <option key={`cash${price}`} value={price}>
                          {price.toLocaleString()}
                        </option>
                      );
                    })
                  : Array.from(
                      {
                        length:
                          (finance.financeMax - finance.financeRange[0]) / 50 +
                          1,
                      },
                      (_, i) => i * 50 + finance.financeRange[0]
                    ).map((price) => {
                      return (
                        <option key={`finance${price}`} value={price}>
                          {price.toLocaleString()}
                        </option>
                      );
                    })}
              </select>
            </div>
            <div className="w-full flex flex-row items-center">
              <div className="uppercase text-lg  ">max:</div>
              <select
                type="text"
                className="mt-2 bg-[#f6f6f6] px-6 ml-2 py-3 border-2 w-full rounded-full"
                onChange={(e) => {
                  console.log(e.target.value);
                  if (selected) {
                    cash.setCashMax(e.target.value * 1);
                  } else {
                    finance.setFinanceMax(e.target.value * 1);
                  }
                }}
                value={selected ? cash.cashMax : finance.financeMax}
              >
                {selected
                  ? Array.from(
                      {
                        length: (cash.cashRange[1] - cash.cashMin) / 2000 + 1,
                      },
                      (_, i) => i * 2000 + cash.cashMin
                    ).map((price) => {
                      return (
                        <option key={`cash${price}`} value={price}>
                          {price.toLocaleString()}
                        </option>
                      );
                    })
                  : Array.from(
                      {
                        length:
                          (finance.financeRange[1] - finance.financeMin) / 50 +
                          1,
                      },
                      (_, i) => i * 50 + finance.financeMin
                    ).map((price) => {
                      return (
                        <option key={`finance${price}`} value={price}>
                          {price.toLocaleString()}
                        </option>
                      );
                    })}
              </select>
            </div>
          </div>
        </div>
      </Accordion>

      <Accordion
        className="remove-border"
        open={open.includes(5)}
        icon={<Icon id={5} open={open} />}
      >
        <AccordionHeader onClick={() => handleOpen(5)}>
          <div className="flex justify-between w-full">
            <h4 className="flex items-center text-base">MILEAGE</h4>
            {!(
              mileage.mileageMin === mileage.mileageRange[0] &&
              mileage.mileageMax === mileage.mileageRange[1]
            ) && (
              <div
                className="flex items-center text-sm underline"
                onClick={(e) => {
                  e.stopPropagation();
                  mileage.setMileageMax(mileage.mileageRange[1]);
                  mileage.setMileageMin(mileage.mileageRange[0]);
                }}
              >
                clear
              </div>
            )}
          </div>
        </AccordionHeader>
        <div className={`${open.includes(5) ? "block py-4 " : "hidden py-4 "}`}>
          <select
            label="mile"
            key="mile_min"
            className="mt-2 bg-[#f6f6f6] px-6 ml-2 py-3 border-2 w-full rounded-full"
            onChange={(e) => {
              console.log(e.target.value);
              console.log(mileage.mileageMax);
              mileage.setMileageMin(e.target.value * 1);
            }}
            value={mileage.mileageMin}
          >
            {Array.from(
              {
                length:
                  (mileage.mileageMax - mileage.mileageRange[0]) / 2000 + 1,
              },
              (_, i) => i * 2000 + mileage.mileageRange[0]
            ).map((mile) => {
              return (
                <option key={`min${mile}`} value={mile}>
                  {mile.toLocaleString()}
                </option>
              );
            })}
          </select>
          <div className="py-2">
            <select
              label="mile"
              key="mile_max"
              className="mt-2 bg-[#f6f6f6] px-6 ml-2 py-3 border-2 w-full rounded-full"
              onChange={(e) => {
                console.log(e.target.value);
                mileage.setMileageMax(e.target.value * 1);
              }}
              value={mileage.mileageMax}
            >
              {Array.from(
                {
                  length:
                    (mileage.mileageRange[1] - mileage.mileageMin) / 2000 + 1,
                },
                (_, i) => i * 2000 + mileage.mileageMin
              ).map((mile) => {
                return (
                  <option key={`max${mile}`} value={mile}>
                    {mile.toLocaleString()}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </Accordion>
      <Accordion
        className="remove-border"
        open={open.includes(6)}
        icon={<Icon id={6} open={open} />}
      >
        <AccordionHeader onClick={() => handleOpen(6)}>
          <div className="flex justify-between w-full">
            <h4 className="flex items-center text-base">TRANSMISSION</h4>
            {search.transmissionType.length !== 0 && (
              <div
                className="flex items-center text-sm underline"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFilter(["transmissionType"]);
                }}
              >
                clear
              </div>
            )}
          </div>
        </AccordionHeader>
        <div className={`${open.includes(6) ? "block py-4 " : "hidden py-4 "}`}>
          <div className="flex flex-col uppercase">
            {Object.keys(taxonomy.transmissionType).map((item) => {
              return (
                <div
                  key={item}
                  className={`mr-3 p-2  uppercase ${false ? "font-bold" : ""}`}
                >
                  <label className="custom-checkboxr mr-1">
                    <input
                      id={item}
                      type="checkbox"
                      className="hidden"
                      onChange={(e) => {
                        setFilter("transmissionType", item, e.target.checked);
                      }}
                      checked={search.transmissionType.includes(item)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <label
                    htmlFor={item}
                    className={`custom-checkboxr ${
                      search.transmissionType.includes(item) ? "font-bold" : ""
                    } ${
                      !taxonomy.transmissionType[item] ? "text-gray-400" : ""
                    }`}
                  >{`${item} (${taxonomy.transmissionType[item]})`}</label>
                </div>
              );
            })}
          </div>
        </div>
      </Accordion>
      <Accordion
        className="remove-border"
        open={open.includes(7)}
        icon={<Icon id={7} open={open} />}
      >
        <AccordionHeader onClick={() => handleOpen(7)}>
          <div className="flex justify-between w-full">
            <h4 className="flex items-center text-base">FUEL TYPE</h4>
            {search.fuelType.length !== 0 && (
              <div
                className="flex items-center text-sm underline"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFilter(["fuelType"]);
                }}
              >
                clear
              </div>
            )}
          </div>
        </AccordionHeader>
        <div className={`${open.includes(7) ? "block py-4 " : "hidden py-4 "}`}>
          <div className="flex flex-col uppercase">
            {Object.keys(taxonomy.fuelType).map((item) => {
              return (
                <div
                  key={item}
                  className={`mr-3 p-2  uppercase ${false ? "font-bold" : ""}`}
                >
                  <label className="custom-checkboxr mr-1">
                    <input
                      id={item}
                      type="checkbox"
                      className="hidden"
                      onChange={(e) => {
                        setFilter("fuelType", item, e.target.checked);
                      }}
                      checked={search.fuelType.includes(item)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <label
                    htmlFor={item}
                    className={`custom-checkboxr ${
                      search.fuelType.includes(item) ? "font-bold" : ""
                    } ${!taxonomy.fuelType[item] ? "text-gray-400" : ""}`}
                  >
                    {`${item} (${taxonomy.fuelType[item]})`}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </Accordion>
      <Accordion
        className="overflow-visible remove-border"
        open={open.includes(8)}
        icon={<Icon id={8} open={open} />}
      >
        <AccordionHeader onClick={() => handleOpen(8)}>
          <div className="flex justify-between w-full">
            <h4 className="flex items-center text-base">COLOUR</h4>
            {search.colour.length !== 0 && (
              <div
                className="flex items-center text-sm underline"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFilter(["colour"]);
                }}
              >
                clear
              </div>
            )}
          </div>
        </AccordionHeader>
        <div className={`${open.includes(8) ? "block py-4 " : "hidden py-4 "}`}>
          <div className="flex flex-col uppercase">
            {Object.keys(taxonomy.colour).map((item) => {
              return (
                <div
                  key={item}
                  className={`mr-3 p-2  uppercase ${false ? "font-bold" : ""}`}
                >
                  <label className="custom-checkboxr mr-1">
                    <input
                      id={item}
                      type="checkbox"
                      className="hidden"
                      onChange={(e) => {
                        setFilter("colour", item, e.target.checked);
                      }}
                      checked={search.colour.includes(item)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <label
                    htmlFor={item}
                    className={`custom-checkboxr ${
                      search.colour.includes(item) ? "font-bold" : ""
                    } ${!taxonomy.colour[item] ? "text-gray-400" : ""}`}
                  >
                    {`${item} (${taxonomy.colour[item]})`}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </Accordion>

      <div className="mt-10 flex pb-4">
        {mobile && (
          <div
            className="w-1/2 pr-1"
            onClick={() => {
              document.body.style.overflow = "";
              setOpenModal(false);
            }}
          >
            <GrayBtn name="VIEW" isFit={false} />
          </div>
        )}
        <div
          className={`${mobile ? "w-1/2" : "w-full"} pl-1`}
          onClick={() => {
            clearFilter([
              "make",
              "model",
              "bodyType",
              "transmissionType",
              "fuelType",
              "colour",
            ]);
            cash.setCashMax(cash.cashRange[1]);
            cash.setCashMin(cash.cashRange[0]);
            finance.setFinanceMax(finance.financeRange[1]);
            finance.setFinanceMin(finance.financeRange[0]);
            mileage.setMileageMax(mileage.mileageRange[1]);
            mileage.setMileageMin(mileage.mileageRange[0]);
          }}
        >
          <WhiteBtn name="RESET" isFit={false} />
        </div>
      </div>
    </div>
  );
}
