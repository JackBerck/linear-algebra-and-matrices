import React from "react";

export default function MatrixButton({ text, onClick }) {
  return (
    <button
      type="button"
      className="bg-light-base text-dark-base py-1 px-2 rounded-md small-font-size font-semibold"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
