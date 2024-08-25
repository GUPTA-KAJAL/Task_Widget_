import { configureStore } from '@reduxjs/toolkit';
import widgetReducer from './widgetSlice';

const store = configureStore({
  reducer: {
    widgets: widgetReducer,
  },
});

export default store;
