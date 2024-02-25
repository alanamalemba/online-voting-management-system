import React from "react";
import banner from "../../assets/images/vote_banner.jpg";

export default function DefaultPage() {
  return (
    <div className="bg-primaryColor grow w-3/4">
      <img
        className="w-full h-[750px] object-cover opacity-40"
        src={banner}
        alt=""
      />{" "}
    </div>
  );
}
