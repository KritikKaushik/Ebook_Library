import { Link } from "react-router-dom";

function AccessDenied() {
  return (
    <div className="container">
      <h2>Access Denied</h2>

      <p>
        You do not have permission to view this page.
      </p>

      <Link to="/">Return Home</Link>
    </div>
  );
}

export default AccessDenied;