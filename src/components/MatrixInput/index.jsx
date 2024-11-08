import React, { useState, useEffect } from "react";
import MatrixButton from "../MatrixButton";

export default function MatrixInput({ rows, columns }) {
  const [matrixValues, setMatrixValues] = useState(
    Array.from({ length: rows }, () => Array(columns).fill(0))
  );

  // Update matrix values whenever rows or columns change
  useEffect(() => {
    setMatrixValues((prevMatrix) => {
      const newMatrix = Array.from({ length: rows }, (_, i) =>
        Array.from({ length: columns }, (_, j) => prevMatrix[i]?.[j] ?? 0)
      );
      return newMatrix;
    });
  }, [rows, columns]);

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
            value={matrixValues[i][j]}
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
    const updatedMatrix = matrixValues.map((r, i) =>
      r.map((v, j) => (i === row && j === col ? parseFloat(value) : v))
    );
    setMatrixValues(updatedMatrix);
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

  const transposeMatrix = () => {
    const transposedMatrix = Array.from({ length: columns }, (_, j) =>
      Array.from({ length: rows }, (_, i) => matrixValues[i][j])
    );
    setMatrixValues(transposedMatrix);
  };

  const invertMatrix = () => {
    if (rows !== columns) {
      console.log("Matriks harus persegi untuk di-invers.");
      return;
    }

    try {
      const invertedMatrix = math.inv(matrixValues);
      setMatrixValues(invertedMatrix);
    } catch (error) {
      console.log("Matriks tidak dapat di-invers.");
    }
  };

  const calculateDeterminant = () => {
    if (rows !== columns) {
      console.log("Matriks harus persegi untuk menghitung determinan.");
      return;
    }

    const determinant = math.det(matrixValues);
    console.log(`Determinant: ${determinant}`);
    alert(`Determinant: ${determinant}`);
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
        <MatrixButton text="Transpose" onClick={transposeMatrix} />
        <MatrixButton text="Invers" onClick={invertMatrix} />
        <MatrixButton text="Determinan" onClick={calculateDeterminant} />
      </div>
    </>
  );
}
