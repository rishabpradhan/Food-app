


import Nav from "./components/Nav.jsx";
import Dispaly1 from "./components/Dispaly1.jsx";
import Display2 from "./components/Display2.jsx";
import Recipe from "./components/Recipe.jsx";

function App() {


  return (
    <>
        <div className="overflow-x-hidden "> <Nav /></div>
      <div className="h-3/4">< Dispaly1 /></div>
        <div><Display2 /></div>
        <div className="overflow-x-hidden">
            <Recipe />
        </div>


    </>
  )
}

export default App
