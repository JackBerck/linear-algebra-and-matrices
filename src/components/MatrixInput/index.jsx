import React, { useState, useEffect } from "react";
import MatrixButton from "../MatrixButton";

export default function MatrixInput({ rows, columns }) {
  const [matrixValues, setMatrixValues] = useState(() =>
    Array.from({ length: rows }, () => Array(columns).fill(0))
  );

  useEffect(() => {
    setMatrixValues(() =>
      Array.from({ length: rows }, () => Array(columns).fill(0))
    );
  }, [rows, columns]);

  const renderMatrixInputs = () => {
    if (!matrixValues || matrixValues.length === 0) return null;

    const inputs = [];
    for (let i = 0; i < rows; i++) {
      const rowInputs = [];
      for (let j = 0; j < columns; j++) {
        rowInputs.push(
          <input
            key={`${i}-${j}`}
            type="number"
            className="input-text max-w-20"
            placeholder={`${i + 1},${j + 1}`}
            value={
              matrixValues[i] && matrixValues[i][j] !== undefined
                ? matrixValues[i][j]
                : 0
            }
            onChange={(e) => handleInputChange(i, j, e.target.value)}
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

  const handleInputChange = (row, col, value) => {
    setMatrixValues((prevMatrix) => {
      const newMatrix = [...prevMatrix];
      if (!newMatrix[row]) {
        newMatrix[row] = Array(columns).fill(0);
      }
      newMatrix[row][col] = value === "" ? "" : parseFloat(value);
      return newMatrix;
    });
  };

  const clearMatrix = () => {
    setMatrixValues(
      Array.from({ length: rows }, () => Array(columns).fill(""))
    );
  };

  const fillMatrixWithZeros = () => {
    setMatrixValues(Array.from({ length: rows }, () => Array(columns).fill(0)));
  };

  const fillMatrixWithOnes = () => {
    setMatrixValues(Array.from({ length: rows }, () => Array(columns).fill(1)));
  };

  const randomizeMatrix = () => {
    const randomizedMatrix = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => Math.floor(Math.random() * 100))
    );
    setMatrixValues(randomizedMatrix);
  };

  const setIdentityMatrix = () => {
    const identityMatrix = Array.from({ length: rows }, (_, i) =>
      Array.from({ length: columns }, (_, j) => (i === j ? 1 : 0))
    );
    setMatrixValues(identityMatrix);
  };

  return (
    <>
      <div className="matrix-inputs">{renderMatrixInputs()}</div>
      <div className="flex flex-wrap gap-2">
        <MatrixButton text="Clear" onClick={clearMatrix} />
        <MatrixButton text="All 0" onClick={fillMatrixWithZeros} />
        <MatrixButton text="All 1" onClick={fillMatrixWithOnes} />
        <MatrixButton text="Random" onClick={randomizeMatrix} />
        <MatrixButton text="Identity" onClick={setIdentityMatrix} />
      </div>
    </>
  );
}
