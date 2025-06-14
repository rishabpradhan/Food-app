import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="w-full h-[80vh] flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            We help home cooks and food lovers
            <br />
            discover authentic Nepali and international recipes.
          </h1>
          <p className="text-lg text-gray-600">
            This app empowers you to explore, cook, and share dishes with
            detailed guidance and cultural insight.
          </p>
        </div>
      </section>

      {/* Visual Divider */}
      <section>
        <img
          src="https://static.vecteezy.com/system/resources/previews/036/807/218/non_2x/ai-generated-multiple-dishes-of-indian-cuisine-on-wood-free-photo.jpg"
          alt="Nepali Recipes"
          className="w-full h-[500px] object-cover"
        />
      </section>

      {/* Two-column Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Left */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">
            Built to Preserve Culture and Promote Health
          </h2>
          <p className="text-gray-700 text-lg mb-4">
            Despite the richness of Nepali cuisine, few platforms deliver
            recipes with accurate nutritional details and preparation guides.
            Our goal is to fill this gap with a modern, reliable, and culturally
            respectful recipe hub.
          </p>
          <p className="text-gray-700 text-lg">
            Powered by the MERN stack and Convex DB, this app ensures fast
            access to authentic recipes while promoting healthy eating habits
            across the globe.
          </p>
        </div>

        {/* Image Right */}
        <div className="w-full">
          <img
            src="https://images.unsplash.com/photo-1726250873230-5bccf790a886?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRldmVsb3BlciUyMGRpc2N1c3NpbmclMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Developers Discussing"
            className="w-full rounded-lg shadow-md object-cover"
          />
        </div>
      </section>

      {/* Developer Section */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Meet the Developers</h2>
          <p className="text-lg text-gray-700 mb-4">
            This application was created by <strong>Aayush</strong> and{" "}
            <strong>Rishab</strong>, students of{" "}
            <strong>Thames International College</strong>, with a passion for
            food, culture, and technology.
          </p>
          <p className="text-lg text-gray-700">
            They aim to connect the old with the new — helping preserve
            traditional Nepali recipes while making them accessible and
            practical for modern home cooks.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
