import { useState } from "react";
import Matrix from "./components/Matrix";

function App() {
  const [matrices, setMatrices] = useState([
    {
      id: 1,
      rows: 2,
      columns: 2,
      values: [
        [0, 0],
        [0, 0],
      ],
    },
    {
      id: 2,
      rows: 2,
      columns: 2,
      values: [
        [0, 0],
        [0, 0],
      ],
    },
  ]);
  const [result, setResult] = useState(null);

  const handleDimensionChange = (matrixId, dimension, value) => {
    setMatrices((prev) =>
      prev.map((matrix) =>
        matrix.id === matrixId ? { ...matrix, [dimension]: value } : matrix
      )
    );
  };

  const handleMatrixValuesChange = (matrixId, values) => {
    setMatrices((prev) =>
      prev.map((matrix) =>
        matrix.id === matrixId ? { ...matrix, values } : matrix
      )
    );
  };

  const addMatrices = () => {
    if (!canCalculate()) return;

    const result = matrices[0].values.map((row, i) =>
      row.map((val, j) => val + matrices[1].values[i][j])
    );
    setResult(result);
  };

  const subtractMatrices = () => {
    if (!canCalculate()) return;

    const result = matrices[0].values.map((row, i) =>
      row.map((val, j) => val - matrices[1].values[i][j])
    );
    setResult(result);
  };

  const multiplyMatrices = () => {
    if (
      matrices[0].columns !== matrices[1].rows ||
      matrices[0].values.length === 0 ||
      matrices[1].values.length === 0
    ) {
      alert("Dimensi matriks tidak sesuai untuk perkalian!");
      return;
    }

    const result = Array.from({ length: matrices[0].rows }, () =>
      Array(matrices[1].columns).fill(0)
    );

    for (let i = 0; i < matrices[0].rows; i++) {
      for (let j = 0; j < matrices[1].columns; j++) {
        for (let k = 0; k < matrices[0].columns; k++) {
          result[i][j] += matrices[0].values[i][k] * matrices[1].values[k][j];
        }
      }
    }

    setResult(result);
  };

  const canCalculate = () => {
    return (
      matrices[0].rows === matrices[1].rows &&
      matrices[0].columns === matrices[1].columns
    );
  };

  return (
    <>
      <section className="section-padding-x mt-8 mb-8 md:mt-24 md:mb-16 p-8 max-w-screen-lg shadow-sm bg-light-base text-dark-base container">
        <h1 className="title-font-size font-bold mb-4">Kalkulator Matriks</h1>
        <div className="flex flex-wrap gap-8 mb-8">
          {matrices.map((matrix) => (
            <Matrix
              key={matrix.id}
              matrix={matrix}
              onDimensionChange={handleDimensionChange}
              onValuesChange={(values) =>
                handleMatrixValuesChange(matrix.id, values)
              }
            />
          ))}
        </div>
        <div className="mb-8">
          <h1 className="title-font-size font-bold mb-4">Hitung</h1>
          <div className="flex gap-4">
            <button
              onClick={addMatrices}
              className="bg-blue-base text-light-base p-2 rounded-md"
            >
              A + B
            </button>
            <button
              onClick={subtractMatrices}
              className="bg-blue-base text-light-base p-2 rounded-md"
            >
              A - B
            </button>
            <button
              onClick={multiplyMatrices}
              className="bg-blue-base text-light-base p-2 rounded-md"
            >
              AB
            </button>
          </div>
        </div>
        <div className="">
          <h1 className="title-font-size font-bold mb-4">Hasil</h1>
          <div className="bg-slate-600 py-2 px-4 rounded-md relative max-w-72">
            {result ? (
              <>
                <h2 className="sub-title-font-size font-semibold text-light-base">
                  Matriks 3
                </h2>
                {result.map((row, i) => (
                  <div key={i} className="flex gap-4 mb-4">
                    {row.map((val, j) => (
                      <input
                        key={`${i}-${j}`}
                        type="number"
                        value={val}
                        readOnly
                      />
                    ))}
                  </div>
                ))}
              </>
            ) : (
              <h2 className="sub-title-font-size font-semibold text-light-base">
                Belum ada hasil
              </h2>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
