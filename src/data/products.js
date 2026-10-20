import { Product } from '../classes/Product';
import newBalance550Image from '../assets/new-balance-550-white-black.png';
import adidasSambaImage from '../assets/adidas-samba-og-white-black.png';
import airForce1Image from '../assets/nike-air-force-1-triple-white.png';
import newBalance2002RImage from '../assets/new-balance-2002r-grey.png';
import vomero5Image from '../assets/nike-zoom-vomero-5-black.png';
import chuck70Image from '../assets/converse-chuck-70-black.png';
import jordan4FireRedImage from '../assets/air-jordan-4-fire-red.png';
import jordan4BlackCatImage from '../assets/air-jordan-4-black-cat.png';
import kobe6GrinchImage from '../assets/nike-kobe-6-protro-grinch.png';

export const products = [
    new Product({ id: 'new-balance-550', name: '550', brand: 'New Balance', description: 'A retro court-inspired favorite with a clean white leather upper and black accents.', price: 6934.27, category: 'casual', colorway: 'White / Black', sizes: [7, 8, 9, 10, 11, 12], imageUrl: newBalance550Image, stock: 12, rating: 4.9, isNew: true }),
    new Product({ id: 'adidas-samba-og', name: 'Samba OG', brand: 'Adidas', description: 'An indoor-football original with a white leather upper, black three stripes, and a gum sole.', price: 5899, category: 'casual', colorway: 'White / Black / Gum', sizes: [7, 8, 9, 10, 11], imageUrl: adidasSambaImage, stock: 9, rating: 4.8, isNew: true }),
    new Product({ id: 'nike-air-force-1-07', name: "Air Force 1 '07", brand: 'Nike', description: 'The iconic court classic in crisp all-white leather with cushioning built for all-day wear.', price: 6595, category: 'casual', colorway: 'Triple White', sizes: [7, 8, 9, 10, 11, 12], imageUrl: airForce1Image, stock: 14, rating: 4.9 }),
    new Product({ id: 'new-balance-2002r', name: '2002R', brand: 'New Balance', description: 'A running-inspired favorite with layered grey suede and a comfortable cushioned ride.', price: 8995, category: 'running', colorway: 'Grey', sizes: [7, 8, 9, 10, 11, 12], imageUrl: newBalance2002RImage, stock: 6, rating: 4.8 }),
    new Product({ id: 'nike-zoom-vomero-5', name: 'Zoom Vomero 5', brand: 'Nike', description: 'A technical runner in all black with breathable mesh, layered panels, and plush comfort.', price: 8995, category: 'running', colorway: 'Black', sizes: [8, 9, 10, 11, 12], imageUrl: vomero5Image, stock: 5, rating: 4.8, isNew: true }),
    new Product({ id: 'converse-chuck-70-low', name: 'Chuck 70 Low', brand: 'Converse', description: 'A low-top canvas classic in black with vintage-inspired details and a durable rubber sole.', price: 4295, category: 'casual', colorway: 'Black / Egret', sizes: [7, 8, 9, 10, 11], imageUrl: chuck70Image, stock: 18, rating: 4.7 }),
    new Product({ id: 'air-jordan-4-fire-red', name: '4 Retro Fire Red', brand: 'Air Jordan', description: 'A classic basketball sneaker with visible Air cushioning, white leather, and bold Fire Red details.', price: 14995, category: 'basketball', colorway: 'White / Fire Red / Black', sizes: [7, 8, 9, 10, 11, 12], imageUrl: jordan4FireRedImage, stock: 5, rating: 4.9, isNew: true }),
    new Product({ id: 'air-jordan-4-black-cat', name: '4 Retro Black Cat', brand: 'Air Jordan', description: 'A performance-rooted basketball silhouette dressed in a sleek, all-black colorway.', price: 15995, category: 'basketball', colorway: 'Black / Black', sizes: [7, 8, 9, 10, 11, 12], imageUrl: jordan4BlackCatImage, stock: 4, rating: 4.8 }),
    new Product({ id: 'nike-kobe-6-protro-grinch', name: 'Kobe 6 Protro Grinch', brand: 'Nike', description: 'A lightweight basketball shoe in a vivid green colorway, made for quick cuts on court.', price: 17995, category: 'basketball', colorway: 'Green / Black / Red', sizes: [7, 8, 9, 10, 11, 12], imageUrl: kobe6GrinchImage, stock: 3, rating: 4.9, isNew: true }),
];
