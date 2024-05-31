import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/authSice.jsx'
import profilReducer from './Slice/profileSlice.jsx'
import userReducer from './Slice/userSlice.jsx';

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    profile:profilReducer,
    admin:userReducer,

  },
});

export default store
