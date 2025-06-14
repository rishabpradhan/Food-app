import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../recipes/convex/_generated/api.js";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("firstname");

  const [isOpen, setIsOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [calories, setCalories] = useState("");
  const [instructions, setInstructions] = useState([""]);
  const [ingredients, setIngredients] = useState([""]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const insertRecipe = useMutation(api.insertRecipes.insertRecipes);
  const insertVideoRecipe = useMutation(
    api.insertVideoRecipe.insertVideoRecipe
  );
  const recipes = useQuery(
    api.queries.getUserRecipes.getUserRecipes,
    userId ? { userId } : "skip"
  );

  const displaySuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const resetForm = () => {
    setTitle("");
    setImage("");
    setVideoUrl("");
    setCookingTime("");
    setCalories("");
    setInstructions([""]);
    setIngredients([""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await insertRecipe({
        title,
        image,
        cookingTime: Number(cookingTime),
        calories: Number(calories),
        instructions: instructions.filter((i) => i.trim()),
        ingredients: ingredients.filter((i) => i.trim()),
        userId,
      });
      displaySuccess("Recipe added successfully!");
      resetForm();
      setIsOpen(false);
    } catch (err) {
      console.error("Error adding recipe:", err);
      displaySuccess("Failed to add recipe");
    }
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    try {
      await insertVideoRecipe({
        title,
        videoUrl,
        cookingTime: Number(cookingTime),
        calories: Number(calories),
        userId,
      });
      displaySuccess("Video recipe added successfully!");
      resetForm();
      setVideoOpen(false);
    } catch (err) {
      console.error("Error adding video recipe:", err);
      displaySuccess("Failed to add video recipe");
    }
  };

  const addInstruction = () => setInstructions([...instructions, ""]);
  const updateInstruction = (i, val) => {
    const copy = [...instructions];
    copy[i] = val;
    setInstructions(copy);
  };

  const addIngredient = () => setIngredients([...ingredients, ""]);
  const updateIngredient = (i, val) => {
    const copy = [...ingredients];
    copy[i] = val;
    setIngredients(copy);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username"); // Clear username on logout
    navigate("/login");
  };

  if (recipes === undefined) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">Loading recipes...</div>
    );
  }

  if (recipes === null) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">Error loading recipes</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
            {successMessage}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          {/* Display username */}

          <h2 className="text-xl font-semibold">Dashboard</h2>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add Your Recipe (Manual)
        </button>
        <button
          onClick={() => setVideoOpen(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
        >
          Add Video Recipe
        </button>
      </div>

      {/* Recipes List */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white shadow p-4 rounded-lg hover:shadow-lg transition"
            >
              {recipe._type === "regular" ? (
                <>
                  {recipe.image && (
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                  )}
                  <h2 className="text-xl font-semibold">{recipe.title}</h2>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{recipe.cookingTime} mins</span>
                    <span>{recipe.calories} calories</span>
                  </div>
                  {recipe.ingredients && recipe.ingredients.length > 0 && (
                    <>
                      <h3 className="mt-2 font-medium">Ingredients:</h3>
                      <ul className="list-disc list-inside text-sm text-gray-700">
                        {recipe.ingredients.map((ingr, idx) => (
                          <li key={idx}>{ingr}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  <h4 className="font-medium mb-1">Instructions:</h4>
                  <ul className="list-decimal list-inside text-gray-800">
                    {Array.isArray(recipe.instructions) ? (
                      recipe.instructions.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))
                    ) : (
                      <li>{recipe.instructions}</li>
                    )}
                  </ul>
                </>
              ) : (
                <>
                  {recipe.videoUrl && (
                    <div className="relative pb-[56.25%] h-0 mb-3">
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
                  <h2 className="text-xl font-semibold">{recipe.title}</h2>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{recipe.cookingTime} mins</span>
                    <span>{recipe.calories} calories</span>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 text-lg">
              No recipes found. Add your first recipe!
            </p>
          </div>
        )}
      </div>

      {/* Manual Recipe Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Add New Recipe</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title*
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL*
                  </label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cooking Time (mins)*
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={cookingTime}
                      onChange={(e) => setCookingTime(e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Calories*
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                </div>

                <div className="border p-4 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Ingredients*</h3>
                    <button
                      type="button"
                      onClick={addIngredient}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Ingredient
                    </button>
                  </div>
                  {ingredients.map((ingredient, index) => (
                    <div key={`ingredient-${index}`} className="mb-2">
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) =>
                          updateIngredient(index, e.target.value)
                        }
                        placeholder={`Ingredient ${index + 1}`}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="border p-4 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Instructions*</h3>
                    <button
                      type="button"
                      onClick={addInstruction}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Step
                    </button>
                  </div>
                  {instructions.map((step, index) => (
                    <div key={`instruction-${index}`} className="mb-2">
                      <textarea
                        value={step}
                        onChange={(e) =>
                          updateInstruction(index, e.target.value)
                        }
                        placeholder={`Step ${index + 1}`}
                        className="w-full p-2 border rounded min-h-[80px]"
                        required
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Submit Recipe
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Video Recipe Modal */}
      {videoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Add Video Recipe</h2>
                <button
                  onClick={() => setVideoOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleVideoSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title*
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Video URL*
                  </label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cooking Time (mins)*
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={cookingTime}
                      onChange={(e) => setCookingTime(e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Calories*
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  Submit Video Recipe
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
