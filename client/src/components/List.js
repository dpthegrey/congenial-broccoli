import React from "react";
import "boxicons";

const obj = [
  {
    name: "Savings",
    color: "#f9c74f",
  },
  {
    name: "Investment",
    color: "#f9c74f",
  },
  {
    name: "Expense",
    color: "rgb(54, 162, 235)",
  },
];

export default function List() {
  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 text-md font-bold text-xl">History</h1>
      {obj.map((v, i) => (
        <Transaction key={i} category={v}></Transaction>
      ))}
    </div>
  );
}

function Transaction({ category, handler }) {
  if (!category) return null;
  return (
    <div
      className="item flex justify-center bg-gray-50 py-2 rounded-r"
      style={{ borderRight: `8px solid ${category.color ?? "#E5E5E5"}` }}
    >
      <button className="px-3" onClick={handler}>
        <box-icon
          data-id={category._id ?? ""}
          color={category.color ?? "#E5E5E5"}
          name="trash"
        ></box-icon>
      </button>
      <span className="block w-full">{category.name ?? ""}</span>
    </div>
  );
}
