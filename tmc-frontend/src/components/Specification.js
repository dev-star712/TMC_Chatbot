export default function Specification(props) {
  const item = props.ele;
  return (
    <div className="p-6 lg:flex justify-center bg-white">
      <h3 className="hidden">Specification</h3>
      <div className="w-full flex md:flex-row flex-col md:justify-between">
        <div className="text-sm w-full md:w-[48%] bg-[#f6f6f6] rounded-2xl">
          <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
            <p className="">0~60 Time</p>
            <p className=" font-bold">{item.vehicle.zeroToSixtyMPHSeconds}</p>
          </div>
          <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
            <p className="">BHP</p>
            <p className=" font-bold">{item.vehicle.enginePowerBHP}</p>
          </div>
          <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
            <p className="">Torque</p>
            <p className=" font-bold">~</p>
          </div>
          <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
            <p className="">Max Speed(mph)</p>
            <p className=" font-bold">{item.vehicle.topSpeedMPH}</p>
          </div>
          <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
            <p className="">Aspiration</p>
            <p className=" font-bold">~</p>
          </div>
          <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
            <p className="">Drive Axle</p>
            <p className=" font-bold">
              {item.vehicle.axleConfiguration || "~"}
            </p>
          </div>
          <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
            <p className="">Engine Size</p>
            <p className=" font-bold">
              {parseInt(item.vehicle.engineCapacityCC || 0).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
            <div className="">MPG(urban)</div>
            <div className=" font-bold">
              {item.vehicle.fuelEconomyNEDCUrbanMPG || "~"}
            </div>
          </div>
          <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
            <p className="">MPG(extra urban)</p>
            <p className=" font-bold">
              {item.vehicle.fuelEconomyNEDCUrbanMPG || "~"}
            </p>
          </div>
          <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
            <p className="">Height(mm)</p>
            <p className=" font-bold">
              {parseInt(item.vehicle.heightMM || 0).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
            <p className="">Length(mm)</p>
            <p className=" font-bold">
              {parseInt(item.vehicle.lengthMM || 0).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-row justify-between py-2 px-4 border-gray-300">
            <p className="">Width(mm)</p>
            <p className=" font-bold">
              {parseInt(item.vehicle.widthMM || 0).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="text-sm w-full mt-8 md:mt-0 md:w-[48%] bg-[#f6f6f6] rounded-2xl">
          <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
            <p className="">Kerb Weight</p>
            <p className=" font-bold">
              {item.vehicle.minimumKerbWeightKG || "~"}
            </p>
          </div>
          <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
            <p className="">Gross Weight</p>
            <p className=" font-bold">
              {item.vehicle.grossVehicleWeightKG || "~"}
            </p>
          </div>
          <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
            <p className="">Market Segment</p>
            <p className=" font-bold">~</p>
          </div>
          <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
            <p className="">Bore</p>
            <p className=" font-bold">~</p>
          </div>
          <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
            <p className="">Cylinders</p>
            <p className=" font-bold">{item.vehicle.cylinders || "~"}</p>
          </div>
          <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
            <p className="">Fuel Delivery</p>
            <p className=" font-bold">~</p>
          </div>
          <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
            <p className="">Drive Type</p>
            <p className=" font-bold">{item.vehicle.drivetrain || "~"}</p>
          </div>
          <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
            <p className="">Engine Location</p>
            <p className=" font-bold">~</p>
          </div>
          <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
            <p className="">Forward Gears</p>
            <p className=" font-bold">~</p>
          </div>
          <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
            <p className="">Seats</p>
            <p className=" font-bold">{item.vehicle.seats || "~"}</p>
          </div>
          <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
            <p className="">Valves</p>
            <p className=" font-bold">{item.vehicle.valves || "~"}</p>
          </div>
          <div className="flex flex-row justify-between py-2 px-4 border-gray-300">
            <p className="">Tax Band </p>
            <p className=" font-bold">~</p>
          </div>
        </div>
      </div>
    </div>
  );
}
