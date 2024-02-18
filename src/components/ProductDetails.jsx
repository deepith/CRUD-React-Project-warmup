import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../contexts/Context";
import Loading from "./Loading";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { products, setProducts } = useContext(ProductContext);
  const [viewedProduct, setViewedProduct] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    if (!viewedProduct) {
      setViewedProduct(products.filter((p) => p.id == id)[0]);
    }
  }, [products, id]);

  console.log(products);

  const deleteItem = (clickedID) => {
    /// DELETE ITEM
    const filteredItems = products.filter((p, i) => p.id != clickedID);

    setProducts(filteredItems);

    localStorage.setItem("products", JSON.stringify(filteredItems));

    console.log(products);

    navigate("/");
    toast.error("Product has been Removed");
  };

  return (
    <>
      {products.length > 0 ? (
        <div className="w-[70%] h-screen m-auto p-[10%] flex items-center relative">
          <div className="w-[50%] pr-10 p-[10%]">
            <img
              className="object-contain w-[100%] h-[80%] m-auto"
              src={viewedProduct?.image}
              alt=""
            />
          </div>
          <div className="w-[50%] ">
            <h1 className="text-4xl mb-2">{viewedProduct?.title}</h1>
            <h2 className="text-sm mb-3 text-zinc-500">
              {viewedProduct?.category}
            </h2>
            <h2 className="mb-1 text-red-400 font-semibold">
              $ {viewedProduct?.price}
            </h2>
            <p className="mb-3">{viewedProduct?.description}</p>
            <Link
              to={`/edit/${id}`}
              className="px-3 py-1 border font-bold border-blue-300 mr-3 text-blue-300 rounded-md hover:bg-blue-300 hover:text-zinc-100"
            >
              Edit
            </Link>
            <button
              onClick={() => deleteItem(viewedProduct?.id)}
              className="px-3 py-1 border font-bold border-red-300 mr-3 text-red-300 rounded-md hover:bg-red-300 hover:text-zinc-100"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProductDetails;
