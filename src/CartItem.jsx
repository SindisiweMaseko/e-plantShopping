import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const parseCost = (costString) => {
        if (typeof costString === 'number') return costString;
        return parseFloat(costString.replace('$', ''));
    };

    // Fix: Implemented dynamic item.quantity * cost looping arithmetic
    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => total + (parseCost(item.cost) * item.quantity), 0);
    };

    const calculateTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    const handleRemove = (itemName) => {
        dispatch(removeItem(itemName));
    };

    return (
        <div className="cart-container">
            <h2>Your Paradise Shopping Cart</h2>
            <h3 className="total-items-count">Total Plants Selected: {calculateTotalItems()}</h3>
            <h3 className="total-cart-amount">Total Cart Amount: ${calculateTotalAmount()}</h3>

            <div className="cart-items-list">
                {cartItems.map((item, index) => (
                    <div className="cart-item-card" key={index}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">Unit Price: {item.cost}</div>
                            
                            <div className="cart-item-quantity">
                                <button className="qty-btn" onClick={() => handleDecrement(item)}>-</button>
                                <span className="qty-value">{item.quantity}</span>
                                <button className="qty-btn" onClick={() => handleIncrement(item)}>+</button>
                            </div>

                            <div className="cart-item-total">
                                Subtotal: ${parseCost(item.cost) * item.quantity}
                            </div>
                            
                            <button className="delete-btn" onClick={() => handleRemove(item.name)}>
                                Delete Item
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-actions">
                <button className="continue-shopping-btn" onClick={onContinueShopping}>
                    Continue Shopping
                </button>
                <button className="checkout-btn" onClick={() => alert('Coming Soon!')}>
                    Checkout
                </button>
            </div>
        </div>
    );
}

export default CartItem;
