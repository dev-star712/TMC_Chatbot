export default function QuickCarInfo({ registration, vehicle }) {
  return (
    <div className="w-full px-4 bg-white rounded-2xl">
      <div className="py-2 font-bold text-xl   border-b-2">
        Your Vehicle Information:
      </div>
      <div className="text-sm mt-6 w-full">
        <div className="flex flex-row justify-between border-b-2 py-2  border-gray-300">
          <div className="  uppercase">Registration Number:</div>
          <div className="  uppercase font-bold">{registration}</div>
        </div>
        <div className="flex flex-row justify-between border-b-2 py-2 border-gray-300">
          <div className="  uppercase">Make:</div>
          <div className="  uppercase font-bold">
            {vehicle.make.length > 20
              ? `${vehicle.make.slice(0, 20)}...`
              : vehicle.make}
          </div>
        </div>
        <div className="flex flex-row justify-between border-b-2 py-2 border-gray-300">
          <div className="  uppercase">Model:</div>
          <div className="  uppercase font-bold">
            {vehicle.model.length > 20
              ? `${vehicle.model.slice(0, 20)}...`
              : vehicle.model}
          </div>
        </div>
        <div className="flex flex-row justify-between border-b-2 py-2 border-gray-300">
          <div className="  uppercase">Version:</div>
          <div className="  uppercase font-bold">
            {vehicle.derivative.length > 20
              ? `${vehicle.derivative.slice(0, 20)}...`
              : vehicle.derivative}
          </div>
        </div>
        <div className="flex flex-row justify-between border-b-2 py-2 border-gray-300">
          <div className="  uppercase">Fuel Type:</div>
          <div className="  uppercase font-bold">{vehicle.fuelType}</div>
        </div>
        <div className="flex flex-row justify-between border-b-2 py-2 border-gray-300">
          <div className="  uppercase">Registration Date:</div>
          <div className="  uppercase font-bold">
            {vehicle.firstRegistrationDate}
          </div>
        </div>
        <div className="flex flex-row justify-between border-b-2 py-2 border-gray-300">
          <div className="  uppercase">Color</div>
          <div className="  uppercase font-bold">
            {vehicle.colour.length > 20
              ? `${vehicle.colour.slice(0, 20)}...`
              : vehicle.colour}
          </div>
        </div>
        <div className="flex flex-row justify-between border-b-2 py-2 border-gray-300">
          <div className="  uppercase">Engine Size:</div>
          <div className="  uppercase font-bold">
            {vehicle.engineCapacityCC} cc
          </div>
        </div>
        <div className="flex flex-row justify-between border-b-2 py-2 border-gray-300">
          <div className="  uppercase">Number of Doors</div>
          <div className="  uppercase font-bold">{vehicle.doors}</div>
        </div>
        <div className="flex flex-row justify-between py-2 border-gray-300">
          <div className="  uppercase">Transmission</div>
          <div className="  uppercase font-bold">
            {vehicle.transmissionType}
          </div>
        </div>
      </div>
    </div>
  );
}
