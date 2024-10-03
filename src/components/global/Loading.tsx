"use client";
import React, { CSSProperties, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Loading = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ef6172");
  return (
    <div className="w-full h-[calc(100vh-260px)] flex items-center justify-center">
      <SyncLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
