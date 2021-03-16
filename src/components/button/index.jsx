import React from "react";

const Button = () => {
  const notify = () => {
    alert("thank you");
  };
  return (
    <div>
      <button type="button" onClick={notify}>
        Click Me!
      </button>
    </div>
  );
};

export default Button;
