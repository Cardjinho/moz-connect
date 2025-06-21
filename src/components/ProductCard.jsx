const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-icon">{product.icon}</div>
      <h3>{product.name}</h3>
      <p>R$ {product.price.toFixed(2)}</p>
      <button>Adicionar ao Carrinho</button>
    </div>
  );
};

export default ProductCard;
