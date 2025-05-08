
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setProfile } from '../redux/profileSlice';
import {
  Button,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Avatar,
  Stack,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import type { ProfileData } from '../types/profileTypes';

const ProfileForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileData>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [message, setMessage] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const onSubmit = async (data: ProfileData) => {
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', data);

      if (response.status === 201 || response.status === 200) {
        dispatch(setProfile(data));
        setMessage('Profile updated successfully!');
        setTimeout(() => navigate('/profile'), 1200);
      }
    } catch (error) {
      setMessage('❌ Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 2,
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 500, boxShadow: 10, borderRadius: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack direction="column" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: '#ffffff', width: 64, height: 64 }}>
              <PersonIcon fontSize="large" color="primary" />
            </Avatar>
            <Typography variant="h5" fontWeight={600}>
              Complete Your Profile
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Fill in your details below to create your account profile.
            </Typography>
          </Stack>

          <Divider sx={{ my: 3 }} />

          {message && (
            <Typography
              sx={{ mb: 2 }}
              align="center"
              color={message.includes('❌') ? 'error' : 'success.main'}
            >
              {message}
            </Typography>
          )}

          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 3, message: 'At least 3 characters' },
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                  message: 'Invalid email format',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Age (Optional)"
              variant="outlined"
              fullWidth
              type="number"
              margin="normal"
              {...register('age', {
                valueAsNumber: true,
                validate: value =>
                  value === undefined || (value >= 0 && value <= 120) || 'Age must be between 0 and 120',
              })}
              error={!!errors.age}
              helperText={errors.age ? errors.age.message : ''}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                borderRadius: 2,
                py: 1.5,
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                '&:hover': {
                  background: 'linear-gradient(90deg, #5a67d8 0%, #6b46c1 100%)',
                },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Save & Continue'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileForm;
