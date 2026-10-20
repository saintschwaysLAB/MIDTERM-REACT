import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    return (
        <Link to={`/product/${product.id}`} className="product-card group">
            <div className="product-image-wrap">
                {product.isNew && <span className="new-badge">New</span>}
                <img src={product.imageUrl} alt={`${product.brand} ${product.name}`} loading="lazy" />
                <span className="quick-view">View details <span aria-hidden="true">↗</span></span>
            </div>
            <div className="product-info">
                <p className="product-brand">{product.brand}</p>
                <div className="product-name-row">
                    <h3>{product.name}</h3>
                    <span className="product-price">{product.getFormattedPrice()}</span>
                </div>
                <p className="product-rating" aria-label={`${product.rating} out of 5 stars`}>
                    <span aria-hidden="true">★★★★★</span><span className="rating-number">{product.rating.toFixed(1)}</span>
                </p>
            </div>
        </Link>
    );
}
