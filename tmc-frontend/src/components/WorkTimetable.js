export default function WorkTimetable() {
  return (
    <div className="px-6 py-8 rounded-2xl bg-white w-full flex flex-col items-left">
      <h4 className="text-2xl font-bold">Opening Hours</h4>
      <div className="flex flex-col mt-4">
        <p className="text-base w-full font-semibold flex text-gray-900 justify-between">
          <span className="min-w-[40%]">Monday - Fri</span>
          <span className="  ">8:30am-5:30pm</span>
        </p>
        <p className="text-base  w-full font-semibold flex text-gray-900 justify-between">
          <span className="min-w-[40%]">Saturday</span>
          <span className="  ">9:00am-5:00pm</span>
        </p>
        <p className="text-base  w-full font-semibold flex text-gray-900 justify-between">
          <span className="min-w-[40%]">Sunday</span>
          <span className="  ">10:00am-4:00pm</span>
        </p>
      </div>
    </div>
  );
}
