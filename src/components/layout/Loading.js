import React from "react";
import LoadingGif from "../clients/loading.gif";

function Loading() {
  return (
    <div>
      <img src={LoadingGif} alt="Loading" />
    </div>
  );
}

export default Loading;
