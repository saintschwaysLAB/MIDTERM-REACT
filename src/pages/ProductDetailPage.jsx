import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { products } from '../data/products';
import { useCart } from '../context/useCart';

export default function ProductDetailPage() {
const { id } = useParams();
const navigate = useNavigate();
const { addItem } = useCart();
const product = products.find(p => p.id === id);

const [selectedSize, setSelectedSize] = useState(null);
const [qty, setQty] = useState(1);
const [error, setError] = useState('');

if (!product) return <div className="p-10 text-center">Product not found. <Link to="/" className="underline">Go back</Link></div>;

const handleAdd = () => {
    if (!selectedSize) return setError('Please select a size.');
    addItem(product, selectedSize, qty);
    navigate('/cart');
};

return (
    <main className="max-w-7xl mx-auto px-6 py-10">
    <Link to="/" className="text-sm text-gray-400 hover:underline">← Back</Link>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
        <div className="bg-[#F4F2EE] rounded-xl overflow-hidden aspect-square">
        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain p-4" />
        </div>
        <div>
        <p className="text-xs uppercase tracking-wider text-gray-400">{product.brand}</p>
        <h1 className="text-3xl md:text-4xl font-bold mt-2">{product.name}</h1>
        <p className="text-sm text-gray-400 mt-2">★ {product.rating}</p>
        <p className="text-2xl font-bold mt-4">{product.getFormattedPrice()}</p>
        
        <div className="mt-6">
            <p className="text-xs uppercase text-gray-400 mb-2">Select Size</p>
            <div className="flex gap-2">
            {product.sizes.map(s => (
                <button key={s} onClick={() => { setSelectedSize(s); setError(''); }} className={`w-11 h-11 rounded-full border ${selectedSize === s ? 'bg-black text-white' : 'border-gray-200 hover:border-black'}`}>
                {s}
                </button>
            ))}
            </div>
            {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
        </div>

        <div className="mt-6 flex items-center gap-3">
            <p className="text-xs uppercase text-gray-400">Qty</p>
            <div className="flex items-center border border-gray-200 rounded-md">
            <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-1">−</button>
            <span className="px-3">{qty}</span>
            <button onClick={() => setQty(q => q + 1)} className="px-3 py-1">+</button>
            </div>
        </div>

        <button onClick={handleAdd} className="mt-8 w-full bg-black text-white py-4 rounded-md font-medium hover:bg-gray-800 transition-colors">Add to Cart</button>
        <p className="mt-6 text-sm text-gray-600 leading-relaxed">{product.description}</p>
        </div>
    </div>
    </main>
);
}