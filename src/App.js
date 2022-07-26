import './App.css';
import { lazy, Suspense } from 'react';
import { Task } from './components/views/Task/Task';

import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion';
import { Register } from './components/views/auth/Register/Register';
import { Login } from './components/views/auth/Login/Login';
import { Registered } from './components/views/Registered/Registered';

const Error404 = lazy(() => import('./components/views/Error404/Error404'))

const RequireAuth = ({ children }) => {
  if (!localStorage.getItem('logged')) {
    return <Navigate to="/login" replace={true} />
  }
  return children
}
const pageTransition = {
  in: { opacity: 1 },
  out: { opacity: 0 },
}

function App() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <RequireAuth>
              <motion.div 
                className='page' 
                initial="out" 
                animate="in" 
                exit="out" 
                variants={pageTransition}>
                <Task />
              </motion.div>
            </RequireAuth>
          } />

        <Route path="/registered/:teamID" element={<motion.div className='page' initial="out" animate="in" exit="out" variants={pageTransition}><Registered /></motion.div>} />
        <Route path="/register" element={<motion.div className='page' initial="out" animate="in" exit="out" variants={pageTransition}><Register /></motion.div>} />
        <Route path="/login" element={<motion.div className='page' initial="out" animate="in" exit="out" variants={pageTransition}><Login /></motion.div>} />
        <Route path="*" element={<motion.div className='page' initial="out" animate="in" exit="out" variants={pageTransition}>
          <Suspense fallback={<>Loading...</>}>
            <Error404 />
          </Suspense>
        </motion.div>} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
