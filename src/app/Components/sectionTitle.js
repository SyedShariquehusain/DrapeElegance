import React from "react";



export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-2xl md:text-3xl font-serif mb-3">{title}</h2>
      {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
      <div className="w-16 h-0.5 bg-gray-300 mx-auto mt-4"></div>
    </div>
  );
}
