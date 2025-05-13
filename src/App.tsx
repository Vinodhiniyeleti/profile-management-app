
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProfileForm from './components/ProfileForm';
import ProfileDisplay from './components/ProfileDisplay';
import NotFound from './components/NotFound';
import { Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <Navigate to="/profile" />
      </>
    ),
  },
  {
    path: '/profile-form',
    element: (
      <>
        <Navbar />
        <ProfileForm mode="create" />
      </>
    ),
  },
  {
    path: '/profile-form/edit',
    element: (
      <>
        <Navbar />
        <ProfileForm mode="edit" />
      </>
    ),
  },
  {
    path: '/profile',
    element: (
      <>
        <Navbar />
        <ProfileDisplay />
      </>
    ),
  },
  {
    path: '/404',
    element: (
      <>
        <Navbar />
        <NotFound />
      </>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
