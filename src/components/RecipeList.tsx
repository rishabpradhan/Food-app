import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api"; //

const RecipeList = () => {
  const recipes = useQuery(api.getRecipes); //

  if (recipes === undefined) {
    return <p>Loading recipes...</p>;
  }

  if (recipes.length === 0) {
    return <p>No recipes found.</p>;
  }

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} width="150" />
            <p>Cooking Time: {recipe.cookingTime} mins</p>
            <p>Calories: {recipe.calories}</p>
            <h4>Instructions:</h4>
            <ul>
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
