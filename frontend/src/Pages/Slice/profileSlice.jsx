// profileSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    username: '',
    email: '',
    phone_no: '',
    profile_img: '',
  },
  reducers: {
    setProfile: (state, action) => {
      const { username, email, phone_no, profile_img } = action.payload;
      state.username = username;
      state.email = email;
      state.phone_no = phone_no;
      state.profile_img = profile_img;
    },
    clearProfile: (state) => {
      state.username = '';
      state.email = '';
      state.phone_no = '';
      state.profile_img = '';
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
