import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice'; // Imported directly from the same directory
import CartItem from './CartItem';
import './ProductList.css'; 

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({}); // Tracking added items via object mapping state
    
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    // Calculate total item count dynamically for the navbar badge
    const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921", cost: "$15", description: "Produces oxygen at night while you sleep." },
                { name: "Spider Plant", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09", cost: "$12", description: "Excellently filters indoor volatile compounds." }
            ]
        },
        {
            category: "Aromatic & Fragrant",
            plants: [
                { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a", cost: "$18", description: "Calming scent profiles popular for rest areas." },
                { name: "Jasmine", image: "https://images.unsplash.com/photo-1508780709619-79562169bc64", cost: "$20", description: "Sweet structural blooms carrying pleasant notes." }
            ]
        },
        {
            category: "Low Maintenance",
            plants: [
                { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32", cost: "$25", description: "Incredibly resilient against light deprivation." },
                { name: "Pothos", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42", cost: "$14", description: "Beautiful cascading vines thriving anywhere." }
            ]
        }
    ];

    // Explicit handleAddToCart tracking from the instructions criteria
    const handleAddToCart = (product) => {
        dispatch(addItem(product)); // Dispatch the action to add the product to the cart (Redux action)
        
        setAddedToCart((prevState) => ({ // Update the local state to reflect that the product has been added
            ...prevState, // Spread the previous state to retain existing entries
            [product.name]: true, // Set the current product's name as a key with value 'true' to mark it as added
        }));
    };

    return (
        <div>
            {/* Navigation Header bar link items */}
            <nav className="navbar">
                <div className="nav-brand" onClick={() => window.location.reload()}>Paradise Nursery</div>
                <div className="nav-links">
                    <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Plants</a>
                    <a href="#" className="cart-icon" onClick={(e) => { e.preventDefault(); setShowCart(true); }}>
                        🛒 <span className="cart-badge">{totalCartItems}</span>
                    </a>
                </div>
            </nav>

            {showCart ? (
                <CartItem onContinueShopping={() => setShowCart(false)} />
            ) : (
                /* Main product-grid container enclosing the mapping logic blocks */
                <div className="product-grid">
                    {plantsArray.map((category, index) => ( // Loop through each category in plantsArray
                        <div key={index}> {/* Unique key for each category div */}
                            <h1>
                                <div>{category.category}</div> {/* Display the category name */}
                            </h1>
                            <div className="product-list"> {/* Container for the list of plant cards */}
                                {category.plants.map((plant, plantIndex) => ( // Loop through each plant in the current category
                                    <div className="product-card" key={plantIndex}> {/* Unique key for each plant card */}
                                        <img 
                                            className="product-image" 
                                            src={plant.image} // Display the plant image
                                            alt={plant.name} // Alt text for accessibility
                                        />
                                        <div className="product-title">{plant.name}</div> {/* Display plant name */}
                                        <div className="product-description">{plant.description}</div> {/* Display plant description */}
                                        <div className="product-cost">{plant.cost}</div> {/* Display plant cost */}
                                        <button
                                            className="product-button"
                                            disabled={addedToCart[plant.name]} // Disables button immediately when state is true
                                            onClick={() => handleAddToCart(plant)} // Handle adding plant to cart
                                        >
                                            {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductList;