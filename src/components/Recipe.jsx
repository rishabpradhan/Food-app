import {useState} from "react";

export default function Recipe(){
    const [query,setQuery] = useState("");
    const handleChange = (e) => {
        e.preventDefault();
        setQuery(e.target.value);

    }
    return (
      <>
          <div className=" h-32 flex flex-col">
              <div className="pt-5  flex justify-center  items-center  ">
                  <strong className="font-inter text-2xl">
                      Search For Recipes...
                  </strong>
              </div>


          <div className="pt-2 flex justify-center items-center space-x-2 ">
              <input className="border-2 border-solid border-black w-1/4 rounded-lg " type="text" name="recipe" placeholder="Enter Recipe..." value={query} onChange={handleChange} />
              <button className="border-solid p-0 w-[75px] h-[30px] border-black shadow-xl text-white bg-black cursor-pointer rounded-full text-center"> Search</button>
          </div>
      </div>
      </>
    );
}