import MainLayout from "../layouts/MainLayout";
import { Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import axios from "axios";
import ShowContent from "../components/ShowContent";
import Meta from "../components/Meta";

export default function PrivacyPolicy() {
  const [data, setData] = useState(null);

  const getData = async () => {
    setLoading(true);
    const url = `https://${process.env.REACT_APP_CMS_API}/api/content/load?page=0-3-0`;
    await axios
      .get(url)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [loading, setLoading] = useState(false);

  return (
    <MainLayout>
      {data && (
        <Meta
          meta_title={data.meta_title}
          meta_description={data.meta_description}
          canonical_url="/privacy-policy/"
        />
      )}
      <Typography variant="h1" className="text-center py-0 sm:py-4">
        {data ? data.title || "Privacy Policy" : "Privacy Policy"}
      </Typography>
      {data && (
        <div className="max-w-[1440px] w-full mx-auto px-[20px] xl:px-[100px] md:px-[50px] pt-8 pb-[50px] bg-white  clear-both">
          <div className="flex-col justify-start items-start gap-6 flex">
            <div className="self-stretch  clear-both text-neutral-800 text-xl font-normal font-open-sans-condensed sm:font-open-sans leading-loose">
              <ShowContent htmlContent={data.content} />
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="mt-10 flex w-full h-full text-center subtitle text-[60px]">
          <div className="mt-2 mb-4 w-full flex justify-center items-center ml-3 mr-3">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
