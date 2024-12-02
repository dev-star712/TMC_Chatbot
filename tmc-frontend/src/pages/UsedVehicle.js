import MainLayout from "../layouts/MainLayout";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import downarrow from "../assets/icon/down-arrow.png";
import { RefineSearch } from "../components/gallery/RefineSearch";
import usedpickupimg from "../assets/images/usedpickup.png";
import { ReactComponent as CloseSVG } from "../components/svg/close.svg";
import HeroSection from "../components/gallery/HeroSection";
import { VehicleCard } from "../components/gallery/VehicleCard";
import { VehicleCardSkeleton } from "../components/gallery/VehicleCardSkeleton";
import Representative from "../components/Representative";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Meta from "../components/Meta";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    height: "100%",
    width: "100%",
    maxWidth: "400px",
    ariaHideApp: false,
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
};
export default function UsedVehicle() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // Accessing individual query parameters
  const _bodyType = queryParams.get("bodyType");
  const _make = queryParams.get("make");
  const _model = queryParams.get("model");

  const _cashMin =
    (queryParams.get("cashMin") && queryParams.get("cashMin") * 1) || 0;
  const _cashMax =
    (queryParams.get("cashMax") && queryParams.get("cashMax") * 1) || 100000;

  const pageSize = 12;

  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [total, setTotal] = useState(0);
  const [totallist, setTotallist] = useState([]);
  const [viewlist, setViewlist] = useState([]);
  const [showlist, setShowlist] = useState([]);
  const [taxonomy, setTaxonomy] = useState({
    make: {},
    model: {},
    bodyType: {},
    transmissionType: {},
    fuelType: {},
    colour: {},
  });
  const [search, setSearch] = useState({
    make: [],
    model: [],
    bodyType: [],
    transmissionType: [],
    fuelType: [],
    colour: [],
  });

  const [cashMin, setCashMin] = useState(0);
  const [cashMax, setCashMax] = useState(100000);
  const [cashRange, setCashRange] = useState([0, 100000]);

  const [financeMin, setFinanceMin] = useState(0);
  const [financeMax, setFinanceMax] = useState(2000);
  const [financeRange, setFinanceRange] = useState([0, 2000]);

  const [selected, setSelected] = useState(true);

  const [mileageMin, setMileageMin] = useState(0);
  const [mileageMax, setMileageMax] = useState(200000);
  const [mileageRange, setMileageRange] = useState([0, 200000]);

  const [sortOption, setSortOption] = useState(2);

  const extractTaxonomy = (data, init) => {
    console.log("taxonomy");
    const make = { ...taxonomy.make };
    const model = { ...taxonomy.model };
    const bodyType = { ...taxonomy.bodyType };
    const transmissionType = { ...taxonomy.transmissionType };
    const fuelType = { ...taxonomy.fuelType };
    const colour = { ...taxonomy.colour };

    let cashMinT;
    let cashMaxT;
    let financeMinT = financeMax;
    let financeMaxT = financeMin;
    let mileageMinT = mileageMax;
    let mileageMaxT = mileageMin;

    Object.keys(make).forEach((key) => {
      make[key] = 0;
    });
    Object.keys(model).forEach((key) => {
      model[key] = 0;
    });
    Object.keys(bodyType).forEach((key) => {
      bodyType[key] = 0;
    });
    Object.keys(transmissionType).forEach((key) => {
      transmissionType[key] = 0;
    });
    Object.keys(fuelType).forEach((key) => {
      fuelType[key] = 0;
    });
    Object.keys(colour).forEach((key) => {
      colour[key] = 0;
    });

    data.forEach((item) => {
      make[item.vehicle.make] = (make[item.vehicle.make] || 0) + 1;
      model[item.vehicle.model] = (model[item.vehicle.model] || 0) + 1;
      bodyType[item.vehicle.bodyType] =
        (bodyType[item.vehicle.bodyType] || 0) + 1;
      transmissionType[item.vehicle.transmissionType] =
        (transmissionType[item.vehicle.transmissionType] || 0) + 1;
      fuelType[item.vehicle.fuelType] =
        (fuelType[item.vehicle.fuelType] || 0) + 1;
      colour[item.vehicle.colour] = (colour[item.vehicle.colour] || 0) + 1;

      if (
        cashMinT > (item.adverts.forecourtPrice.amountGBP || 0) ||
        !cashMinT
      ) {
        cashMinT = item.adverts.forecourtPrice.amountGBP || 0;
      }
      if (
        cashMaxT < (item.adverts.forecourtPrice.amountGBP || 0) ||
        !cashMaxT
      ) {
        cashMaxT = item.adverts.forecourtPrice.amountGBP || 0;
      }

      if (financeMinT > (item.vehicle.finance || 0)) {
        financeMinT = item.vehicle.finance || 0;
      }
      if (financeMaxT < (item.vehicle.finance || 0)) {
        financeMaxT = item.vehicle.finance || 0;
      }

      if (mileageMinT > (item.vehicle.odometerReadingMiles || 0)) {
        mileageMinT = item.vehicle.odometerReadingMiles || 0;
      }
      if (mileageMaxT < (item.vehicle.odometerReadingMiles || 0)) {
        mileageMaxT = item.vehicle.odometerReadingMiles || 0;
      }
    });

    if (init) {
      setFinanceMin(
        Number.isInteger(financeMinT / 50)
          ? financeMinT
          : Math.floor(financeMinT / 50) * 50
      );
      setFinanceMax(
        Number.isInteger(financeMaxT / 50)
          ? financeMaxT
          : (Math.floor(financeMaxT / 50) + 1) * 50
      );

      setMileageMin(
        Number.isInteger(mileageMinT / 2000)
          ? mileageMinT
          : Math.floor(mileageMinT / 2000) * 2000
      );
      setMileageMax(
        Number.isInteger(mileageMaxT / 2000)
          ? mileageMaxT
          : (Math.floor(mileageMaxT / 2000) + 1) * 2000
      );

      if (cashMinT && cashMaxT) {
        setCashMin(
          Number.isInteger(cashMinT / 2000)
            ? cashMinT
            : Math.floor(cashMinT / 2000) * 2000
        );
        setCashMax(
          Number.isInteger(cashMaxT / 2000)
            ? cashMaxT
            : (Math.floor(cashMaxT / 2000) + 1) * 2000
        );

        setCashRange([
          Number.isInteger(cashMinT / 2000)
            ? cashMinT
            : Math.floor(cashMinT / 2000) * 2000,
          Number.isInteger(cashMaxT / 2000)
            ? cashMaxT
            : (Math.floor(cashMaxT / 2000) + 1) * 2000,
        ]);
      }

      setFinanceRange([
        Number.isInteger(financeMinT / 50)
          ? financeMinT
          : Math.floor(financeMinT / 50) * 50,
        Number.isInteger(financeMaxT / 50)
          ? financeMaxT
          : (Math.floor(financeMaxT / 50) + 1) * 50,
      ]);

      setMileageRange([
        Number.isInteger(mileageMinT / 2000)
          ? mileageMinT
          : Math.floor(mileageMinT / 2000) * 2000,
        Number.isInteger(mileageMaxT / 2000)
          ? mileageMaxT
          : (Math.floor(mileageMaxT / 2000) + 1) * 2000,
      ]);
    }

    return {
      make,
      model,
      bodyType,
      transmissionType,
      fuelType,
      colour,
      cashRange: [
        Number.isInteger(cashMinT / 2000)
          ? cashMinT
          : Math.floor(cashMinT / 2000) * 2000,
        Number.isInteger(cashMaxT / 2000)
          ? cashMaxT
          : (Math.floor(cashMaxT / 2000) + 1) * 2000,
      ],
    };
  };

  const setFilter = (key, value, e) => {
    const temp = { ...search };
    if (e) {
      temp[key].push(value);
    } else {
      temp[key] = temp[key].filter((item) => item !== value);
    }
    setSearch(temp);
  };

  const clearFilter = (keys) => {
    const temp = { ...search };
    keys.forEach((key) => {
      temp[key] = [];
    });
    setSearch(temp);
  };

  const getStockData = async () => {
    setLoading(true);
    const url = `https://${process.env.REACT_APP_API}/api/vehicle/stock?page=1&pageSize=ALL`;
    await axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          const vehicles = response.data.data.results;
          setShowlist(vehicles);

          const tax = extractTaxonomy(vehicles, true);

          let {
            make,
            model,
            bodyType,
            transmissionType,
            fuelType,
            colour,
            cashRange,
          } = tax;

          if (
            _bodyType &&
            _bodyType !== "all" &&
            bodyType[_bodyType] !== undefined
          ) {
            setFilter("bodyType", _bodyType, true);
          }

          if (_make && _make !== "all" && make[_make] !== undefined) {
            setFilter("make", _make, true);
          }

          if (_model && _model !== "all" && model[_model] !== undefined) {
            setFilter("model", _model, true);
          }

          if (_cashMin && _cashMin % 2000 === 0 && _cashMin > cashRange[0]) {
            setCashMin(_cashMin);
          }

          if (_cashMax && _cashMax % 2000 === 0 && _cashMax < cashRange[1]) {
            setCashMax(_cashMax);
          }

          setTaxonomy({
            make,
            model,
            bodyType,
            transmissionType,
            fuelType,
            colour,
          });

          setViewlist(vehicles.slice(0, pageSize));
          setTotallist(vehicles);
          setLoading(false);
          // const totalResults = vehicles.length;
          // setTotal(totalResults);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const more = () => {
    let a = showlist.filter((el) => !viewlist.includes(el));
    if (a.length >= pageSize)
      setViewlist([...viewlist, ...a.slice(0, pageSize)]);
    else {
      setVisible(false);
      setViewlist([...viewlist, ...a]);
    }
  };

  const sortFilteredList = (filteredlist, sortOption) => {
    // eslint-disable-next-line array-callback-return
    filteredlist.sort((a, b) => {
      if (sortOption === 1) {
        if (
          (a.adverts.forecourtPrice.amountGBP || 0) <
          (b.adverts.forecourtPrice.amountGBP || 0)
        ) {
          return -1;
        } else if (
          (a.adverts.forecourtPrice.amountGBP || 0) >
          (b.adverts.forecourtPrice.amountGBP || 0)
        ) {
          return 1;
        } else {
          return 0;
        }
      } else if (sortOption === 2) {
        if (
          (a.adverts.forecourtPrice.amountGBP || 0) <
          (b.adverts.forecourtPrice.amountGBP || 0)
        ) {
          return 1;
        } else if (
          (a.adverts.forecourtPrice.amountGBP || 0) >
          (b.adverts.forecourtPrice.amountGBP || 0)
        ) {
          return -1;
        } else {
          return 0;
        }
      } else if (sortOption === 3) {
        if (a.vehicle.finance === 0) {
          return 1;
        } else if (b.vehicle.finance === 0) {
          return -1;
        } else if (a.vehicle.finance < b.vehicle.finance) {
          return -1;
        } else if (a.vehicle.finance > b.vehicle.finance) {
          return 1;
        } else {
          return 0;
        }
      } else if (sortOption === 4) {
        if (a.vehicle.finance === 0) {
          return 1;
        } else if (b.vehicle.finance === 0) {
          return -1;
        } else if (a.vehicle.finance < b.vehicle.finance) {
          return 1;
        } else if (a.vehicle.finance > b.vehicle.finance) {
          return -1;
        } else {
          return 0;
        }
      } else if (sortOption === 5) {
        if (a.vehicle.yearOfManufacture < b.vehicle.yearOfManufacture) {
          return 1;
        } else if (a.vehicle.yearOfManufacture > b.vehicle.yearOfManufacture) {
          return -1;
        } else {
          return 0;
        }
      } else if (sortOption === 6) {
        if (a.vehicle.yearOfManufacture < b.vehicle.yearOfManufacture) {
          return -1;
        } else if (a.vehicle.yearOfManufacture > b.vehicle.yearOfManufacture) {
          return 1;
        } else {
          return 0;
        }
      }
    });

    return filteredlist;
  };

  useEffect(() => {
    getStockData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const temp = {
      make: [],
      model: [],
      bodyType: [],
      transmissionType: [],
      fuelType: [],
      colour: [],
    };

    if (
      _bodyType &&
      _bodyType !== "all" &&
      taxonomy.bodyType[_bodyType] !== undefined
    ) {
      temp.bodyType.push(_bodyType);
    }

    if (_make && _make !== "all" && taxonomy.make[_make] !== undefined) {
      temp.make.push(_make);
    }

    if (_model && _model !== "all" && taxonomy.model[_model] !== undefined) {
      temp.model.push(_model);
    }

    if (_cashMin && _cashMin % 2000 === 0 && _cashMin > cashRange[0]) {
      setCashMin(_cashMin);
    } else {
      setCashMin(cashRange[0]);
    }

    if (_cashMax && _cashMax % 2000 === 0 && _cashMax < cashRange[1]) {
      setCashMax(_cashMax);
    } else {
      console.log(cashRange[1]);
      setCashMax(cashRange[1]);
    }

    setSearch(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_bodyType, _make, _model, _cashMin, _cashMax]);

  useEffect(() => {
    if (cashMin % 2000 !== 0 || cashMin < cashRange[0]) {
      setCashMin(cashRange[0]);
    }

    if (cashMax % 2000 !== 0 || _cashMax > cashRange[1]) {
      setCashMax(cashRange[1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cashRange]);

  useEffect(() => {
    let filteredlist = [...totallist];

    if (
      !search.make.length &&
      !search.model.length &&
      !search.bodyType.length &&
      !search.transmissionType.length &&
      !search.fuelType.length &&
      !search.colour.length &&
      ((selected && cashMin === cashRange[0] && cashMax === cashRange[1]) ||
        (!selected &&
          financeMin === financeRange[0] &&
          financeMax === financeRange[1])) &&
      mileageMin === mileageRange[0] &&
      mileageMax === mileageRange[1]
    ) {
      filteredlist = sortFilteredList(filteredlist, sortOption);
      setShowlist(filteredlist);
      setViewlist(filteredlist.slice(0, pageSize));
      setVisible(filteredlist.length > pageSize);
    } else {
      console.log("filter");

      filteredlist = search.make.length
        ? filteredlist.filter((item) => search.make.includes(item.vehicle.make))
        : filteredlist;
      filteredlist = search.model.length
        ? filteredlist.filter((item) =>
            search.model.includes(item.vehicle.model)
          )
        : filteredlist;
      filteredlist = search.bodyType.length
        ? filteredlist.filter((item) =>
            search.bodyType.includes(item.vehicle.bodyType)
          )
        : filteredlist;
      filteredlist = search.colour.length
        ? filteredlist.filter((item) =>
            search.colour.includes(item.vehicle.colour)
          )
        : filteredlist;
      filteredlist = search.transmissionType.length
        ? filteredlist.filter((item) =>
            search.transmissionType.includes(item.vehicle.transmissionType)
          )
        : filteredlist;
      filteredlist = search.fuelType.length
        ? filteredlist.filter((item) =>
            search.fuelType.includes(item.vehicle.fuelType)
          )
        : filteredlist;

      if (selected && !(cashMin === cashRange[0] && cashMax === cashRange[1])) {
        filteredlist = filteredlist.filter((item) => {
          const price = item.adverts.forecourtPrice.amountGBP || 0;
          return price >= cashMin && price <= cashMax;
        });
      } else if (
        !selected &&
        !(financeMin === financeRange[0] && financeMax === financeRange[1])
      ) {
        filteredlist = filteredlist.filter((item) => {
          const price = item.vehicle.finance;
          return price >= financeMin && price <= financeMax;
        });
      }

      if (!(mileageMin === mileageRange[0] && mileageMax === mileageRange[1])) {
        filteredlist = filteredlist.filter((item) => {
          const mile = item.vehicle.odometerReadingMiles || 0;
          return mile >= mileageMin && mile <= mileageMax;
        });
      }

      filteredlist = sortFilteredList(filteredlist, sortOption);

      setShowlist(filteredlist);
      setViewlist(filteredlist.slice(0, pageSize));
      setVisible(filteredlist.length > pageSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    search,
    totallist,
    cashMin,
    cashMax,
    financeMin,
    financeMax,
    mileageMin,
    mileageMax,
    selected,
  ]);

  useEffect(() => {
    setTaxonomy(extractTaxonomy(showlist, false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showlist]);

  useEffect(() => {
    let filteredlist = [...showlist];
    filteredlist = sortFilteredList(filteredlist, sortOption);
    setShowlist(filteredlist);
    setViewlist(filteredlist.slice(0, pageSize));
    setVisible(filteredlist.length > pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  //SEO
  const [data, setData] = useState(null);

  const getData = async () => {
    const url = `https://${process.env.REACT_APP_CMS_API}/api/content/load?page=0-20-0`;
    await axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout>
      {data && (
        <Meta
          meta_title={data.meta_title}
          meta_description={data.meta_description}
          canonical_url="/vehicles-for-sale/"
        />
      )}
      <div className="hidden sm:block">
        <HeroSection
          img={usedpickupimg}
          mt={"mt-4 lg:mt-20"}
          words={["used", "pick-up truck"]}
        />
      </div>
      <FilterModal
        open={open}
        setOpen={setOpen}
        taxonomy={taxonomy}
        search={search}
        setFilter={setFilter}
        clearFilter={clearFilter}
        cash={{
          cashMin,
          setCashMin,
          cashMax,
          setCashMax,
          cashRange,
          setCashRange,
        }}
        finance={{
          financeMin,
          setFinanceMin,
          financeMax,
          setFinanceMax,
          financeRange,
          setFinanceRange,
        }}
        mileage={{
          mileageMin,
          setMileageMin,
          mileageMax,
          setMileageMax,
          mileageRange,
          setMileageRange,
        }}
        selected={selected}
        setSelected={setSelected}
      />
      <div className="flex pt-10 flex-col md:flex-row justify-center w-full bg-[#f6f6f6]">
        <div className="flex flex-col md:flex-row md:justify-between max-w-[1440px] ">
          <div className="px-5 mb-4 lg:block hidden min-w-[380px]  md:w-1/4">
            <RefineSearch
              taxonomy={taxonomy}
              search={search}
              setFilter={setFilter}
              clearFilter={clearFilter}
              mobile={false}
              cash={{
                cashMin,
                setCashMin,
                cashMax,
                setCashMax,
                cashRange,
                setCashRange,
              }}
              finance={{
                financeMin,
                setFinanceMin,
                financeMax,
                setFinanceMax,
                financeRange,
                setFinanceRange,
              }}
              mileage={{
                mileageMin,
                setMileageMin,
                mileageMax,
                setMileageMax,
                mileageRange,
                setMileageRange,
              }}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
          <div className="w-full lg:w-[72%]  flex-col">
            <div
              className={`px-5 w-full flex flex-row justify-between ${
                loading ? "lg:justify-end " : ""
              }`}
            >
              {showlist.length > 0 ? (
                <div className="hidden lg:block text-lg mt-1">
                  We currently have <strong>{showlist.length}</strong> vehicles
                  that match your search.
                </div>
              ) : (
                !loading && (
                  <div className="hidden lg:block text-lg mt-1">
                    Sorry, we have no vehicles that match your search
                  </div>
                )
              )}
              <div className="mb-6 w-[60%] md:w-1/2 lg:w-1/3 float-right border-0">
                <select
                  className="w-full rounded-full border-2 border-gray-900 p-2 uppercase"
                  onChange={(e) => {
                    setSortOption(e.target.value * 1);
                  }}
                  value={sortOption}
                >
                  <option value="1">Price - Low to High</option>
                  <option value="2">Price - High to Low</option>
                  <option value="3">Monthly Price - Low to High</option>
                  <option value="4">Monthly Price - High to Low</option>
                  <option value="5">Age - Newest First</option>
                  <option value="6">Age - Oldest First</option>
                </select>
              </div>
              <div
                onClick={() => {
                  document.body.style.overflow = "hidden";
                  setOpen(true);
                }}
                className="mb-6 lg:hidden rounded-full w-[37%] uppercase border-2 border-gray-900 flex flex-row items-center justify-between px-4 "
              >
                <div>filter</div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 3C2 2.44772 2.44772 2 3 2H13C13.5523 2 14 2.44772 14 3V4.25245C14 4.51767 13.8946 4.77202 13.7071 4.95956L9.62623 9.04044C9.43869 9.22798 9.33333 9.48233 9.33333 9.74755V11.3333L6.66667 14V9.74755C6.66667 9.48233 6.56131 9.22798 6.37377 9.04044L2.29289 4.95956C2.10536 4.77202 2 4.51767 2 4.25245V3Z"
                    stroke="#272727"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {showlist.length > 0 ? (
              <div className="lg:hidden block text-lg mt-1 pl-5 pr-5 w-full">
                We currently have <strong>{showlist.length}</strong> vehicles
                that match your search.
              </div>
            ) : !loading ? (
              <div className="lg:hidden block text-lg mt-1 pl-5 pr-5 w-full">
                Sorry, we have no vehicles that match your search
              </div>
            ) : (
              <div className="lg:hidden block w-full pl-5 pr-5">
                <div className="bg-gray-300 h-[24px] animate-pulse rounded-full mt-1"></div>
              </div>
            )}

            <div className="px-5 w-full ">
              {showlist.length !== 0 ? (
                <div className="flex w-full flex-wrap items-center justify-center gap-1 xl:gap-x-16 2xl:gap-0">
                  {viewlist.map((ele) => {
                    let price = "None";
                    if (!ele.adverts.forecourtPrice.amountGBP)
                      price = "Not set";
                    else
                      price =
                        ele.adverts.forecourtPrice.amountGBP.toLocaleString();
                    let imgurl = "";
                    if (ele.media.images.length === 0) {
                      imgurl =
                        "https://m-qa.atcdn.co.uk/a/media/w600h450/7c170800b6f241bf86132ccb21af9c93.jpg";
                    } else {
                      imgurl = ele.media.images[0].href;
                    }
                    let item = {
                      make: ele.vehicle.make,
                      model: ele.vehicle.model,
                      vin: ele.vehicle.vin,
                      branch: ele.vehicle.branch,
                      price: price,
                      forecourtPriceVatStatus:
                        ele.adverts.forecourtPriceVatStatus,
                      desc: ele.vehicle.derivative,
                      distance: ele.vehicle.odometerReadingMiles || 0,
                      fuel: ele.vehicle.fuelType,
                      method: ele.vehicle.transmissionType,
                      location: ele.vehicle.derivative,
                      image: imgurl,
                      finance: ele.vehicle.finance,
                      status: ele.vehicle.status,
                    };
                    return <VehicleCard key={ele.vehicle.vin} item={item} />;
                  })}
                </div>
              ) : (
                <div className="flex w-full flex-wrap items-center justify-center gap-1 xl:gap-x-16 2xl:gap-0">
                  {Array.from({ length: 15 }, (v, i) => i).map((ele, index) => {
                    return <VehicleCardSkeleton key={index} />;
                  })}
                </div>
              )}
              {!loading && visible && (
                <div className="mt-24 w-full flex flex-row justify-between items-center">
                  <div className="hidden lg:block w-fit border-b-2 border-gray-700 md:w-3/12 lg:w-4/12 2xl:w-2/5"></div>
                  <div
                    onClick={(e) => more()}
                    className=" w-full hover:cursor-pointer flex justify-center flex-row gap-2 items-center md:w-fit bg-black text-white text=[14px] hover:bg-gray-800 py-2  px-6 rounded-full mx-auto"
                  >
                    <div>View more</div>
                    <img src={downarrow} alt="downarrow" className="w-3 h-3" />
                  </div>
                  <div className="hidden lg:block w-fit border-b-2 border-gray-700 md:w-3/12 lg:w-4/12 2xl:w-2/5"></div>
                </div>
              )}
            </div>
            <Representative />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
const FilterModal = ({
  open,
  setOpen,
  taxonomy,
  search,
  setFilter,
  clearFilter,
  cash,
  finance,
  mileage,
  selected,
  setSelected,
}) => {
  Modal.setAppElement(document.getElementById("root"));
  return (
    <Modal
      isOpen={open}
      onRequestClose={() => {
        document.body.style.overflow = "";
        setOpen(false);
      }}
      style={customStyles}
      aria={{
        labelledby: "heading",
        describedby: "full_description",
      }}
      contentLabel="all reviews"
    >
      <div
        onClick={() => {
          document.body.style.overflow = "";
          setOpen(false);
        }}
        className="absolute w-8 h-8 p-2 rounded-full border border-black justify-center items-center gap-2 inline-flex  top-5 right-5"
      >
        <div className="w-4 h-4">
          <CloseSVG />
        </div>
      </div>
      <div className="flex items-center h-full w-full">
        <div className="mt-4 w-full h-full">
          <RefineSearch
            taxonomy={taxonomy}
            search={search}
            setFilter={setFilter}
            clearFilter={clearFilter}
            setOpenModal={setOpen}
            mobile={true}
            cash={cash}
            finance={finance}
            mileage={mileage}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </div>
    </Modal>
  );
};
