import { createSlice } from "@reduxjs/toolkit";
import carsData from '../../data/cars-dataset.json'

const initialState = {
  carsData: carsData,
  filteredCarsData: [],
  count: 0, 
}

export const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    setFilteredCarsData: (state, action) => {
      state.filteredCarsData = action.payload; // Update filteredCarsData in Redux store
    },
  }
})

export const { increment, setFilteredCarsData } = carSlice.actions;

export default carSlice.reducer;