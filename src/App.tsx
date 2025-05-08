// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import ProfileForm from './components/ProfileForm';
// import ProfileDisplay from './components/ProfileDisplay';
// import NotFound from './components/NotFound';

// export default function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Navigate to="/profile-form" />} />
//         <Route path="/profile-form" element={<ProfileForm />} />
//         <Route path="/profile" element={<ProfileDisplay />} />
//         <Route path="/404" element={<NotFound />} />
//         <Route path="*" element={<Navigate to="/404" />} />
//       </Routes>
//     </Router>
//   );
// }
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProfileForm from './components/ProfileForm';
import ProfileDisplay from './components/ProfileDisplay';
import NotFound from './components/NotFound';
import { Navigate } from 'react-router-dom';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <Navigate to="/profile-form" />
        </>
      ),
    },
    {
      path: '/profile-form',
      element: (
        <>
          <Navbar />
          <ProfileForm />
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
  ]
);

export default function App() {
  return <RouterProvider router={router} />;
}
