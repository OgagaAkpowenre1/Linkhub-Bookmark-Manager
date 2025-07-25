import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import BookmarksPage from "./Pages/BookmarksPage";
import { useEffect, useState } from "react";
import { supabase } from "./auth/supabaseClient";
import Navbar from "./components/Navbar";

export default function App() {
  const [session, setSession] = useState(null);
  // const navigate = useNavigate();

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    // navigate("/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <BrowserRouter>
        {/* <div className="min-h-screen bg-gray-50 flex flex-col"> */}
          
            <Navbar onLogout={handleLogout} email={session?.user?.email} />
          
          <div className="flex-1 overflow-y-auto">
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
          </div>
        {/* </div> */}
      </BrowserRouter>
    </div>
  );
}
