import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import BookmarksPage from './Pages/BookmarksPage';
import { useEffect, useState } from 'react';
import { supabase } from './auth/supabaseClient';
import Navbar from './components/Navbar';

export default function App() {
  const [session, setSession] = useState(null);

  
    // Check if a session exists on app load
useEffect(() => {
  const getValidSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      const { data: userData, error } = await supabase.auth.getUser();
      if (!error && userData?.user?.email_confirmed_at) {
        setSession(session); // Only set session if email is confirmed
      } else {
        setSession(null);
      }
    } else {
      setSession(null);
    }
  };

  getValidSession();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    if (session) {
      supabase.auth.getUser().then(({ data, error }) => {
        if (!error && data.user?.email_confirmed_at) {
          setSession(session);
        } else {
          setSession(null);
        }
      });
    } else {
      setSession(null);
    }
  });

  return () => subscription.unsubscribe();
}, []);


  return (
    <div>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            session ? <Navigate to="/bookmarks" replace /> : <LoginPage />
          }
        />
        <Route
          path="/bookmarks"
          element={
            session ? <BookmarksPage /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </BrowserRouter>
    </div>
  );
}
