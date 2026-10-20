import { formatCurrency } from '../utils/currency';

export class Product {

    constructor({ id, name, brand, description, price, category, colorway, sizes, imageUrl, stock, rating, isNew = false }) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.description = description;
    this.price = price;
    this.category = category;
    this.colorway = colorway;
    this.sizes = sizes;
    this.imageUrl = imageUrl;
    this.stock = stock;
    this.rating = rating;
    this.isNew = isNew;
}

    getFormattedPrice() { return formatCurrency(this.price); }
    isInStock() { return this.stock > 0; }
    hasSize(size) { return this.sizes.includes(size); }
}