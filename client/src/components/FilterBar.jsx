import { useState } from "react";

function FilterBar({ onSortChange }) {
    const [sortBy, setSortBy] = useState("newest");

    const handleSortChange = (event) => {
        const selectedSort = event.target.value;

        setSortBy(selectedSort);
        onSortChange(selectedSort);
    };

    return (
        <section className="filter-bar" id="listings">
            <div className="filter-inner">
                <div className="filter-left">
                    <span className="results-count" id="resultsCount">
                        Showing all houses
                    </span>
                </div>

            <div className="filter-right">
                    <label htmlFor="sortBy">Sort by:</label>

                    <select id="sortBy" value={sortBy} onChange={handleSortChange}>
                        <option value="newest">Newest First</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="size-asc">Size: Small to Large</option>
                    </select>
                </div>
            </div>
        </section>
    );
}

export default FilterBar;