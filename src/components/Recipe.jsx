import React, { useState } from "react";

const recipes = [
  {
    title: "Gundruk with Dhido Khas (Hill Brahmin/Chhetri)",
    health: "Low-calorie, high fiber meal.",
    cook: "Boil buckwheat flour into porridge, serve with fermented greens.",
    image:
      "https://www.thegundruk.com/wp-content/uploads/2018/12/dhido-with-wild-mushroom-curry.jpg",
    description:
      "Dhido is a traditional thick porridge made from buckwheat or millet flour, eaten with gundruk, which is fermented leafy green vegetables. It’s nutritious and a staple in hilly regions.",
  },
  {
    title: "Samay Baji–Newar community",
    health: "Protein-rich traditional platter.",
    cook: "Serve chiura with spiced meat, egg, soybeans & pickles.",
    image:
      "https://newarirecipeshut.com/wp-content/uploads/2020/09/samay-baji-aloo-tama-1536x1024.jpg",
    description:
      "A ceremonial platter of beaten rice (chiura), spiced meat (chhwela), boiled egg, black soybeans, pickles, and other items. It is deeply rooted in Newar rituals and festivals.",
  },
  {
    title: "Thakali Khana Set–Thakali community",
    health: "Balanced, nutritious full meal.",
    cook: "Plate rice, dal, veggies, achar & meat curry.",
    image: "https://recipes.timesofindia.com/photo/82048030.cms",
    description:
      "A complete meal of rice, lentil soup, vegetables, gundruk achar, and meat curry, known for its balanced taste, presentation, and hygienic preparation.",
  },
  {
    title: "Yomari–newar community",
    health: "Energy-dense festive sweet.",
    cook: "Steam rice dumplings with chaku & sesame filling.",
    image:
      "https://i.pinimg.com/736x/ca/e3/ea/cae3ea0b78f006898535bf47608992a6.jpg",
    description:
      "A steamed rice-flour dumpling filled with chaku (molasses) and sesame seeds. It is especially made during the Yomari Punhi festival and symbolizes wealth and prosperity.",
  },
  {
    title: "Thekuwa–Madhesi community",
    health: "Sweet treat, rich in carbs.",
    cook: "Deep-fry jaggery-wheat dough in ghee.",
    image:
      "https://thewondernepal.com/media/uploads/2025/05/06/bihari-thekua-recipe.jpg",
    description:
      "A sweet, crispy cookie made of wheat flour, jaggery, and ghee, deep-fried and traditionally prepared during Chhath and other religious celebrations.",
  },
  {
    title: "Sukuti with Bhatmas Sadheko–Limbu community",
    health: "High-protein, iron-rich snack.",
    cook: "Grill dried meat, mix soybeans with spices.",
    image:
      "https://i.ytimg.com/vi/oQD1onfv1JY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAkz36f86fKK1kz2AiwWeHYmd_OKA",
    description:
      "Sukuti is dried smoked meat (usually buffalo), often fried or grilled, and served with bhatmas sadheko, a spiced soybean salad – a favorite snack and side dish.",
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
          The Greatest Nepalese Food 🔥
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
