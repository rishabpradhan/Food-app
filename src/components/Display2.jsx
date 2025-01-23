import Salad from "../assets/salad.jpg";
import Pizza from "../assets/pizza.jpg";
import Chicken from "../assets/chicken.jpg";

export default function Display2() {
    return (
        <>
            <div className="bg-gray-100 h-96 flex justify-center h-center gap-10 overflow-x-hidden ">
            <div className=" p-4  w-1/4 h-3/4 flex  flex-col justify-center items-center mt-8">
                <img  className="w-full h-full object-cover" src={Salad}/>
                <div className="border-solid border-4 px-7 py-1 w-auto h-auto bg-gold hover:bg-amber-300  transition ease-in-out delay-150 hover:translate-y-1 hover:scale-110 duration-200">
                    <button className="text-white cursor-pointer">Salad</button>
                </div>

            </div >
                <div className=" p-4 w-1/4 h-3/4 flex flex-col justify-center items-center mt-8">
                  <img className="w-full h-full object-cover" src={Pizza}/>
                    <div className="border-solid border-4 px-7 py-1 w-auto h-auto bg-gold hover:bg-amber-300 cursor-pointer transtion ease-out delay-150 hover:translate-y-1 hover:scale-110 duration-200">
                     <button className="text-white cursor-pointer">Pizza</button>
                    </div>
                </div>
                <div className=" p-4 w-1/4 h-3/4 flex justify-center flex-col items-center mt-8">
                    <img className="w-full h-full object-cover" src={Chicken}/>
                   <div className="border-solid border-4 px-7 py-1 w-auto h-auto bg-gold hover:bg-amber-300 cursor-pointer transtion ease-in delay-150 hover:translate-y-1 hover:scale-110 duration-200 ">
                      <button className="text-white cursor-pointer">Chicken Roll</button>
                   </div>
                </div>
            </div>

        </>
    );
}