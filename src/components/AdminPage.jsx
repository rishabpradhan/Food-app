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

  const allRecipes = useQuery(api.queries.getUserRecipes.getUserRecipes);
  const totalRecipes =
    allRecipes?.filter((recipe) => recipe.userEmail !== "admin@gmail.com")
      .length || 0;

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
      fetchAllUsers(); // Refresh user list
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
    <div className="admin-page p-6 max-w-6xl mx-auto">
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
            <div className="mb-2">
              <strong>Total Recipes:</strong> {totalRecipes}
            </div>
          </>
        )}
      </div>

      <div className="users bg-white shadow rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          All Users & Their Recipes
        </h2>
        {loadingUsers ? (
          <p>Loading users...</p>
        ) : errorUsers ? (
          <p className="text-red-500">{errorUsers}</p>
        ) : users.length > 0 ? (
          users.map((user) => {
            // Don't show recipes created by admin
            const userRecipes =
              user.email !== "admin@gmail.com"
                ? allRecipes?.filter((r) => r.userId === user._id) || []
                : [];

            return (
              <div key={user._id} className="border p-4 mb-4 rounded shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <p>
                      <strong>
                        {user.firstName} {user.lastName}
                      </strong>
                    </p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  {user.email !== "admin@gmail.com" && (
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  )}
                </div>

                {userRecipes.length > 0 ? (
                  <div className="mt-4">
                    <p className="font-semibold">Recipes:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                      {userRecipes.map((recipe) => (
                        <div key={recipe._id} className="border rounded p-3">
                          {recipe.image && (
                            <img
                              src={recipe.image}
                              alt={recipe.title}
                              className="w-full h-40 object-cover rounded"
                            />
                          )}

                          {recipe.videoUrl && (
                            <div className="relative pb-[56.25%] h-0 mb-3 mt-2">
                              <iframe
                                src={recipe.videoUrl}
                                title={recipe.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute top-0 left-0 w-full h-full rounded"
                              />
                            </div>
                          )}

                          <h3 className="font-bold mt-2">{recipe.title}</h3>
                          <p className="text-sm text-gray-700">
                            {recipe.instruction?.slice(0, 100)}...
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Type: {recipe._type}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : user.email !== "admin@gmail.com" ? (
                  <p className="text-sm text-gray-500 mt-2">
                    No recipes found.
                  </p>
                ) : null}
              </div>
            );
          })
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
