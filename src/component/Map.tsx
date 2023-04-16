import React from "react";
import AmsMap from "../component/AmsMap";
import { ToastContainer } from "react-toastify";

export default function Map() {
  return (
    <>
      <div className="flex">
        <AmsMap />
      </div>

      <div className="pad-15"></div>
      <ToastContainer autoClose={5000} position={"top-center"} />
    </>
  );
}
