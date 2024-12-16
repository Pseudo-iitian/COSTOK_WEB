import React from "react";

function Button({ label, onClick }) {
  return (
    <div className="my-2 sm:my-0">
      <button
        onClick={onClick}
        className="bg-black text-white w-full px-24 sm:px-32 md:px-40 sm:w-full py-2 sm:py-4 mt-2 font-2xl border-black rounded-lg text-xl"
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
