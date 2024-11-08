import React, { useState, useEffect } from "react";
import MatrixButton from "../MatrixButton";

export default function MatrixInput({ rows, columns, onValuesChange }) {
  const [matrixValues, setMatrixValues] = useState(() =>
    Array.from({ length: rows }, () => Array(columns).fill(0))
  );

  useEffect(() => {
    setMatrixValues(() =>
      Array.from({ length: rows }, () => Array(columns).fill(0))
    );
  }, [rows, columns]);

  useEffect(() => {
    onValuesChange(matrixValues);
  }, [matrixValues]);

  const handleInputChange = (row, col, value) => {
    setMatrixValues((prevMatrix) => {
      const newMatrix = [...prevMatrix];
      newMatrix[row][col] = value === "" ? 0 : parseFloat(value);
      return newMatrix;
    });
  };

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
    if (!canCalculate()) {
      alert("Dimensi matriks tidak sesuai untuk transpose!");
      return;
    }
    const transposedMatrix = Array.from({ length: columns }, (_, j) =>
      Array.from({ length: rows }, (_, i) => matrixValues[i][j])
    );
    setMatrixValues(transposedMatrix);
  };

  const calculateDeterminant = (matrix) => {
    const n = matrix.length;
    if (n === 1) return matrix[0][0];
    if (n === 2)
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

    let determinant = 0;
    for (let i = 0; i < n; i++) {
      const subMatrix = matrix
        .slice(1)
        .map((row) => row.filter((_, j) => j !== i));
      determinant +=
        matrix[0][i] * calculateDeterminant(subMatrix) * (i % 2 === 0 ? 1 : -1);
    }
    return determinant;
  };

  const determinantMatrix = () => {
    if (!canCalculate()) {
      alert("Dimensi matriks tidak sesuai untuk determinan!");
      return;
    }

    const determinant = calculateDeterminant(matrixValues);
    alert(`Determinant: ${determinant}`);
  };

  const inverseMatrix = () => {
    if (!canCalculate()) {
      alert("Dimensi matriks tidak sesuai untuk inverse!");
      return;
    }

    const n = matrixValues.length;
    const identityMatrix = Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
    );

    const augmentedMatrix = matrixValues.map((row, i) => [
      ...row,
      ...identityMatrix[i],
    ]);

    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (
          Math.abs(augmentedMatrix[k][i]) > Math.abs(augmentedMatrix[maxRow][i])
        ) {
          maxRow = k;
        }
      }

      if (augmentedMatrix[maxRow][i] === 0) {
        alert("Matriks tidak memiliki invers!");
        return;
      }

      [augmentedMatrix[i], augmentedMatrix[maxRow]] = [
        augmentedMatrix[maxRow],
        augmentedMatrix[i],
      ];

      const divisor = augmentedMatrix[i][i];
      for (let j = 0; j < 2 * n; j++) {
        augmentedMatrix[i][j] /= divisor;
      }

      for (let k = 0; k < n; k++) {
        if (k !== i) {
          const factor = augmentedMatrix[k][i];
          for (let j = 0; j < 2 * n; j++) {
            augmentedMatrix[k][j] -= factor * augmentedMatrix[i][j];
          }
        }
      }
    }

    const inverse = augmentedMatrix.map((row) => row.slice(n));
    setMatrixValues(inverse);
  };

  const canCalculate = () => {
    return rows === columns;
  };

  return (
    <>
      <div className="matrix-inputs">{renderMatrixInputs()}</div>
      <div className="flex flex-wrap gap-2">
        <MatrixButton text="Bershikan" onClick={clearMatrix} />
        <MatrixButton text="Semua 0" onClick={fillMatrixWithZeros} />
        <MatrixButton text="Semua 1" onClick={fillMatrixWithOnes} />
        <MatrixButton text="Acak" onClick={randomizeMatrix} />
        <MatrixButton text="Identitas" onClick={setIdentityMatrix} />
        <MatrixButton text="Transpose" onClick={transposeMatrix} />
        <MatrixButton text="Determinan" onClick={determinantMatrix} />
        <MatrixButton text="Inverse" onClick={inverseMatrix} />
      </div>
    </>
  );
}
