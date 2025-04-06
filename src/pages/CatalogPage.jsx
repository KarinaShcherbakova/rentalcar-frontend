import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCars } from "../redux/cars/carsSlice";
import { fetchCars } from "../redux/cars/operations";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import CarCard from "../components/CarCard";
import Spinner from "../components/Spinner";
import styles from "../styles/CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.cars);
  const filters = useSelector((state) => state.filters);
  
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    loadCars();
  }, [filters, page]);

  const loadCars = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const params = {
        page,
        limit: 8,
        brand: filters.brand || undefined,
        rentalPrice: filters.rentalPrice || undefined,
        minMileage: filters.mileage?.from || undefined,
        maxMileage: filters.mileage?.to || undefined,
      };

      const resultAction = await dispatch(fetchCars(params));

      if (fetchCars.fulfilled.match(resultAction)) {
        const fetchedCars = resultAction.payload;

        if (page === 1) {
          dispatch(setCars(fetchedCars));
        } else {
          dispatch(setCars([...cars, ...fetchedCars]));
        }

        setHasMore(fetchedCars.length === 8); 
      } else {
        console.error("Error fetching cars:", resultAction.error.message);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <FilterBar />
      <div className={styles.carsContainer}>
        {cars.length > 0 ? (
          cars.map((car) => <CarCard key={car.id} car={car} />)
        ) : (
          <p>No cars found</p>
        )}
      </div>
      {loading && <Spinner />}
      {!loading && hasMore && (
        <button className={styles.loadMore} onClick={() => setPage((prev) => prev + 1)}>
          Load more
        </button>
      )}
    </div>
  );
};

export default CatalogPage;