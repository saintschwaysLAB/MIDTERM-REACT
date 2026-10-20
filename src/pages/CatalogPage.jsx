import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const categories = [
    { label: 'All shoes', value: 'all' },
    { label: 'Lifestyle', value: 'casual' },
    { label: 'Running', value: 'running' },
    { label: 'Basketball', value: 'basketball' },
];

export default function CatalogPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || 'all';
    const brand = searchParams.get('brand') || 'all';
    const sort = searchParams.get('sort') || 'featured';
    const newOnly = searchParams.get('new') === 'true';

    const updateParam = (name, value) => {
        const next = new URLSearchParams(searchParams);
        if (!value || value === 'all' || (name === 'new' && value === 'false')) next.delete(name);
        else next.set(name, value);
        setSearchParams(next, { replace: true });
    };

    const brands = useMemo(() => [...new Set(products.map((product) => product.brand))].sort(), []);

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();
        const list = products.filter((product) => {
            const matchesSearch = !query || `${product.name} ${product.brand} ${product.category} ${product.colorway}`.toLowerCase().includes(query);
            const matchesCategory = category === 'all' || product.category === category;
            const matchesBrand = brand === 'all' || product.brand === brand;
            return matchesSearch && matchesCategory && matchesBrand && (!newOnly || product.isNew);
        });

        if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
        if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
        if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
        if (sort === 'newest') list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        return list;
    }, [search, category, brand, sort, newOnly]);

    return (
        <main className="catalog-shell mx-auto max-w-[1440px] px-5 pb-16 pt-5 md:px-8 md:pt-7">
            <section className="hero-banner relative overflow-hidden" aria-labelledby="hero-title">
                <div className="hero-copy relative z-10">
                    <p className="eyebrow mb-3">The everyday rotation</p>
                    <h1 id="hero-title">HIGH QUALITY<br />SHOES</h1>
                    <p className="hero-description">Good shoes take you good places.</p>
                    <a href="#products" className="hero-cta">
                        Shop now
                        <span aria-hidden="true">→</span>
                    </a>
                </div>
                <img className="hero-shoe" src={products[1].imageUrl} alt="Adidas Samba OG sneaker" />
                <div className="hero-caption"><span>ADIDAS SAMBA OG</span><span>WHITE / BLACK / GUM</span></div>
            </section>

            <section id="products" className="product-section pt-7">
                <div className="catalog-toolbar">
                    <div className="category-tabs" aria-label="Filter by shoe type">
                        {categories.map((item) => (
                            <button
                                key={item.value}
                                type="button"
                                className={`category-tab ${category === item.value ? 'is-active' : ''}`}
                                aria-pressed={category === item.value}
                                onClick={() => updateParam('category', item.value)}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <label className="sort-control">
                        <span>Sort by:</span>
                        <select value={sort} onChange={(event) => updateParam('sort', event.target.value)} aria-label="Sort products">
                            <option value="featured">Featured</option>
                            <option value="newest">Newest</option>
                            <option value="price-asc">Price: low to high</option>
                            <option value="price-desc">Price: high to low</option>
                            <option value="rating">Top rated</option>
                        </select>
                    </label>
                </div>

                <div className="catalog-heading">
                    <div>
                        <p className="eyebrow">Find your fit</p>
                        <h2>{newOnly ? 'New arrivals' : 'The sneaker edit'}</h2>
                    </div>
                    <p className="result-count">{filtered.length} {filtered.length === 1 ? 'style' : 'styles'}</p>
                </div>

                <div id="brands" className="brand-filter-row">
                    <span className="filter-label">Brands</span>
                    <button type="button" className={`brand-chip ${brand === 'all' ? 'is-selected' : ''}`} aria-pressed={brand === 'all'} onClick={() => updateParam('brand', 'all')}>All</button>
                    {brands.map((item) => (
                        <button
                            type="button"
                            key={item}
                            className={`brand-chip ${brand === item ? 'is-selected' : ''}`}
                            aria-pressed={brand === item}
                            onClick={() => updateParam('brand', item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {filtered.length > 0 ? (
                    <div className="product-grid">
                        {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
                    </div>
                ) : (
                    <div className="empty-results">
                        <h3>No sneakers found</h3>
                        <p>Try another search or reset your filters to see all styles.</p>
                        <button type="button" onClick={() => setSearchParams({}, { replace: true })}>Clear filters</button>
                    </div>
                )}
            </section>

            <footer className="catalog-footer">
                <span>Patosan' — made for everyday miles.</span>
                <Link to="/#products">Browse all sneakers</Link>
            </footer>
        </main>
    );
}
