import React, { useState, useEffect } from 'react';

function App() {
  const initialCart = { GR1: 0, SR1: 0, SF1: 0 };
  const [cart, setCart] = useState(initialCart);
  const [total, setTotal] = useState(0);

  // Function to handle incrementing the quantity of an item
  const addItem = (item) => {
    setCart({ ...cart, [item]: cart[item] + 1 });
  };

  // Function to handle decrementing the quantity of an item
  const removeItem = (item) => {
    if (cart[item] > 0) {
      setCart({ ...cart, [item]: cart[item] - 1 });
    }
  };

  // Function to handle resetting the cart
  const resetCart = () => {
    setCart(initialCart);
  };

  // Function to calculate the total price based on the cart
  const calculateTotal = async () => {
    try {
      const response = await fetch('http://localhost:3000/total', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      });

      const result = await response.json();
      setTotal(result.total);
    } catch (error) {
      console.error('Error calculating total:', error);
    }
  };

  // Update total whenever the cart changes
  useEffect(() => {
    calculateTotal();
  }, [cart]);

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1 style={{ color: '#00698f', fontSize: 36, fontWeight: 'bold' }}>Cash Register</h1>
      </div>
      <div className="products" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff', padding: 20, borderRadius: 10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <div className="product" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: 10, borderBottom: '1px solid #ccc' }}>
          <span style={{ fontSize: 18, fontWeight: 'bold' }}> ☕ Coffee - SF1</span>
          <span style={{ display: 'flex' }}>
            <button onClick={() => removeItem('SF1')} style={{ backgroundColor: 'red', color: '#ffffff', border: 'none', padding: 9, borderRadius: 5, cursor: 'pointer', width: 38, height: 38, fontSize: 22, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>-</button>
            <span style={{ margin: '0 10px', fontSize: 18 }}>{cart.SF1}</span>
            <button onClick={() => addItem('SF1')} style={{ backgroundColor: '#4CAF50', color: '#ffffff', border: 'none', padding: 9, borderRadius: 5, cursor: 'pointer', width: 38, height: 38, fontSize: 22, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>+</button>
          </span>
        </div>
        <div className="product" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: 10, borderBottom: '1px solid #ccc' }}>
          <span style={{ fontSize: 18, fontWeight: 'bold' }}> 🍵 Green Tea - GR1</span>
          <span style={{ display: 'flex' }}>
            <button onClick={() => removeItem('GR1')} style={{ backgroundColor: 'red', color: '#ffffff', border: 'none', padding: 9, borderRadius: 5, cursor: 'pointer', width: 38, height: 38, fontSize: 22, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>-</button>
            <span style={{ margin: '0 10px', fontSize: 18 }}>{cart.GR1}</span>
            <button onClick={() => addItem('GR1')} style={{ backgroundColor: '#4CAF50', color: '#ffffff', border: 'none', padding: 9, borderRadius: 5, cursor: 'pointer', width: 38, height: 38, fontSize: 22, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>+</button>
          </span>
        </div>
        <div className="product" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: 10 }}>
          <span style={{ fontSize: 18, fontWeight: 'bold' }}> 🍓 Strawberries - SR1</span>
          <span style={{ display: 'flex' }}>
            <button onClick={() => removeItem('SR1')} style={{ backgroundColor: 'red', color: '#ffffff', border: 'none', padding: 9, borderRadius: 5, cursor: 'pointer', width: 38, height: 38, fontSize: 22, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>-</button>
            <span style={{ margin: '0 10px', fontSize: 18 }}>{cart.SR1}</span>
            <button onClick={() => addItem('SR1')} style={{ backgroundColor: '#4CAF50', color: '#ffffff', border: 'none', padding: 9, borderRadius: 5, cursor: 'pointer', width: 38, height: 38, fontSize: 22, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>+</button>
          </span>
        </div>
      </div>

      <div className="summary" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff', padding: 20, borderRadius: 10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginTop: 20 }}>
        <h2 style={{ color: '#00698f', fontSize: 24, fontWeight: 'bold' }}>Summary</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {Object.entries(cart).map(([item, quantity]) => (
            quantity > 0 && <li key={item} style={{ fontSize: 18, padding: 10, borderBottom: '1px solid #ccc' }}>{item}: {quantity}</li>
          ))}
        </ul>
        <h3 style={{ color: '#00698f', fontSize: 24, fontWeight: 'bold' }}>Total: ${total}</h3>
      </div>

      <button onClick={resetCart} style={{ backgroundColor: '#4CAF50', color: '#ffffff', border: 'none', padding: 10, borderRadius: 5, cursor: 'pointer', display: 'block', margin: '20px auto' }}>Reset</button>
    </div>
  );
}

export default App;