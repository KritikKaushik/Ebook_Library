// src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookDetails from "./pages/BookDetails";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import AdminPanel from "./pages/AdminPanel";
import Recovery from "./pages/Recovery";
import AccessDenied from "./pages/AccessDenied";
import AuthorDashboard from "./pages/AuthorDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/recovery" element={<Recovery />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route path="/search" element={<Search />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />

            <Route
              path="/book/:id"
              element={<BookDetails />}
            />

            <Route
              path="/author-dashboard"
              element={<AuthorDashboard />}
            />

            <Route
              path="/access-denied"
              element={<AccessDenied />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;