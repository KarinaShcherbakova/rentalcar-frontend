import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFilters } from "../redux/filters/filtersSlice";
import styles from "../styles/FilterBar.module.css";
import axios from "axios";
import { API_URL } from "../constants/constants";

const FilterBar = () => {
  const dispatch = useDispatch();
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([]); 
  const [price, setPrice] = useState("");
  const [prices, setPrices] = useState([]); 
  const [mileageFrom, setMileageFrom] = useState("");
  const [mileageTo, setMileageTo] = useState("");
  const [brandOpen, setBrandOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  const formatNumber = (value) => {
    return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : "";
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`${API_URL}/brands`);
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(`${API_URL}/cars?limit=100`);
        const allPrices = response.data.cars.map(car => parseInt(car.rentalPrice, 10));
        const uniquePrices = [...new Set(allPrices)]
          .filter(price => price >= 10 && price <= 80)
          .sort((a, b) => a - b); 
        setPrices(uniquePrices);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };
    fetchPrices();
  }, []);

  const handleMileageChange = (setter, prefix) => (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setter(rawValue ? `${prefix} ${formatNumber(rawValue)}` : prefix);
  };

  const getPriceLabel = () => {
    return price ? `$${price}` : "Choose a price";
  };

  const handleSearch = () => {
    const formattedMileageFrom = mileageFrom.replace(/\D/g, "");
    const formattedMileageTo = mileageTo.replace(/\D/g, "");
  
    const filters = {
      brand: brand && brand !== "Choose a brand" ? brand : undefined,
      rentalPrice: price && price !== "Choose a price" ? price : undefined,
      mileage: {
        from: formattedMileageFrom || undefined,
        to: formattedMileageTo || undefined,
      },
    };
  
    console.log("Filters before dispatch:", filters);
  
    dispatch(setFilters(filters));
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterGroup}>
        <label className={styles.label}>Car brand</label>
        <div className={styles.selectWrapper} onClick={() => setBrandOpen(!brandOpen)}>
          <div className={styles.customSelect}>
            {brand || "Choose a brand"}
            <img src={brandOpen ? "/open-active.svg" : "/to-close-default.svg"} alt="Dropdown Icon" className={styles.icon} />
          </div>
          {brandOpen && (
            <ul className={styles.customDropdown}>
              {brands.map((option) => (
                <li key={option} onClick={() => { setBrand(option); setBrandOpen(false); }}>{option}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Price / 1 hour</label>
        <div className={styles.selectWrapper} onClick={() => setPriceOpen(!priceOpen)}>
          <div className={styles.customSelect}>
            {getPriceLabel()}
            <img src={priceOpen ? "/open-active.svg" : "/to-close-default.svg"} alt="Dropdown Icon" className={styles.icon} />
          </div>
          {priceOpen && (
            <ul className={styles.customDropdown}>
              {prices.map((option) => (
                <li key={option} onClick={() => { setPrice(option.toString()); setPriceOpen(false); }}>
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Car mileage / km</label>
        <div className={styles.mileageInputs}>
          <input
            type="text"
            placeholder="From"
            value={mileageFrom.replace(/^From\s*/, "") ? mileageFrom : ""}
            onChange={handleMileageChange(setMileageFrom, "From")}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="To"
            value={mileageTo.replace(/^To\s*/, "") ? mileageTo : ""}
            onChange={handleMileageChange(setMileageTo, "To")}
            className={styles.input}
          />
        </div>
      </div>

      <button onClick={handleSearch} className={styles.searchButton}>
        Search
      </button>
    </div>
  );
};

export default FilterBar;