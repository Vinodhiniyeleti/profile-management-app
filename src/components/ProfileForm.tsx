

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Stack, Typography, Paper, FormHelperText, InputAdornment } from '@mui/material';
import { saveProfile } from '../redux/profileSlice';
import type { RootState } from '../redux/store';

interface ProfileFormProps {
  mode: 'create' | 'edit';
}

export default function ProfileForm({ mode }: ProfileFormProps) {
  const reduxProfile = useSelector((state: RootState) => state.profile.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [ageError, setAgeError] = useState('');

  useEffect(() => {
    if (mode === 'edit' && reduxProfile) {
      setName(reduxProfile.name || '');
      setEmail(reduxProfile.email || '');
      setAge(reduxProfile.age || '');
    }
  }, [mode, reduxProfile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setNameError('');
    setEmailError('');
    setAgeError('');

    // Name validation (Required, min 3 characters)
    if (name.trim().length < 3) {
      setNameError('Name is required and must be at least 3 characters');
      return;
    }

    // Email validation (Required, valid format)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Age validation (Optional, but if provided, must be a valid number and at least 18 years old)
    if (age && (isNaN(Number(age)) || parseInt(age) < 18)) {
      setAgeError('Age must be a valid number and at least 18 years old');
      return;
    }

    // If no errors, save the profile
    dispatch(saveProfile({ name, email, age }));
    navigate('/profile');
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f7fb', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
      <Paper elevation={3} sx={{ p: 5, borderRadius: 4, width: '100%', maxWidth: 500 }}>
        <Typography variant="h5" fontWeight={700} textAlign="center" gutterBottom>
          {mode === 'edit' ? 'Edit Your Profile' : 'Create Your Profile'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3} mt={2}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              error={!!nameError}
            />
            {nameError && <FormHelperText error>{nameError}</FormHelperText>}

            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              error={!!emailError}
            />
            {emailError && <FormHelperText error>{emailError}</FormHelperText>}

            <TextField
              label="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
              error={!!ageError}
            />
            {ageError && <FormHelperText error>{ageError}</FormHelperText>}

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                borderRadius: 3,
                fontWeight: 600,
                textTransform: 'none',
                background: 'linear-gradient(to right, #6a11cb, #2575fc)',
              }}
            >
              {mode === 'edit' ? 'Update' : 'Save'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
