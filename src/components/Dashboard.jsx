import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../recipes/convex/_generated/api.js";

const RecipeForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [calories, setCalories] = useState("");
  const [instructions, setInstructions] = useState([""]);

  const insertRecipe = useMutation(api.insertRecipes.insertRecipes);

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const updateInstruction = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !image || !cookingTime || !calories || instructions.some(instr => !instr.trim())) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await insertRecipe({
        title,
        image,
        cookingTime: Number(cookingTime),
        calories: Number(calories),
        instructions
      });
      alert("Recipe added successfully!");
      setTitle(""); setImage(""); setCookingTime(""); setCalories(""); setInstructions([""]);
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Add Your Recipe
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <h2 className="text-xl font-bold mb-4">Add a New Recipe</h2>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-lg"
            >
              ✖
            </button>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input type="text" placeholder="Recipe Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 rounded" required />
              <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} className="border p-2 rounded" required />
              <input type="number" placeholder="Cooking Time (minutes)" value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} className="border p-2 rounded" required />
              <input type="number" placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} className="border p-2 rounded" required />

              <div className="border p-3 rounded">
                <h3 className="font-medium">Instructions</h3>
                {instructions.map((step, index) => (
                  <input
                    key={index}
                    type="text"
                    value={step}
                    onChange={(e) => updateInstruction(index, e.target.value)}
                    placeholder={`Step ${index + 1}`}
                    className="border p-2 rounded w-full mt-1"
                    required
                  />
                ))}
                <button type="button" onClick={addInstruction} className="mt-2 text-blue-600 hover:underline">
                  + Add Step
                </button>
              </div>

              <button type="submit" className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                Submit Recipe
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeForm;
