import React from "react";

export default function LoadingScreen() {
  return (
    <div className="bg-yellow-500 h-screen flex justify-center items-center z-50">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
