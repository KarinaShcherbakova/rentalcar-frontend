import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: JSON.parse(localStorage.getItem("favoriteCars")) || [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (!state.favorites.find(car => car.id === action.payload.id)) {
        state.favorites.push(action.payload);
        localStorage.setItem("favoriteCars", JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(car => car.id !== action.payload);
      localStorage.setItem("favoriteCars", JSON.stringify(state.favorites));
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;