import React from "react";

export default function MatrixInput({ rows, columns }) {
  const renderMatrixInputs = () => {
    const inputs = [];
    for (let i = 0; i < rows; i++) {
      const rowInputs = [];
      for (let j = 0; j < columns; j++) {
        rowInputs.push(
          <input
            key={`${i}-${j}`}
            type="number"
            className="input-text max-w-20"
            placeholder={`[${i + 1},${j + 1}]`}
            required
          />
        );
      }
      inputs.push(
        <div key={i} className="flex gap-4 mb-4">
          {rowInputs}
        </div>
      );
    }
    return inputs;
  };

  return <div className="matrix-inputs">{renderMatrixInputs()}</div>;
}
