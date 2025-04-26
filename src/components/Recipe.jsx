import React, { useState } from "react";

const recipes = [
  {
    title: "Salad",
    health: "Rich in vitamins, low in calories.",
    cook: "Mix greens, fruits, and nuts.",
    image:
      "https://images.unsplash.com/photo-1505576633757-0ac1084af824?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNhbGFkfGVufDB8fDB8fHww",
    description:
      "A refreshing salad loaded with spinach, strawberries, nuts, and feta cheese. Perfect for a healthy meal anytime!",
  },
  {
    title: "Pizza",
    health: "Source of protein and carbs.",
    cook: "Top dough with sauce, cheese, and toppings. Bake.",
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGl6emF8ZW58MHx8MHx8fDA%3D",
    description:
      "A classic favorite with a crispy crust, tangy tomato sauce, gooey cheese, and delicious toppings. Homemade pizza is always a hit!",
  },
  {
    title: "Chicken Roll",
    health: "High in protein and fiber.",
    cook: "Wrap grilled chicken with veggies in a tortilla.",
    image:
      "https://media.istockphoto.com/id/1438449132/photo/egg-cheese-chicken-burger-shawarma-wrap-with-salad-dip-and-sauce-isolated-wooden-board-side.webp?a=1&b=1&s=612x612&w=0&k=20&c=08S_g-ccgs9WJt0srYPhrPAqrWEdTh4ZppTLqlGPWJs=",
    description:
      "Juicy grilled chicken, crisp veggies, and a creamy dressing wrapped in a soft tortilla. A perfect meal on-the-go!",
  },
  {
    title: "Pasta Primavera",
    health: "Full of veggies and nutrients.",
    cook: "Toss pasta with seasonal vegetables and olive oil.",
    image:
      "https://media.istockphoto.com/id/626265714/photo/rotini-primavera-in-a-browned-butter-and-garlic-sauce.webp?a=1&b=1&s=612x612&w=0&k=20&c=g5NQvuNjxodF0nwbo1kESS1Suil3qKMs5_9D5ZR328w=",
    description:
      "A colorful and nutritious pasta dish loaded with fresh seasonal vegetables and a light olive oil dressing.",
  },
  {
    title: "Berry Smoothie",
    health: "High in antioxidants and vitamins.",
    cook: "Blend berries with yogurt and honey.",
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmVycnklMjBTbW9vdGhpZXxlbnwwfHwwfHx8MA%3D%3D",
    description:
      "A vibrant smoothie packed with berries, creamy yogurt, and a touch of honey. Boost your energy instantly!",
  },
  {
    title: "Grilled Veggie Skewers",
    health: "Low-calorie, high fiber meal.",
    cook: "Grill assorted veggies on skewers.",
    image:
      "https://media.istockphoto.com/id/912629972/photo/chicken-kebab-with-bell-pepper.webp?a=1&b=1&s=612x612&w=0&k=20&c=pkGNPcGNXi_CVB0LDwr6F3IIJtI60mOZpnLsMoIvyCw=",
    description:
      "A colorful combination of grilled vegetables on skewers, lightly seasoned and perfectly charred for a healthy side dish.",
  },
];

const RecipeGrid = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const openModal = (recipe) => setSelectedRecipe(recipe);
  const closeModal = () => setSelectedRecipe(null);

  return (
    <>
      <div className="p-8 mt-5">
        <p className="uppercase text-center font-inter text-2xl font-semibold text-purple-700">
          The Latest & Greatest 🔥
        </p>
      </div>
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.slice(0, 6).map((recipe, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-bold mb-1">{recipe.title}</h2>
                <p className="text-gray-600 text-xs mb-1">
                  <span className="font-semibold">Health:</span> {recipe.health}
                </p>
                <p className="text-gray-600 text-xs mb-2">
                  <span className="font-semibold">Cook:</span> {recipe.cook}
                </p>
                <button
                  onClick={() => openModal(recipe)}
                  className="mt-auto bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-2 rounded text-xs"
                >
                  Continue Reading
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Popup Modal */}
        {selectedRecipe && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-80 relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-2">{selectedRecipe.title}</h2>
              <p className="text-gray-700 text-sm">
                {selectedRecipe.description}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="bg-gray-700 flex flex-col items-center py-4">
        <span className="text-white">© All Rights Reserved</span>
        <span className="text-white">FOOD RECIPE APP</span>
        <span className="text-white">Rishab Pradhan | Ayush Shrestha</span>
        <a
          href="https://github.com/rishabpradhan/Food-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 mt-2 text-white hover:text-yellow-400"
        >
          {/* GitHub Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577 
      0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.612-4.042-1.612-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 
      1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.3-5.467-1.332-5.467-5.93 
      0-1.31.467-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.49 11.49 
      0 0 1 3.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 
      3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.48 
      5.921.43.372.823 1.103.823 2.222 0 1.606-.015 2.896-.015 
      3.286 0 .32.218.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z"
            />
          </svg>
          <span>View on GitHub</span>
        </a>
      </div>
    </>
  );
};

export default RecipeGrid;
