import React from "react";
import "react-quill/dist/quill.snow.css";

export default function ShowContent({ htmlContent }) {
  return (
    <div className="quill">
      <div className="ql-container ql-snow" style={{ border: "none" }}>
        <div
          className="ql-editor text-md md:text-lg lg:text-xl"
          style={{ padding: "0px", fontFamily: "Open Sans" }}
        >
          <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </div>
      </div>
    </div>
  );
}
