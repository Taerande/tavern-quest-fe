import React, {Suspense, useEffect} from 'react';

import { Route, Navigate, Routes, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import Snackbar from './components/ui/SnackBar/Snackbar';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBlizzardAccessToken } from 'api/partyApi';
import { getLaravelAuth } from 'store/auth-actions';
import { Divider } from '@mui/material';
import SocialLogin from 'pages/auth/SocialLogin';


// Lazy loading
const User = React.lazy(() => import('./pages/user/User'));
const ScheduleRoutes = React.lazy(() => import('./pages/games/worldofwarcraft/ScheduleRoutes'));
const MercenariesWOW = React.lazy(() => import('./pages/games/worldofwarcraft/MercenariesWOW'));
const RegisterNewMercenary = React.lazy(() => import('./pages/games/worldofwarcraft/RegisterNewMercenary'));
const Home = React.lazy(() => import('./pages/Home'));
const SignIn = React.lazy(() => import('./pages/SignIn'));
function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  },[location])
  useEffect(() => {
    dispatch(getLaravelAuth());
    getBlizzardAccessToken();
  }, [dispatch]);
  const showSnackbar = useSelector(state => state.ui.snackbar.snackbarIsShow);
  const isAuthenticated = useSelector(state => state.auth.isLogin);
  return (
    <>
      <Header />
      <Divider style={{marginBottom:'30px'}} />
      <main>
        {showSnackbar && <Snackbar/>}
        <Suspense fallback={<LoadingSpinner color='primary' />}>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/user/*' element={isAuthenticated ? <User/> : <Navigate replace to='/' />}/>
            <Route path='/worldofwarcraft/schedule/*' element={<ScheduleRoutes/>}/>
             <Route path='/worldofwarcraft/mercenary/register' element={<RegisterNewMercenary/>}/>
            <Route path='/worldofwarcraft/mercenary' element={<MercenariesWOW/>}/>
            {!isAuthenticated && <Route path='/signin' element={<SignIn />} />}
            <Route path='/worldofwarcraft/mercenary' element={<MercenariesWOW />} />
            <Route path='/login/:provider' element={<SocialLogin />} />
            <Route
              path="*"
              element={<Navigate replace to="/" />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
