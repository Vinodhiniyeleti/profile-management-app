
import { createSlice } from '@reduxjs/toolkit';

interface ProfileState {
  data: {
    name: string;
    email: string;
    age: string;
  } | null;
}

const initialState: ProfileState = {
  data: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    saveProfile(state, action) {
      state.data = action.payload;
    },
    deleteProfile(state) {
      state.data = null;
    },
  },
});

export const { saveProfile, deleteProfile } = profileSlice.actions;
export default profileSlice.reducer;
