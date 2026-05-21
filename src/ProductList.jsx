import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css'; 

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921", cost: "$15", description: "Produces oxygen at night." },
                { name: "Spider Plant", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09", cost: "$12", description: "Filters volatile compounds." },
                { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355", cost: "$18", description: "Removes mold spores from air." },
                { name: "Boston Fern", image: "https://images.unsplash.com/photo-1517511620798-cec17d428bc0", cost: "$14", description: "Thrives in high humidity environments." },
                { name: "English Ivy", image: "https://images.unsplash.com/photo-1530991787600-e29124be3bb5", cost: "$16", description: "Reduces airborne particles." },
                { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547613768-d069b12be734", cost: "$10", description: "Cleans air and heals burns." }
            ]
        },
        {
            category: "Aromatic & Fragrant",
            plants: [
                { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a", cost: "$18", description: "Calming scent profiles popular for rest." },
                { name: "Jasmine", image: "https://images.unsplash.com/photo-1508780709619-79562169bc64", cost: "$20", description: "Sweet structural blooms carrying pleasant notes." },
                { name: "Rosemary", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e2", cost: "$15", description: "Invigorating herbal scent used in cooking." },
                { name: "Mint", image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2", cost: "$12", description: "Refreshing fragrance that deters pests." },
                { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1551248429-4043bcaad350", cost: "$22", description: "Sharp, clean aroma beneficial for respiration." },
                { name: "Basil", image: "https://images.unsplash.com/photo-1594489428504-5c0c480a15fd", cost: "$11", description: "Sweet, warm culinary fragrance profile." }
            ]
        },
        {
            category: "Low Maintenance",
            plants: [
                { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32", cost: "$25", description: "Incredibly resilient against light deprivation." },
                { name: "Pothos", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42", cost: "$14", description: "Beautiful cascading vines thriving anywhere." },
                { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632205301078-4144347517c5", cost: "$19", description: "Can survive months without water interaction." },
                { name: "Succulent Mix", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09", cost: "$8", description: "Stores water in thick leaves effectively." },
                { name: "Chinese Evergreen", image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a", cost: "$17", description: "Tolerates poor lighting and dry air." },
                { name: "Castor Plant", image: "https://images.unsplash.com/photo-1525498128493-380d1990a112", cost: "$21", description: "Grows quickly with minimal intervention." }
            ]
        }
    ];

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setAddedToCart((prevState) => ({
            ...prevState,
            [product.name]: true,
        }));
    };

    return (
        <div>
            {/* Rubric Link Requirement Navbar containing Home, Plants, and Cart */}
            <nav className="navbar">
                <div className="nav-brand" onClick={() => window.location.reload()}>Paradise Nursery</div>
                <div className="nav-links">
                    <a href="#" onClick={(e) => { e.preventDefault(); window.location.reload(); }}>Home</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Plants</a>
                    <a href="#" className="cart-icon" onClick={(e) => { e.preventDefault(); setShowCart(true); }}>
                        🛒 <span className="cart-badge">{totalCartItems}</span>
                    </a>
                </div>
            </nav>

            {showCart ? (
                <CartItem onContinueShopping={() => setShowCart(false)} />
            ) : (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h1><div>{category.category}</div></h1>
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>
                                        <img className="product-image" src={plant.image} alt={plant.name} />
                                        <div className="product-title">{plant.name}</div>
                                        <div className="product-description">{plant.description}</div>
                                        <div className="product-cost">{plant.cost}</div>
                                        <button
                                            className="product-button"
                                            disabled={addedToCart[plant.name]}
                                            onClick={() => handleAddToCart(plant)}
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
