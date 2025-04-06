import React, { useState } from "react";
import styles from "../styles/BookingForm.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be valid"),
  date: yup
    .date()
    .required("Booking date is required")
    .min(
      new Date(new Date().setDate(new Date().getDate() + 1)),
      "Booking date must be from tomorrow"
    ),
  comment: yup.string().max(500, "Коментар надто довгий").nullable(),
});

const BookingForm = () => {
  const [statusMessage, setStatusMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      date: data.date ? data.date.toISOString().split("T")[0] : "",
      comment: data.comment || "", 
    };

    setStatusMessage("✅ Your booking has been successfully submitted!");

    setTimeout(() => {
      setStatusMessage("");
    }, 3000);

    console.log("Збережені дані:", formattedData);
    reset();
  };

  return (
    <div className={styles.formContainer}>
      <h3>Book your car now</h3>
      <p>Stay connected! We are always ready to help you.</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <input
          type="text"
          placeholder="Name*"
          {...register("name")}
          className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Email*"
          {...register("email")}
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <DatePicker
              placeholderText="Booking date"
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              className={`${styles.input} ${errors.date ? styles.inputError : ""}`}
              dateFormat="dd-MM-yyyy"
              minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
            />
          )}
        />
        {errors.date && <p className={styles.error}>{errors.date.message}</p>}

        <textarea
          placeholder="Comment"
          {...register("comment")}
          className={`${styles.textarea} ${errors.comment ? styles.inputError : ""}`}
        />
        {errors.comment && <p className={styles.error}>{errors.comment.message}</p>}

        <button type="submit" className={styles.button} disabled={!isValid}>
          Submit
        </button>

        {statusMessage && (
          <p className={statusMessage.startsWith("✅") ? styles.success : styles.error}>
            {statusMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default BookingForm;