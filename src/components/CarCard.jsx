import React from "react";
import styles from "../styles/CarCard.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/favorites/favoritesSlice";

const formatMileage = (mileage) => {
  return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const CarCard = ({ car }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const isFavorite = favorites.some((fav) => fav.id === car.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(car.id));
    } else {
      dispatch(addFavorite(car));
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={car.img} alt={`${car.brand} ${car.model}`} className={styles.image} />
        <button onClick={handleFavoriteClick} className={styles.favoriteBtn}>
          <img
            src={isFavorite ? "/favorite-active.svg" : "/favorite-default.svg"}
            alt="Favorite"
          />
        </button>
      </div>
      <div className={styles.info}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>
            {car.brand} <span className={styles.model}>{car.model}, {car.year}</span>
          </h3>
          <p className={styles.price}>${car.rentalPrice}</p>
        </div>
        <div className={styles.detailsWrapper}>
        <p className={styles.details}>
          {car.address} | {car.type}
        </p>
        <p className={styles.details}>
          SUV | {formatMileage(car.mileage)} km
        </p>
        </div>
        <Link to={`/catalog/${car.id}`} className={styles.readMore}>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default CarCard;