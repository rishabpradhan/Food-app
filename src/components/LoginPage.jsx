import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const initial = { email: "", password: "" };
  const [query, setQuery] = useState(initial);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery({
      ...query,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!query.email || !query.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        query,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("username", response.data.firstname);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen overflow-x-hidden">
      <h1 className="text-3xl font-bold font-sans mb-8">Login</h1>
      <form
        className="mt-8 bg-gray-200 p-8 rounded-xl shadow-xl w-full max-w-md"
        onSubmit={handleSubmit}
      >
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block mb-1">Email:</label>
            <input
              className="border border-solid border-black rounded-xl w-full p-2"
              type="email"
              name="email"
              value={query.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1">Password:</label>
            <input
              className="border border-solid border-black rounded-xl w-full p-2"
              type={showPassword ? "text" : "password"}
              name="password"
              value={query.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2"
            />
            <label htmlFor="showPassword">Show password</label>
          </div>

          <button
            className="w-full bg-purple-800 text-white py-2 rounded-xl hover:bg-purple-700 transition"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
