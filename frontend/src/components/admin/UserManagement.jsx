import { useState } from "react";
import {
  updateUser,
  deleteUser,
} from "../../services/adminService";

function UserManagement({
  users,
  setUsers,
  stats,
  setStats,
}) {
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  const handleUpdate = async () => {
    try {
      const updated = await updateUser(
        editingUser._id,
        formData
      );

      setUsers(
        users.map((user) =>
          user._id === updated._id ? updated : user
        )
      );

      setEditingUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);

      setUsers(users.filter((u) => u._id !== id));

      setStats((prev) => ({
        ...prev,
        users: prev.users - 1,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-section">
      <div className="card">
        <div className="admin-header">
          <h2>👥 User Management</h2>

          <input
            type="text"
            className="admin-search"
            placeholder="🔍 Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th style={{ width: 180 }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td><strong>{user.name}</strong></td>

                <td>{user.email}</td>

                <td>
                  {user.role === "admin" && "🛡️ Admin"}
                  {user.role === "author" && "✍️ Author"}
                  {user.role === "reader" && "📖 Reader"}
                </td>

                <td>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => handleEdit(user)}>
                      ✏️ Edit
                    </button>

                    <button
                      style={{ background: "#dc2626" }}
                      onClick={() => handleDelete(user._id)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingUser && (
          <div className="card" style={{ marginTop: 30 }}>
            <h3 style={{ marginBottom: 20 }}>
              ✏️ Edit User
            </h3>

            <div className="edit-box">
              <input
                value={formData.name}
                placeholder="Name"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />

              <input
                value={formData.email}
                placeholder="Email"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />

              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value,
                  })
                }
              >
                <option value="reader">📖 Reader</option>
                <option value="author">✍️ Author</option>
                <option value="admin">🛡️ Admin</option>
              </select>

              <div
                style={{
                  display: "flex",
                  gap: 15,
                  marginTop: 20,
                }}
              >
                <button
                  style={{
                    flex: 1,
                    background: "#2563eb",
                  }}
                  onClick={handleUpdate}
                >
                  💾 Save Changes
                </button>

                <button
                  style={{
                    flex: 1,
                    background: "#6b7280",
                  }}
                  onClick={() => setEditingUser(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserManagement;