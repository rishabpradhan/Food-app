export default function Nav() {
    const Navlinks=[
        {
            id:1,
            name:"Home",
            link:"/#",
        },
        {
           id:2,
           name:"About",
           link:"/#",

        },
        {
            id:3,
            name:"Recipes",
            link:"/#",
        },
        {
            id:4,
            name:"LogIn",
            link:"/#",
        }
    ]


    return (
        <>
         <nav className=" bg-white fixed  top-0 left-0 w-full z-40 h-10

         ">
             <div className=" container   py-2 px-6 flex justify-between items items-center ">
                 {/* name of website*/}
                 <div className="text-2xl font-inter font-medium p-1 ">
                     <span  className="font-sans"> Food</span>
                     <span className="font-sans"> Recipe</span>
                 </div>
                 {/* nav links*/}

                 <div className=" hidden sm:block ">
                     <ul className="sm:flex gap-10 justify-end">
                         {
                          Navlinks.map(({id,link,name})=>(
                              <li key={id}>
                                  <a href={link} className="inline-block font-bold hover:text-purple-500  text-xl" >{name} </a>
                              </li>

                          ))}
                     </ul>
                 </div>
                 {/* mobile menu*/}
                 <div className="sm:hidden">
                     <button id="btn"></button>
                 </div>

                 {/* mobile drop */}
                 <div id="menu" className="hidden sm:hidden">
                     <ul className="flex flex-col gap-4 items-center pl-2">
                         {Navlinks.map(({id,link,name})=>(
                             <li key={id}>
                                 <a href={link} className=" font-semibold  text-2xl">{name}</a>
                             </li>
                         ))}

                     </ul>


                 </div>


             </div>
         </nav>

            {/*  some text*/}
            <div className="  mt-[4rem] text-center overflow-x-hidden ">
                <span className="uppercase font-inria text-xl">elegant recipes made for </span>
                <span className=" p-3 font-italianno text-purple-700 text-3xl "> everyday life</span>

            </div>




        </>
    )
}