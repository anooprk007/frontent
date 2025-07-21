import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RoomList from "./pages/RoomList";
import RoomDetail from "./pages/RoomDetail";
import BookingPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./components/PrivateRoute";
import DashboardPage from "./pages/DashboardPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access")
  );

  useEffect(() => {
    const token = localStorage.getItem("access");
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<RoomList />} />
            <Route path="/rooms/:id" element={<RoomDetail />} />
            <Route
              path="/booking/:roomId"
              element={
                <PrivateRoute>
                  <BookingPage />
                </PrivateRoute>

              }
            />
            <Route path="/payment/:roomId" element={<PaymentPage />} />
            <Route
              path="/signup"
              element={<SignupPage setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/login"
              element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
