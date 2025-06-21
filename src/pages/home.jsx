import { useState } from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  // Lista de produtos (você pode editar ou adicionar mais)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Netflix Premium 1 Mês",
      price: 25.90,
      icon: "🎬",
      category: "Streaming",
    },
    {
      id: 2,
      name: "Spotify Premium 3 Meses",
      price: 35.90,
      icon: "🎵",
      category: "Música",
    },
    {
      id: 3,
      name: "Steam Gift Card R$50",
      price: 45.90,
      icon: "🎮",
      category: "Jogos",
    },
    // Adicione mais produtos aqui...
  ]);

  return (
    <div className="home">
      <h1>🛒 Loja de Serviços Digitais</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
