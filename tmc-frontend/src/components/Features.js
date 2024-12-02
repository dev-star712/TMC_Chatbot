export default function Features(props) {
  const item = props.ele;
  return (
    <div className="p-6 lg:flex justify-center bg-white">
      <h3 className="hidden">Features</h3>
      <div className="w-full sm:columns-2">
        {item.features.map((i, index) => (
          <div
            key={index}
            className="overflow-hidden flex flex-row"
            style={{ whiteSpace: "normal" }}
          >
            <div className="bg-black mt-3 w-1 h-1 rounded-full"></div>
            <p className="pl-2">{i.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
