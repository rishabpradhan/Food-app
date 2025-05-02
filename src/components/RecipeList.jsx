import { useQuery } from "convex/react";
import { api } from "../../recipes/convex/_generated/api.js";
import { useState } from "react";

const RecipeList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch both regular recipes and video recipes
  const regularRecipes = useQuery(api.queries.getRecipes.getRecipes);
  const videoRecipes = useQuery(api.queries.getVideoRecipes.getVideoRecipes);

  if (regularRecipes === undefined || videoRecipes === undefined) {
    return (
      <p className="text-center text-gray-500 font-sans">Loading recipes...</p>
    );
  }

  // Combine both regular and video recipes with null checks
  const combinedRecipes = [
    ...(regularRecipes || []).map((recipe) => ({
      ...recipe,
      _type: "regular",
    })),
    ...(videoRecipes || []).map((recipe) => ({ ...recipe, _type: "video" })),
  ];

  // Filter based on search term
  const filteredRecipes = combinedRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (combinedRecipes.length === 0) {
    return (
      <p className="text-center text-gray-500 font-sans">No recipes found.</p>
    );
  }

  return (
    <div className="px-8 py-10 bg-gray-50 min-h-screen font-sans">
      <h2 className="text-4xl font-bold text-center mb-8">🍽️ Recipes</h2>

      {/* Search Input */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 font-sans"
        />
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden font-sans"
            >
              {/* Display Image or Video */}
              {recipe._type === "regular" ? (
                <>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span className="mr-4">⏱ {recipe.cookingTime} mins</span>
                      <span>🔥 {recipe.calories} kcal</span>
                    </div>
                    <h4 className="font-medium mb-1">Ingredients:</h4>
                    <ul className="list-disc list-inside text-gray-700 mb-4">
                      {Array.isArray(recipe.ingredients) ? (
                        recipe.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))
                      ) : (
                        <li>{recipe.ingredients}</li>
                      )}
                    </ul>
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
                  </div>
                </>
              ) : (
                <>
                  <div className="relative" style={{ paddingBottom: "56.25%" }}>
                    <video
                      controls
                      className="absolute top-0 left-0 w-full h-full"
                      style={{ maxHeight: "200px" }}
                    >
                      <source src={recipe.videoUrl} type="video/mp4" />
                    </video>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-4">⏱ {recipe.cookingTime} mins</span>
                      <span>🔥 {recipe.calories} kcal</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-800 font-sans">
            No matching recipes found.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
