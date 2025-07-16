function PriceFilter({ priceFilter, onFilterChange }) {
  const priceOptions = [
    { value: "all", label: "Tất cả mức giá" },
    { value: "under500k", label: "Dưới 500,000 VND" },
    { value: "500k-1m", label: "500,000 - 1,000,000 VND" },
    { value: "over1m", label: "Trên 1,000,000 VND" },
  ];

  return (
    <div className="price-filter">
      <select
        value={priceFilter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        {priceOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PriceFilter;
