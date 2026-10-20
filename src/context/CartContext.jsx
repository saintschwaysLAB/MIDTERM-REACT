import { useEffect, useState } from 'react';
import { Cart } from '../classes/Cart';
import { CartItem } from '../classes/CartItem';
import { products } from '../data/products';
import { CartContext } from './cart-context';
const STORAGE_KEY = 'patosan-cart';

function loadCart() {
    let saved;
    try {
        saved = localStorage.getItem(STORAGE_KEY);
    } catch (error) {
        console.error('Unable to read the saved cart.', error);
        return new Cart();
    }

    if (!saved) return new Cart();

    try {
        const data = JSON.parse(saved);
        if (!Array.isArray(data.items)) {
            throw new Error('Saved cart does not contain an items array.');
        }

        const cart = new Cart();
        cart.items = data.items.map(({ product, selectedSize, quantity }) => {
            const catalogProduct = products.find(item => item.id === product?.id);
            if (!catalogProduct || !catalogProduct.hasSize(selectedSize) || !Number.isInteger(quantity) || quantity < 1) {
                throw new Error('Saved cart contains an invalid item.');
            }

            return new CartItem(catalogProduct, selectedSize, quantity);
        });
        return cart;
    } catch (error) {
        console.error('Unable to restore the saved cart.', error);
        return new Cart();
    }
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState(loadCart);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: cart.items }));
        } catch (error) {
            console.error('Unable to save the cart.', error);
        }
    }, [cart]);

    const updateCart = (update) => {
        setCart(current => {
            const next = new Cart();
            next.items = current.items.map(item => new CartItem(item.product, item.selectedSize, item.quantity));
            update(next);
            return next;
        });
    };

    return (
        <CartContext.Provider value={{
            cart,
            addItem: (product, size, quantity) => updateCart(next => next.addItem(product, size, quantity)),
            removeItem: (id, size) => updateCart(next => next.removeItem(id, size)),
            updateQuantity: (id, size, quantity) => updateCart(next => next.updateQuantity(id, size, quantity)),
            itemCount: cart.getItemCount(),
            total: cart.getTotal(),
        }}>
            {children}
        </CartContext.Provider>
    );
}
