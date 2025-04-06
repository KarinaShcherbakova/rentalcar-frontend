import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCarById } from "../redux/cars/operations";
import { selectSelectedCar, selectLoading, selectError } from "../redux/cars/selectors";
import Header from "../components/Header";
import CarDetails from "../components/CarDetails";
import BookingForm from "../components/BookingForm";
import styles from "../styles/CarDetailsPage.module.css";

const CarDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const car = useSelector(selectSelectedCar);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [id, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!car) return <p>Car not found</p>;

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          {car.img && (
            <img
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              className={styles.image}
            />
          )}
          <BookingForm />
        </div>
        <div className={styles.rightColumn}>
          <CarDetails car={car} />
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;