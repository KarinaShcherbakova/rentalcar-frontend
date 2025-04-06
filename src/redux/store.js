import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favorites/favoritesSlice";
import carsReducer from "./cars/carsSlice";
import filtersReducer from "./filters/filtersSlice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    favorites: favoritesReducer,
    filters: filtersReducer,
  },
});