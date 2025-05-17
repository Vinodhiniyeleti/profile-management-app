
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  TextField, Button, Box, Stack, Typography, Paper,
  FormHelperText,
} from '@mui/material';
import type { RootState, AppDispatch } from '../redux/store';
import {
  saveProfileToAPI,
  fetchProfileFromAPI,
} from '../redux/profileSlice';

interface ProfileFormProps {
  mode: 'create' | 'edit';
}

export default function ProfileForm({ mode }: ProfileFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.profile.data);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [ageError, setAgeError] = useState('');

  useEffect(() => {
    dispatch(fetchProfileFromAPI());
  }, [dispatch]);

  useEffect(() => {
    if (mode === 'edit' && profile) {
      setName(profile.name);
      setEmail(profile.email);
      setAge(profile.age);
    }
  }, [profile, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setNameError('');
    setEmailError('');
    setAgeError('');

    if (name.trim().length < 3) {
      setNameError('Name must be at least 3 characters');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Enter a valid email');
      return;
    }

    if (!age || isNaN(+age) || +age < 18) {
      setAgeError('Enter a valid age (18+)');
      return;
    }

    const newProfile = { name, email, age };
    dispatch(saveProfileToAPI(newProfile));
    navigate('/profile');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2 }}>
      <Paper elevation={3} sx={{ p: 5, borderRadius: 4, width: '100%', maxWidth: 500 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          {mode === 'edit' ? 'Edit Your Profile' : 'Create Your Profile'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3} mt={2}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!nameError}
              fullWidth
            />
            {nameError && <FormHelperText error>{nameError}</FormHelperText>}
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              fullWidth
            />
            {emailError && <FormHelperText error>{emailError}</FormHelperText>}
            <TextField
              label="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              error={!!ageError}
              fullWidth
            />
            {ageError && <FormHelperText error>{ageError}</FormHelperText>}
            <Button type="submit" variant="contained" size="large">
              {mode === 'edit' ? 'Update' : 'Save'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}