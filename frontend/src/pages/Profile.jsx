import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getProfile,
  updateProfile,
  setRecoveryPasskey as updateRecoveryPasskey,
} from "../services/authService";

function Profile() {
  const [user, setUser] = useState(null);
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
  });
  const [recoveryPasskey, setRecoveryPasskey] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
        setProfileForm({
          name: profile.name,
          email: profile.email,
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      const updated = await updateProfile(profileForm);

      setUser(updated);

      const stored = JSON.parse(localStorage.getItem("user"));

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...stored,
          name: updated.name,
          email: updated.email,
        })
      );

      alert("Profile updated successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Profile update failed");
    }
  };

  const handleRecovery = async (e) => {
    e.preventDefault();

    try {
      const res = await updateRecoveryPasskey(recoveryPasskey);
      setRecoveryPasskey("");
      alert(res.message);
    } catch (err) {
      alert(err.response?.data?.message || "Recovery update failed");
    }
  };

  if (!user) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <div
        className="card"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
          marginBottom: 30,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "#2563eb",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 32,
              fontWeight: "bold",
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="profile-info">
            <h2 className="profile-name">{user.name}</h2>

            <div className="profile-meta">
              <div className="profile-email">
                <span>📧</span>
                <span>{user.email}</span>
              </div>

              <span className={`role-badge role-${user.role}`}>
                {user.role}
              </span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <h3>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</h3>
          <small>Account Type</small>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 25,
        }}
      >
        <div className="card">
          <h3 style={{ marginBottom: 20 }}>✏️ Edit Profile</h3>

          <form onSubmit={handleProfileSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={profileForm.name}
              onChange={(e) =>
                setProfileForm({
                  ...profileForm,
                  name: e.target.value,
                })
              }
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={profileForm.email}
              onChange={(e) =>
                setProfileForm({
                  ...profileForm,
                  email: e.target.value,
                })
              }
              required
            />

            <button type="submit">Save Changes</button>
          </form>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 20 }}>🔐 Recovery</h3>

          <form onSubmit={handleRecovery}>
            <input
              type="password"
              placeholder="Recovery Passkey"
              value={recoveryPasskey}
              onChange={(e) => setRecoveryPasskey(e.target.value)}
              required
            />

            <button type="submit">Save</button>
          </form>
        </div>
      </div>

      {user.role === "author" && (
        <div
          className="card"
          style={{
            marginTop: 30,
            borderLeft: "5px solid #2563eb",
          }}
        >
          <h3>✍️ Author Dashboard</h3>

          <p style={{ margin: "12px 0 20px" }}>
            Upload, edit and manage your published books from your dashboard.
          </p>

          <Link to="/author-dashboard">
            <button>Open Dashboard</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Profile;