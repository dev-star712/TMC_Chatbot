import { Helmet } from "react-helmet";

export default function Meta({ meta_title, meta_description, canonical_url }) {
  return (
    <Helmet>
      <title>
        {meta_title ||
          "Used Pick-Up Trucks For Sale Nationwide | Used Truck Dealership | Used Cars & Vans"}
      </title>
      <meta name="description" content={meta_description || ""} />
      <link
        rel="canonical"
        href={`https://${process.env.REACT_APP_APP}${
          canonical_url ? canonical_url : "/"
        }`}
      ></link>
    </Helmet>
  );
}
