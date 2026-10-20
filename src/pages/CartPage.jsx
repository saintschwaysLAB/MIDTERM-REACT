import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { formatCurrency } from '../utils/currency';

function ArrowIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3.5 10h12M10 4.5l5.5 5.5-5.5 5.5" />
        </svg>
    );
}

export default function CartPage() {
    const { cart, removeItem, updateQuantity, total, itemCount } = useCart();

    return (
        <main className="cart-page">
            <nav aria-label="Breadcrumb" className="cart-breadcrumb">
                <Link to="/">Home</Link>
                <span aria-hidden="true">›</span>
                <span aria-current="page">Shopping cart</span>
            </nav>

            <div className="cart-heading">
                <div className="cart-title">
                    <h1>Your cart</h1>
                    <span>{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
                </div>
                <Link to="/" className="continue-shopping">Continue shopping <ArrowIcon /></Link>
            </div>

            {cart.items.length === 0 ? (
                <div className="cart-empty">
                    <p>Your cart is currently empty.</p>
                    <Link to="/">Explore sneakers <ArrowIcon /></Link>
                </div>
            ) : (
                <div className="cart-layout">
                    <section className="cart-items" aria-label="Cart items">
                        <div className="cart-list-heading">
                            <span>Product</span>
                            <span>Total</span>
                        </div>
                        {cart.items.map(item => (
                            <article key={`${item.product.id}-${item.selectedSize}`} className="cart-item">
                                <img
                                    src={item.product.imageUrl}
                                    alt={`${item.product.brand} ${item.product.name}`}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-details">
                                    <p className="cart-item-brand">{item.product.brand}</p>
                                    <h2>{item.product.name}</h2>
                                    <p>{item.product.colorway}</p>
                                    <p>Size: US {item.selectedSize}</p>
                                    <div className="cart-item-actions">
                                        <div className="quantity-control" aria-label={`Quantity for ${item.product.name}`}>
                                            <button
                                                type="button"
                                                aria-label={`Decrease quantity of ${item.product.name}`}
                                                onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                                            >−</button>
                                            <span aria-live="polite">{item.quantity}</span>
                                            <button
                                                type="button"
                                                aria-label={`Increase quantity of ${item.product.name}`}
                                                onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                                            >+</button>
                                        </div>
                                        <button
                                            type="button"
                                            className="remove-item"
                                            onClick={() => removeItem(item.product.id, item.selectedSize)}
                                        >Remove</button>
                                    </div>
                                </div>
                                <p className="cart-item-total">{formatCurrency(item.getSubtotal())}</p>
                            </article>
                        ))}
                    </section>

                    <aside className="order-summary" aria-labelledby="order-summary-title">
                        <h2 id="order-summary-title">Order Summary</h2>
                        <div className="summary-row">
                            <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                            <strong>{formatCurrency(total)}</strong>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="summary-total">
                            <span>Total</span>
                            <strong>{formatCurrency(total)}</strong>
                        </div>
                        <button type="button" className="checkout-button">Checkout <ArrowIcon /></button>
                    </aside>
                </div>
            )}
        </main>
    );
}
