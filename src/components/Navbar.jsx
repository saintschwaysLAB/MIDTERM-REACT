import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/useCart';

function SearchIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="10.8" cy="10.8" r="6.3" />
            <path d="m15.5 15.5 4.2 4.2" />
        </svg>
    );
}

function BagIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M5 8h14l1 12H4L5 8Z" />
            <path d="M9 9V6a3 3 0 0 1 6 0v3" />
        </svg>
    );
}

export default function Navbar() {
    const { itemCount } = useCart();
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('search') || '';

    const updateSearch = (value) => {
        const next = new URLSearchParams(searchParams);
        if (value) next.set('search', value);
        else next.delete('search');
        setSearchParams(next, { replace: true });
    };

    return (
        <header className="shop-header sticky top-0 z-40 border-b border-[#ecebe8] bg-white">
            <div className="header-content mx-auto flex max-w-[1440px] items-center gap-7 px-5 md:px-8">
                <Link to="/" className="brand-mark shrink-0" aria-label="Patosan home">
                    Patosan'
                </Link>

                <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
                    <Link to="/" className="nav-link">Shop all</Link>
                    <Link to="/?new=true" className="nav-link">New arrivals</Link>
                    <Link to="/#brands" className="nav-link">Brands</Link>
                </nav>

                <label className="header-search ml-auto flex min-w-0 flex-1 items-center gap-2.5">
                    <SearchIcon />
                    <span className="sr-only">Search sneakers, brands and more</span>
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => updateSearch(event.target.value)}
                        placeholder="Search sneakers, brands and more"
                    />
                </label>

                <div className="header-actions flex shrink-0 items-center gap-4">
                    <span className="hidden text-[12px] font-medium sm:inline">Account</span>
                    <Link to="/cart" className="cart-link relative flex items-center justify-center" aria-label={`Shopping bag, ${itemCount} items`}>
                        <BagIcon />
                        <span className="cart-count">{itemCount}</span>
                    </Link>
                    <button type="button" className="help-button" aria-label="Help">?</button>
                </div>
            </div>
        </header>
    );
}
