import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    setUser(storedUser);
  }, [location]);

  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";
  const isAuthor = user?.role === "author";

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header>
      <nav className="navbar">
        <Link to="/">Home</Link>

        <Link to="/search">
          Search
        </Link>

        {isLoggedIn ? (
          <>
            <Link to="/profile">
              Profile
            </Link>

            {isAuthor && (
              <Link to="/author-dashboard">
                Author Dashboard
              </Link>
            )}

            {isAdmin && (
              <Link to="/admin">
                Admin Panel
              </Link>
            )}

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;