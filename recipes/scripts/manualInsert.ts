import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api"; // Import the generated API functions

const convex = new ConvexHttpClient("https://beloved-horse-349.convex.cloud");

// Sample recipes data
const recipes = [
    {
        title: "Spaghetti Carbonara",
        image: "https://www.allrecipes.com/thmb/Vg2cRidr2zcYhWGvPD8M18xM_WY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg",
        cookingTime: 30,
        instructions: ["Boil pasta", "Fry bacon", "Mix with eggs and cheese"],
        calories: 600,
    },
    {
        title: "Grilled Chicken Salad",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYHrpbbGVdlEjegcOWAkOLjPNdkVRULksPiA&s",
        cookingTime: 20,
        instructions: ["Grill chicken", "Chop vegetables", "Mix with dressing"],
        calories: 400,
    },
];

// Function to insert recipes
async function insertRecipes() {
    try {
        for (const recipe of recipes) {
            await convex.mutation(api.insertRecipes.insertRecipes, recipe);
            console.log(`Inserted recipe: ${recipe.title}`);
        }
        console.log("All recipes inserted successfully!");
    } catch (error) {
        console.error("Error inserting recipes:", error);
    }
}

// Run the function
insertRecipes();
