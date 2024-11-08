import React from "react";
import MatrixInput from "../MatrixInput";

export default function Matrix({ matrix, onDimensionChange, onValuesChange }) {
  const handleDimensionChange = (e) => {
    const { id, value } = e.target;
    onDimensionChange(matrix.id, id, parseInt(value));
  };

  return (
    <div className="bg-slate-600 py-2 px-4 rounded-md relative max-w-64">
      <h2 className="sub-title-font-size font-semibold text-light-base">
        Matriks {matrix.id}
      </h2>
      <div className="flex gap-4 mb-4">
        <input
          type="number"
          id="rows"
          className="input-text"
          placeholder="Baris"
          min={1}
          max={3}
          value={matrix.rows}
          onChange={handleDimensionChange}
          required
        />
        <input
          type="number"
          id="columns"
          className="input-text"
          placeholder="Kolom"
          min={1}
          max={3}
          value={matrix.columns}
          onChange={handleDimensionChange}
          required
        />
      </div>
      <MatrixInput
        rows={matrix.rows}
        columns={matrix.columns}
        onValuesChange={onValuesChange}
      />
    </div>
  );
}
