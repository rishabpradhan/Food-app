import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "convex/react";
import { api } from "../../recipes/convex/_generated/api";

const AdminPage = () => {
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [errorStats, setErrorStats] = useState(null);

  // const totalRecipes = useQuery(api.queries.getUserRecipes.getUserRecipes, {});
  // const recipesCount =
  //   typeof totalRecipes === "number"
  //     ? totalRecipes
  //     : (totalRecipes?.length ?? "Loading...");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      navigate("/AdminLogin");
    } else {
      fetchUserStats();
      fetchAllUsers();
    }
  }, [navigate]);

  const fetchUserStats = async () => {
    setLoadingStats(true);
    try {
      const res = await axios.get("http://localhost:3000/admin/userstats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserStats(res.data.totalUsers);
      setErrorStats(null);
    } catch (error) {
      console.error("Failed to fetch user stats", error);
      setErrorStats("Failed to fetch user stats.");
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchAllUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await axios.get("http://localhost:3000/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(res.data);
      console.log("Fetched users:", res.data);
      setErrorUsers(null);
    } catch (error) {
      console.error("Failed to fetch users", error);
      setErrorUsers("Failed to fetch users.");
    } finally {
      setLoadingUsers(false);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchAllUsers(); // Refresh list
    } catch (error) {
      console.error("Failed to delete user", error);
      alert("Error deleting user.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/AdminLogin");
  };

  return (
    <div className="admin-page p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="stats bg-gray-100 rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Statistics</h2>
        {loadingStats ? (
          <p>Loading statistics...</p>
        ) : errorStats ? (
          <p className="text-red-500">{errorStats}</p>
        ) : (
          <>
            <div className="mb-2">
              <strong>Total Users:</strong> {userStats}
            </div>
            <div>
              <strong>Total Recipes:</strong>
            </div>
          </>
        )}
      </div>

      <div className="users bg-white shadow rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">All Users</h2>
        {loadingUsers ? (
          <p>Loading users...</p>
        ) : errorUsers ? (
          <p className="text-red-500">{errorUsers}</p>
        ) : users.length > 0 ? (
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user._id}
                className="flex justify-between items-center border p-3 rounded"
              >
                <div>
                  <p>
                    <strong>
                      {user.firstName} {user.lastName}
                    </strong>
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>

      <div className="actions">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
