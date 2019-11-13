import React from "react";
const Loader: React.MemoExoticComponent<() => JSX.Element> = React.memo(() => {
  return (
    <div className="fa-5x my-5 text-center text-center m-auto">
      <i className="fas fa-spinner fa-spin" />
    </div>
  );
});
export default Loader;
