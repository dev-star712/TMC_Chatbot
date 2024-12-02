export default function Efficiency(props) {
  const item = props.ele;
  return (
    <div className=" flex flex-col justify-center bg-white">
      <h3 className="hidden">Efficiency</h3>
      <div className="text-sm mt-6 w-full md:w-1/2 bg-[#f6f6f6] rounded-2xl">
        <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
          <p className="">MPG(urban)</p>
          <p className=" font-bold">{item.vehicle.fuelEconomyNEDCUrbanMPG}</p>
        </div>
        <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
          <p className="">MPG(extra urban)</p>
          <p className=" font-bold">
            {item.vehicle.fuelEconomyNEDCExtraUrbanMPG}
          </p>
        </div>
        <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
          <p className="">Co2 Emissions</p>
          <p className="   font-bold">{item.vehicle.co2EmissionGPKM} g/km</p>
        </div>
        <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
          <p className="">Tax Band</p>
          <p className=" font-bold">~</p>
        </div>
        <div className="flex flex-row justify-between py-2 px-4 border-gray-300">
          <p className="">Insurance Group</p>
          <p className=" font-bold">{item.vehicle.insuranceGroup || "~"}</p>
        </div>
      </div>
    </div>
  );
}
