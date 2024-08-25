import { createSlice } from '@reduxjs/toolkit';
import data from './data.json'; // Import the JSON data

const initialState = {
  categories: data.categories,
  searchTerm: '', // Add searchTerm to the initial state
};

const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets.push(widget);
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    }
  }
});

export const { addWidget, removeWidget, setSearchTerm } = widgetSlice.actions;
export default widgetSlice.reducer;
