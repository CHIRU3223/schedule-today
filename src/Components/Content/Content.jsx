import React from "react";

const Content = () => {
  const date = new Date();
  console.log(date);
  return (
    <>
      <h2>
        {date.getDay().toLocaleString()} , {date.getMonth()}
        {}
      </h2>
    </>
  );
};

export default Content;
