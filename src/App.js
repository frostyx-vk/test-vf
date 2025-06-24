import './App.css';
import React, { useState, useEffect } from 'react';
import { productsArr } from './data';

function App() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 50000,
    minRating: 0,
    minReviews: 0
  });

  const fetchProducts = async () => {
    try {
      const filteredLocalProducts = productsArr.filter(product =>
        product.price >= filters.minPrice &&
        product.rating >= filters.minRating &&
        product.reviewsCount >= filters.minReviews
      );
      setProducts(filteredLocalProducts);
    } catch (error) {
      console.error('Ошибка при загрузке продуктов:', error);
    }
  };

  // Загружаем и фильтруем продукты при монтировании
  useEffect(() => {
    fetchProducts();
  }, []);

  // Добавляем эффект для обновления продуктов при изменении фильтров
  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="container">
      <Filters 
        filters={filters}
        onChange={handleFilterChange}
      />
      <Table products={products} />
    </div>
  );
}

const Filters = ({ filters, onChange }) => (
  <div className="filters">
    <div className="filter-group">
      <label>Цена:</label>
      <input
        type="range"
        min={filters.minPrice}
        max={filters.maxPrice}
        value={filters.minPrice}
        onChange={(e) => onChange('minPrice', parseFloat(e.target.value))}
      />
      <span>{filters.minPrice}₽</span>
    </div>
    <div className="filter-group">
      <label>Рейтинг:</label>
      <input
        type="range"
        min={0}
        max={5}
        step={0.1}
        value={filters.minRating}
        onChange={(e) => onChange('minRating', parseFloat(e.target.value))}
      />
      <span>{filters.minRating}</span>
    </div>
    <div className="filter-group">
      <label>Отзывов не менее:</label>
      <input
        type="number"
        value={filters.minReviews}
        onChange={(e) => onChange('minReviews', parseInt(e.target.value))}
      />
    </div>
  </div>
);

const Table = ({ products }) => (
  <table className="product-table">
    <thead>
      <tr>
        <th>Название товара</th>
        <th>Цена</th>
        <th>Цена со скидкой</th>
        <th>Рейтинг</th>
        <th>Количество отзывов</th>
      </tr>
    </thead>
    <tbody>
      {products.map(product => (
        <tr key={product.name}>
          <td>{product.name}</td>
          <td>{product.price}₽</td>
          <td>{product.discountPrice}₽</td>
          <td>{product.rating}</td>
          <td>{product.reviewsCount}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default App;