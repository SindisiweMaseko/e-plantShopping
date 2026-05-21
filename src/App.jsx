import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <div className="app-container">
      {!showProductList ? (
        /* Uses the class class matching App.css */
        <div className="background-image">
          <div className="landing-content">
            {/* Exact required heading text */}
            <h1>Welcome to Paradise Nursery</h1>
            <AboutUs />
            {/* Exact required button action */}
            <button className="get-started-btn" onClick={() => setShowProductList(true)}>
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;


