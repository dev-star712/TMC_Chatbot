export default function Representative1() {
  return (
    <div className="mt-6 w-full flex flex-col rounded-2xl bg-white p-8">
      <h3 className="text-2xl font-bold text-gray-800  ">
        Representative Example
      </h3>
      <div className="w-full">
        <div className="mt-6 lg:flex justify-center bg-white">
          <div className="w-full flex flex-col md:flex-row md:justify-between">
            <div className="text-sm w-full md:w-[48%] bg-[#f6f6f6] rounded-2xl">
              <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
                <p className="">Finance Product</p>
                <p className="font-bold">Hire Purchase</p>
              </div>
              <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
                <p className="">Duration Of Agreement</p>
                <p className="font-bold">48 Months</p>
              </div>
              <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
                <p className="">Vehicle Price</p>
                <p className="font-bold">£1,000.00</p>
              </div>
              <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
                <p className="">Custom Deposit</p>
                <p className="font-bold">£2,200.00</p>
              </div>

              <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
                <p className="">Total Deposit</p>
                <p className="font-bold">£2,200.00</p>
              </div>
              <div className="flex flex-row justify-between py-2 px-4 border-gray-300">
                <p className="">Balance To Finance</p>
                <p className="font-bold">£8,800.00</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-sm w-full md:w-[48%] bg-[#f6f6f6] rounded-2xl">
              <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
                <p className="">Total Charge For Credit</p>
                <p className="font-bold">£1,992.80</p>
              </div>

              <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
                <p className="">Total Amount Payable</p>
                <p className="font-bold">£12,992.80</p>
              </div>
              <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
                <p className="">48 Monthly Payments</p>
                <p className="font-bold">£224.85</p>
              </div>
              <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
                <p className="">APR</p>
                <p className="font-bold">10.9% APR</p>
              </div>
              <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
                <p className="">Interest Rate(fixed)</p>
                <p className="font-bold">10.9%</p>
              </div>
              <div className="flex flex-row justify-between py-2 px-4 border-gray-300">
                <p className="">Cash Price Inc Vat</p>
                <p className="font-bold">£11,000.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
