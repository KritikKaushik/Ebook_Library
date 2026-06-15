import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
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