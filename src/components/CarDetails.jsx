import React from "react";
import styles from "../styles/CarDetails.module.css";

const CarDetails = ({ car }) => {
  if (!car) {
    return <p>Loading...</p>;
  }

  console.log("Car data:", car);

  return (
    <div className={styles.details}>

      <div className={styles.info}>
      <h2 className={styles.title}>
  {car.brand} {car.model}, {car.year}
  <span className={styles.id} title={`Full ID: ${car.id}`}>
  Id: {car.id.slice(0, 4)}
</span>
</h2>

        <p className={styles.location}>
  <img src="/Location.svg" alt="Location" className={styles.icon} />
  <span>{car.address}</span>
  <span className={styles.mileage}>Mileage: {car.mileage.toLocaleString()} km</span>
</p>

        <p className={styles.price}>${car.rentalPrice}</p>
        <p className={styles.description}>{car.description}</p>


        <div className={styles.section}>
          <h3>Rental Conditions:</h3>
          <ul>
            {car.rentalConditions?.map((condition, index) => (
              <li key={index}>
                <img src="/check-circle.svg" alt="Check" className={styles.icon} />
                {condition}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Car Specifications:</h3>
          <p>
          <img src="/calendar.svg" alt="Calendar" className={styles.icon} />
          Year: {car.yea}
        </p>
          <p>
            <img src="/car.svg" alt="Car type" className={styles.icon} />
            Type: {car.type}
          </p>
          <p>
            <img src="/fuel-pump.svg" alt="Fuel" className={styles.icon} />
            Fuel Consumption: {car.fuelConsumption}
          </p>
          <p>
            <img src="/gear.svg" alt="Engine" className={styles.icon} />
            Engine Size: {car.engineSize}
          </p>
        </div>

        <div className={styles.section}>
          <h3>Accessories and functionalities:</h3>
          <ul>
            {car.accessories.map((accessory, index) => (
              <li key={index}>
                <img src="/check-circle.svg" alt="Check" className={styles.icon} />
                {accessory}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;