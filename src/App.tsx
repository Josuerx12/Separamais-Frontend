import { Route, Routes, Navigate } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import Login from "./pages/login";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import Cookies from "js-cookie";
import UsersAdminPanel from "./pages/admin/users";
import { RequestsPage } from "./pages/requests";
import { AlmoxPage } from "./pages/Almox";

const App = () => {
  const { user, getUser } = useAuth();
  const token = Cookies.get("refreshToken");
  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/admin/users" element={<UsersAdminPanel />} />
        <Route
          path="/"
          element={
            user ? <Navigate to="/requests" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/requests"
          element={user ? <RequestsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/almox/dashboard"
          element={user?.almox ? <AlmoxPage /> : <Navigate to="/requests" />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/requests" /> : <Login />}
        />
        {!user && <Route path="*" element={<Navigate to="/login" />} />}
        {user && <Route path="*" element={<Navigate to="/requests" />} />}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
