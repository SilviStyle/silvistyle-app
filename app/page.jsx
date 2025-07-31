
'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const categories = {
    "Adrián & Valeria": useState([]),
    "Belleza": useState([]),
    "Bustos Artesanía": useState([]),
    "Complementos": useState([]),
    "Hogar": useState([]),
    "Macramé": useState([]),
    "Maquillaje": useState([]),
    "Pekemucas": useState([]),
    "Ropa": useState([]),
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const handleAddProduct = (category, name, price) => {
    const [products, setProducts] = categories[category];
    if (name && price) {
      setProducts([...products, { name, price: parseFloat(price) }]);
    }
  };

  const handleDeleteProduct = (category, index) => {
    const [products, setProducts] = categories[category];
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  const filteredCategories = Object.entries(categories).filter(([cat, [list]]) => {
    if (selectedCategory !== "Todas" && cat !== selectedCategory) return false;
    return list.some((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div className="p-4 bg-purple-50 min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <Image src="/Logo Elegante.png" alt="Logo SilviStyle" width={60} height={60} />
        <h1 className="text-3xl font-bold text-purple-800">SilviStyle Creaciones Y+</h1>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          className="w-1/2 p-2 border border-purple-300 rounded"
          placeholder="Buscar producto por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 rounded border border-purple-300"
        >
          <option value="Todas">Todas las categorías</option>
          {Object.keys(categories).map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filteredCategories.map(([category, [products, setProducts]]) => (
        <div key={category} className="mb-6 bg-purple-100 p-4 rounded shadow">
          <h2 className="text-xl font-bold text-purple-700 mb-2">{category}</h2>
          <ul className="mb-4">
            {products.map((product, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b py-1"
              >
                <span>
                  {product.name} - {product.price} CHF
                </span>
                <button
                  className="text-sm text-red-600 underline"
                  onClick={() => handleDeleteProduct(category, index)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <input
              placeholder="Nombre del producto"
              onChange={(e) => setProducts((prev) => ({ ...prev, newName: e.target.value }))}
              className="p-2 border rounded"
            />
            <input
              placeholder="Precio"
              type="number"
              onChange={(e) => setProducts((prev) => ({ ...prev, newPrice: e.target.value }))}
              className="p-2 border rounded w-24"
            />
            <button
              className="bg-purple-700 text-white px-4 py-2 rounded"
              onClick={() =>
                handleAddProduct(
                  category,
                  products.newName || "",
                  products.newPrice || ""
                )
              }
            >
              Añadir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
