import React from "react";
import MatrixInput from "../MatrixInput";

export default function Matrix({ matrix, onDimensionChange, onDelete }) {
  const handleDimensionChange = (e) => {
    const { id, value } = e.target;
    onDimensionChange(matrix.id, id, parseInt(value));
  };

  const handleDelete = () => {
    onDelete(matrix.id);
  };

  return (
    <div className="bg-slate-600 py-2 px-4 rounded-md relative">
      <div className="absolute -top-2 -right-2" onClick={handleDelete}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          className="w-6 h-6 text-red-600 cursor-pointer bg-dark-base rounded-full p-1 delete-matrix"
          fill="currentColor"
        >
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
      </div>
      <h2 className="sub-title-font-size font-semibold text-light-base">
        Matriks {matrix.id}
      </h2>
      <div className="max-w-64 flex gap-4 mb-4">
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
      <MatrixInput rows={matrix.rows} columns={matrix.columns} />
    </div>
  );
}
