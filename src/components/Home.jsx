import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProductContext } from "../contexts/Context";
import axios from "../utils/Axios";
import Loading from "./Loading";

const Home = () => {
  const { products } = useContext(ProductContext);

  const [filteredItem, setFilteredItem] = useState(null);

  const { search } = useLocation();
  const decodedURL = decodeURIComponent(search.split("=")[1]);

  // const getFilteredCategory = async () => {
  //   try {
  //     const { data } = await axios.get(`/products/category/${decodedURL}`);
  //     setFilteredItem(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (!filteredItem || decodedURL === "undefined") {
      setFilteredItem(products);
    }
    if (decodedURL !== "undefined") {
      setFilteredItem(products.filter((p) => p.category === decodedURL));
    }
  }, [products, decodedURL]);

  return (
    <>
      <Nav />
      {products.length > 0 ? (
        <div className="w-[82%] h-screen px-10 py-20 flex flex-wrap gap-4 overflow-x-hidden overflow-y-auto">
          {filteredItem &&
            filteredItem.map((product, index) => (
              <Link
                key={index}
                to={`/${product.id}`}
                className="card border shadow-md w-[18%] h-[30vh] rounded-md p-2 flex flex-col items-center justify-center cursor-pointer"
              >
                <div
                  className="w-full h-[80%] bg-contain bg-no-repeat bg-center hover:scale-110 "
                  style={{
                    backgroundImage: `url(${product.image})`,
                  }}
                ></div>
                <div
                  className={`mt-2 h-[20%] text-sm font pb-2 text-center hover:text-sky-300 whitespace-nowrap max-w-[170px] overflow-hidden text-ellipsis`}
                >
                  {product.title}
                </div>
              </Link>
            ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;
