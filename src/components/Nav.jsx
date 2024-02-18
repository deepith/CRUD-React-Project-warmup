import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../contexts/Context";

const Nav = () => {
  const { products } = useContext(ProductContext);

  const getRandomColor = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);

    return array[randomIndex];
  };

  const colors = [
    "bg-red-300",
    "bg-blue-300",
    "bg-yellow-300",
    "bg-green-300",
    "bg-violet-300",
  ];

  const category =
    products &&
    products.reduce((acc, product) => [...acc, product.category], []);
  let filteredCategory = [...new Set(category)];

  return (
    <div className="w-[18%] h-screen bg-zinc-100 p-4">
      <nav className="flex flex-col justify-center items-center ">
        <a
          href="/create"
          className="px-4 py-1 border-sky-200 border-2 rounded-md font-semibold text-sky-300 hover:bg-sky-300 hover:text-white"
        >
          Add New Product
        </a>
        <hr className="mt-3 mb-2 w-[80%]" />
        <h1 className="text-xl w-[80%] mb-3 font-normal">Category Filter</h1>
        <ul className="w-[80%]">
          {filteredCategory.length > 0 &&
            filteredCategory.map((c, i) => (
              <Link
                to={`/?category=${c}`}
                key={i}
                className="flex gap-2 items-center text-sm font-semibold mb-1 hover:bg-zinc-500 hover:text-zinc-100 rounded pl-3 py-2"
              >
                <span
                  className={`w-[15px] h-[15px] ${getRandomColor(
                    colors
                  )} rounded-full`}
                />
                {c}
              </Link>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
