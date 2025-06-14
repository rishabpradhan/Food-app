export default function Display2() {
  return (
    <div className="bg-gray-100 h-96 flex justify-center gap-10 overflow-x-hidden">
      <div className="p-4 w-1/4 h-full flex flex-col justify-start items-center mt-8">
        <div className="relative w-full h-64 overflow-hidden rounded-lg group">
          <img
            className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500 group-hover:opacity-0 z-10"
            src="https://cdn.stunningnepal.com/wp-content/uploads/2019/11/Newari-Khaja-Set.jpg"
            alt="Newari Food"
          />
          <img
            className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-20"
            src="https://images.squarespace-cdn.com/content/v1/53ecd1bde4b0a6f9524254f8/1685710696992-9OZ4ZN5VY3BPX76QAZDJ/Newar+Culture.jpg?format=2500w"
            alt="Newari Culture"
          />
        </div>
        <div className="border-4 px-7 py-1 mt-4 bg-gold hover:bg-amber-300 transition hover:translate-y-1 hover:scale-110 duration-200">
          <button className="text-white cursor-pointer">Newari</button>
        </div>
      </div>

      <div className="p-4 w-1/4 h-full flex flex-col justify-start items-center mt-8">
        <div className="relative w-full h-64 overflow-hidden rounded-lg group">
          <img
            className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500 group-hover:opacity-0 z-10"
            src="https://www.thegundruk.com/wp-content/uploads/2016/01/IMG_0161.jpg"
            alt="Tharu Food"
          />
          <img
            className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-20"
            src="https://www.drive.nepaldatabase.com/uploads/images/202302/image_750x_63de5107a5f81.jpg"
            alt="Tharu Culture"
          />
        </div>
        <div className="border-4 px-7 py-1 mt-4 bg-gold hover:bg-amber-300 transition hover:translate-y-1 hover:scale-110 duration-200">
          <button className="text-white cursor-pointer">Tharu</button>
        </div>
      </div>

      <div className="p-4 w-1/4 h-full flex flex-col justify-start items-center mt-8">
        <div className="relative w-full h-64 overflow-hidden rounded-lg group">
          <img
            className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500 group-hover:opacity-0 z-10"
            src="https://ecs.com.np/fckimage/article/images/2016/1/ght_food1.jpg"
            alt="Sherpa Food"
          />
          <img
            className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-20"
            src="https://radianttreks.com/wp-content/uploads/2023/05/Sherpas-Of-Solukhumbu.jpg"
            alt="Sherpa Culture"
          />
        </div>
        <div className="border-4 px-7 py-1 mt-4 bg-gold hover:bg-amber-300 transition hover:translate-y-1 hover:scale-110 duration-200">
          <button className="text-white cursor-pointer">Sherpa</button>
        </div>
      </div>
    </div>
  );
}
