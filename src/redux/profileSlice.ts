import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'; 

export interface ProfileData {
  name: string;
  email: string;
  age?: number;
}

interface ProfileState {
  data: ProfileData | null;
}

const initialState: ProfileState = {
  data: JSON.parse(localStorage.getItem('profile') || 'null'),
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<ProfileData>) {
      state.data = action.payload;
      localStorage.setItem('profile', JSON.stringify(action.payload));
    },
    deleteProfile(state) {
      state.data = null;
      localStorage.removeItem('profile');
    },
  },
});

export const { setProfile, deleteProfile } = profileSlice.actions;
export default profileSlice.reducer;
