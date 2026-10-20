import { CartItem } from './CartItem';

export class Cart {
    constructor() { this.items = []; }

    addItem(product, size, quantity = 1) {
    const existing = this.items.find(i => i.product.id === product.id && i.selectedSize === size);
    if (existing) { existing.quantity += quantity; } 
    else { this.items.push(new CartItem(product, size, quantity)); }
    }
    removeItem(productId, size) {
    this.items = this.items.filter(i => !(i.product.id === productId && i.selectedSize === size));
    }
    updateQuantity(productId, size, qty) {
    if (qty <= 0) return this.removeItem(productId, size);
    const item = this.items.find(i => i.product.id === productId && i.selectedSize === size);
    if (item) item.quantity = qty;
    }
    getTotal() { return this.items.reduce((sum, i) => sum + i.getSubtotal(), 0); }
    getItemCount() { return this.items.reduce((sum, i) => sum + i.quantity, 0); }
    clear() { this.items = []; }
}