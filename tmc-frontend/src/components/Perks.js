import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ReactComponent as CheckSVG } from "../components/svg/check3.svg";
export default function Perks() {
  //SEO
  const [data, setData] = useState(null);

  const getData = async () => {
    const url = `https://${process.env.REACT_APP_CMS_API}/api/content/load?page=0-18-0`;
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
    <div className="px-5 mt-6 rounded-none md:rounded-2xl bg-white py-[24px] flex flex-col">
      <h2 className="w-full   font-open-sans-condensed sm:font-open-sans text-xl font-bold text-gray-900  leading-6 ">
        Perks of Buying Online with TMC...
      </h2>
      <div className="mt-6 w-fit">
        <div className="self-stretch flex-col justify-start items-start gap-2 flex">
          {data &&
            data.content &&
            data.content
              .match(/<li>(.*?)<\/li>/g)
              .map((item) => item.replace(/<\/?li>/g, ""))
              .map((item, index) => (
                <div
                  key={index}
                  className="self-stretch justify-start items-start gap-2 inline-flex"
                >
                  <div className="p-1 rounded-[100px] border border-red-600 justify-center items-center gap-2 flex">
                    <div className="w-4 h-4 relative">
                      <CheckSVG />
                    </div>
                  </div>
                  <p className="  grow shrink basis-0 text-black text-base font-semibold font-open-sans-condensed sm:font-open-sans leading-normal">
                    {item}
                  </p>
                </div>
              ))}
        </div>
        <div className="self-stretch justify-start items-start gap-2 inline-flex mt-4 ml-2">
          <Link
            to="/faq"
            className="underline  grow shrink basis-0 text-black text-lg font-bold font-open-sans-condensed sm:font-open-sans leading-normal"
          >
            How does it work?
          </Link>
        </div>
      </div>
    </div>
  );
}
