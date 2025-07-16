function PriceFilter({ priceFilter, onFilterChange }) {
  const priceOptions = [
    { value: "all", label: "Tất cả mức giá" },
    { value: "under500k", label: "< 500.000 đ" },
    { value: "500k-1m", label: "500K - 1M đ" },
    { value: "over1m", label: "> 1.000.000 đ" },
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
