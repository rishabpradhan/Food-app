import { useQuery } from "convex/react";
import { api } from "../../recipes/convex/_generated/api.js";
import { useState } from "react";

const RecipeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const recipes = useQuery(api.queries.getRecipes.getRecipes); // Corrected function path

  if (recipes === undefined) {
    return <p>Loading recipes...</p>;
  }

  if (recipes.length === 0) {
    return <p>No recipes found.</p>;
  }

  // Filtering recipes based on search input
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Recipes</h2>

      {/* Search Input Field */}
      <input
        type="text"
        placeholder="Search for a recipe..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />

      <ul>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <li key={recipe._id}>
              <h3>{recipe.title}</h3>
              <img src={recipe.image} alt={recipe.title} width="150" />
              <p>Cooking Time: {recipe.cookingTime} mins</p>
              <p>Calories: {recipe.calories}</p>
            </li>
          ))
        ) : (
          <p>No matching recipes found.</p>
        )}
      </ul>
    </div>
  );
};

export default RecipeList;
