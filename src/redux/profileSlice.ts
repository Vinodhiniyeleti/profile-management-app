
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Profile {
  name: string;
  email: string;
  age: string;
}

interface ProfileState {
  data: Profile | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  status: 'idle',
  error: null,
};


export const fetchProfileFromAPI = createAsyncThunk('profile/fetch', async () => {
  const cached = localStorage.getItem('profile');
  if (cached) return JSON.parse(cached);

  const response = await fetch('https://68259a2b0f0188d7e72d96d4.mockapi.io/api/v1/users/1');
  if (!response.ok) throw new Error('Failed to fetch profile');
  
  const data = await response.json();
  const profile: Profile = { name: data.name, email: data.email, age: data.age };
  localStorage.setItem('profile', JSON.stringify(profile));
  return profile;
});

export const saveProfileToAPI = createAsyncThunk('profile/save', async (profile: Profile) => {
  localStorage.setItem('profile', JSON.stringify(profile));
  const response = await fetch('https://68259a2b0f0188d7e72d96d4.mockapi.io/api/v1/users', {
    method: 'POST',
    body: JSON.stringify(profile),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to save profile');
  return profile;
});


export const updateProfileToAPI = createAsyncThunk('profile/update', async (profile: Profile) => {
  localStorage.setItem('profile', JSON.stringify(profile));
  const response = await fetch(`https://68259a2b0f0188d7e72d96d4.mockapi.io/api/v1/users`, {
    method: 'PUT',
    body: JSON.stringify(profile),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to update profile');
  return profile;
});

export const deleteProfileFromAPI = createAsyncThunk('profile/delete', async () => {
  const response = await fetch(`https://68259a2b0f0188d7e72d96d4.mockapi.io/api/v1/users/1`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete profile');
  localStorage.removeItem('profile');
  return null;
});

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile(state) {
      state.data = null;
      localStorage.removeItem('profile');
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchProfileFromAPI.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProfileFromAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchProfileFromAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch profile';
      })

      
      .addCase(saveProfileToAPI.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })

      
      .addCase(updateProfileToAPI.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })

      
      .addCase(deleteProfileFromAPI.fulfilled, (state) => {
        state.data = null;
        state.status = 'succeeded';
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
