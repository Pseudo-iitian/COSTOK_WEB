import React from "react";

function Button2({ label, onClick }) {
  return (
    <div>
      <button
        onClick={onClick}
        className="bg-green-500 hover:bg-green-600 font-bold text-white w-full py-4 mt-2 font-2xl rounded-lg text-xl"
      >
        {label}
      </button>
    </div>
  );
}

export default Button2;
