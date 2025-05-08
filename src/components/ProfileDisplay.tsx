
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
  
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProfile } from '../redux/profileSlice';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import type { RootState } from '../redux/store';

export default function ProfileDisplay() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.profile.data);

  const gradientBackground = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

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
              size="large"
              sx={{
                backgroundColor: '#ffffff',
                color: '#764ba2',
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
            borderRadius: 6,
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
            backgroundColor: '#ffffffee', // semi-transparent white for contrast
            backdropFilter: 'blur(10px)', // soft glass effect
            p: 4,
          }}
        >
          <CardContent>
            <Stack spacing={4} alignItems="center">
              <Avatar
                sx={{
                  bgcolor: '#764ba2',
                  width: 100,
                  height: 100,
                  fontSize: 40,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}
              >
                {profile.name?.charAt(0).toUpperCase() || <PersonIcon fontSize="large" />}
              </Avatar>

              <Box textAlign="center">
                <Typography variant="h5" fontWeight={700}>
                  {profile.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {profile.email}
                </Typography>
              </Box>

              <Divider sx={{ width: '100%' }} />

              <Stack spacing={2} width="100%">
                <Box display="flex" alignItems="center" gap={2}>
                  <EmailIcon color="action" />
                  <Typography variant="body1">
                    <strong>Email:</strong> {profile.email}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <CakeIcon color="action" />
                  <Typography variant="body1">
                    <strong>Age:</strong> {profile.age || 'N/A'}
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={3} mt={4}>
                <Button
                  startIcon={<EditOutlinedIcon />}
                  variant="outlined"
                  size="large"
                  sx={{
                    textTransform: 'none',
                    borderRadius: 3,
                    px: 3,
                    fontWeight: 600,
                    color: '#764ba2',
                    borderColor: '#764ba2',
                    '&:hover': {
                      backgroundColor: '#f0e6ff',
                    },
                  }}
                  onClick={() => navigate('/profile-form')}
                >
                  Edit
                </Button>

                <Button
                  startIcon={<DeleteOutlineOutlinedIcon />}
                  variant="contained"
                  color="error"
                  size="large"
                  sx={{
                    textTransform: 'none',
                    borderRadius: 3,
                    px: 3,
                    fontWeight: 600,
                  }}
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this profile?')) {
                      dispatch(deleteProfile());
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
