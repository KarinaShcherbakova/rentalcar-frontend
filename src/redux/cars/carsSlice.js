import { createSlice } from "@reduxjs/toolkit";
import { fetchCars, fetchCarById } from "./operations";

const initialState = {
  cars: [],
  selectedCar: null,
  loading: false,
  error: null,
  filters: {
    brand: null,
    price: null,
    mileage: { from: null, to: null },
  },
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setCars: (state, action) => {
      state.cars = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCar = action.payload;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, setCars } = carsSlice.actions;
export default carsSlice.reducer;