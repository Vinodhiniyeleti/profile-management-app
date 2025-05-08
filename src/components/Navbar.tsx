import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Stack,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import PersonIcon from '@mui/icons-material/Person';

export default function Navbar() {
  const profile = useSelector((state: RootState) => state.profile.data);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position="static"
      sx={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: 3,
        px: 2,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight={700}>
          🚀 Profile Manager
        </Typography>

        {profile && (
          <Stack direction="row" spacing={2} alignItems="center">
            {!isMobile && (
              <Box textAlign="right">
                <Typography variant="body1" fontWeight={600}>
                  {profile.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {profile.email}
                </Typography>
              </Box>
            )}
            <Tooltip title="Your Profile">
              <IconButton size="small" sx={{ p: 0 }}>
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                    width: 40,
                    height: 40,
                  }}
                >
                  {profile.name?.charAt(0).toUpperCase() || <PersonIcon />}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}
