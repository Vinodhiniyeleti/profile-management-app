
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProfileFromAPI } from '../redux/profileSlice';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import type { RootState } from '../redux/store';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { deleteProfileFromAPI } from '../redux/profileSlice';


export default function ProfileDisplay() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.profile.data);
  const theme = useTheme();

  

  useEffect(() => {
    dispatch(fetchProfileFromAPI());
  }, [dispatch]);

  const gradientBackground = 'linear-gradient(to right, #6a11cb, #2575fc)';

  if (!profile) {
    return (
      <Box sx={{ minHeight: '100vh', background: gradientBackground, py: 10 }}>
        <Container>
          <Box textAlign="center" color="white">
            <Typography variant="h4" fontWeight={700} gutterBottom>
              No Profile Found
            </Typography>
            <Typography variant="body1" mb={3}>
              Let's get started by creating your profile.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#ffffff',
                color: '#6a11cb',
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
              onClick={() => navigate('/profile-form')}
            >
              Create Profile
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: gradientBackground, py: 10 }}>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          sx={{
            width: '100%',
            maxWidth: 600,
            borderRadius: 4,
            boxShadow: 15,
            background: '#fff',
            p: 4,
          }}
        >
          <CardContent>
            <Stack spacing={4} alignItems="center">
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                  width: 96,
                  height: 96,
                  fontSize: 36,
                  boxShadow: 3,
                }}
              >
                {profile!.name?.charAt(0).toUpperCase() || <PersonIcon />}
              </Avatar>

              <Box textAlign="center">
                <Typography variant="h5" fontWeight={600}>
                  {profile!.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {profile!.email}
                </Typography>
              </Box>

              <Divider sx={{ width: '100%', my: 2 }} />

              <Stack spacing={2} width="100%">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <EmailIcon color="action" />
                  <Typography variant="body1">
                    <strong>Email:</strong> {profile!.email}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CakeIcon color="action" />
                  <Typography variant="body1">
                    <strong>Age:</strong> {profile!.age || 'N/A'}
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={2} mt={3} justifyContent="center">
                <Button
                  startIcon={<EditOutlinedIcon />}
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    textTransform: 'none',
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: '#f0f0ff',
                    },
                  }}
                  onClick={() => navigate('/profile-form/edit')}
                >
                  Edit
                </Button>
                <Button
                  startIcon={<DeleteOutlineOutlinedIcon />}
                  variant="contained"
                  color="error"
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: '#f44336',
                    },
                  }}
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this profile?')) {
                      dispatch(deleteProfileFromAPI());

                      navigate('/profile-form');
                    }
                  }}
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}