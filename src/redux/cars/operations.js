import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/constants";

export const fetchCars = createAsyncThunk("cars/fetchCars", async (filters, thunkAPI) => {
    try {
      console.log("Fetching cars with filters:", filters);
    const response = await axios.get(`${API_URL}/cars`, { params: filters });
      return response.data.cars;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });

export const fetchCarById = createAsyncThunk("cars/fetchCarById", async (carId, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/cars/${carId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});