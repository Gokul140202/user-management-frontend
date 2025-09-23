import React, { useState } from "react";
import "./FilterPopup.css";

function FilterPopup({ filters = {}, setFilters }) {
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="filter-container">
      <button
        className="filter-toggle-btn"
        onClick={() => setShow(!show)}
      >
        {show ? "Hide Filters" : "Show Filters"}
      </button>

      {show && (
        <div className="filter-popup">
          <input
            name="firstName"
            className="filter-input"
            placeholder="First Name"
            value={filters.firstName || ""}
            onChange={handleChange}
          />
          <input
            name="lastName"
            className="filter-input"
            placeholder="Last Name"
            value={filters.lastName || ""}
            onChange={handleChange}
          />
          <input
            name="email"
            className="filter-input"
            placeholder="Email"
            value={filters.email || ""}
            onChange={handleChange}
          />
          <input
            name="department"
            className="filter-input"
            placeholder="Department"
            value={filters.department || ""}
            onChange={handleChange}
          />
          <button className="apply-btn">Apply</button>
        </div>
      )}
    </div>
  );
}

export default FilterPopup;
