import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/authSice.jsx'
import profilReducer from './Slice/profileSlice.jsx'

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    profile:profilReducer,

  },
});

export default store
