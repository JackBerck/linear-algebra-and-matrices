import { useState } from "react";
import Matrix from "./components/Matrix";

function App() {
  const [matrices, setMatrices] = useState([
    { id: 1, rows: 2, columns: 2 },
    { id: 2, rows: 2, columns: 2 },
  ]);

  const handleAddMatrix = () => {
    if (matrices.length < 4) {
      const newMatrix = { id: matrices.length + 1, rows: 2, columns: 2 };
      setMatrices((prev) => [...prev, newMatrix]);
    }
  };

  const handleDimensionChange = (matrixId, dimension, value) => {
    setMatrices((prev) =>
      prev.map((matrix) =>
        matrix.id === matrixId ? { ...matrix, [dimension]: value } : matrix
      )
    );
  };

  const handleDeleteMatrix = (matrixId) => {
    setMatrices((prev) =>
      prev
        .filter((matrix) => matrix.id !== matrixId)
        .map((matrix, index) => ({ ...matrix, id: index + 1 }))
    );
  };

  return (
    <>
      <section className="section-padding-x mt-24 mb-16 p-8 max-w-screen-lg shadow-sm bg-light-base text-dark-base container">
        <h1 className="title-font-size font-bold mb-4">Kalkulator Matriks</h1>
        <div className="flex flex-wrap gap-8">
          {matrices.map((matrix) => (
            <Matrix
              key={matrix.id}
              matrix={matrix}
              onDimensionChange={handleDimensionChange}
              onDelete={handleDeleteMatrix}
            />
          ))}
          {matrices.length < 4 && (
            <button
              className="bg-blue-base text-light-base p-2 rounded-md self-end"
              onClick={handleAddMatrix}
            >
              Tambah Matriks
            </button>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
