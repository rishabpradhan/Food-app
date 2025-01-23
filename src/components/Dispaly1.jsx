import Pancakes from "../assets/pancakes.jpg";
export default function Dispaly1(){
    return (
        <>
            <div className=" h-70vh  flex flex-1 mt-[40px]">
                <div className="  w-2/4 ">
                    <div className="pt-20 text-center">
                        <p className="font-inter text-5xl font-bold "> Let's Start </p>
                        <p className="font-inter text-5xl font-bold ">Cooking With</p>
                        <p className="font-inter text-5xl font-bold ">Popular Recipes....</p>
                    </div>
                    <div className="pt-4 text-center font-inria font-medium">
                        <p>want to try new recipes but</p>
                        <p>confused what to cook?</p>
                        <p>No need to worry see our latest recipes</p>

                    </div>


                </div>
                <div className=" w-2/4 flex justify-center h-center pt-10 ">
                <div className=" w-2/4 h-3/4   ">

                    <img  className="rounded-lg" src={Pancakes} />
                </div>
                </div>


            </div>
        </>
    );
}