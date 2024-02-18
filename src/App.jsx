import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import { useContext } from "react";
import { ProductContext } from "./contexts/Context";
import Create from "./components/Create";
import Edit from "./components/Edit";

function App() {
  const { pathname, search } = useLocation();

  return (
    <>
      <div className="w-screen h-screen flex">
        {(pathname != "/" || search.length > 0) && (
          <Link
            to="/"
            className="top-[2.2%] z-50 left-[20.5%] absolute px-3 py-1 rounded-md text-zinc-600 border font-bold border-zinc-600 hover:bg-zinc-600 hover:text-zinc-100"
          >
            Home
          </Link>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
