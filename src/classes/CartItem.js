export class CartItem {
    constructor(product, selectedSize, quantity = 1) {
    this.product = product;
    this.selectedSize = selectedSize;
    this.quantity = quantity;
    }
  getSubtotal() { return this.product.price * this.quantity; }
}