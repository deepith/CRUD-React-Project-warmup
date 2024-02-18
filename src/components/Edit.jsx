import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../contexts/Context";
import { toast } from "react-toastify";

const Edit = () => {
  const { products, setProducts } = useContext(ProductContext);
  let { id } = useParams();

  const navigate = useNavigate();

  const [editProduct, setEditProduct] = useState();

  useEffect(() => {
    setEditProduct(products.filter((p) => p.id == id)[0]);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  const EditProduct = (e) => {
    /// EDIT ITEM
    e.preventDefault();

    const editIndex = products.findIndex((p) => p.id.toString() == id);
    console.log(editIndex);

    const copyProduct = [...products];

    copyProduct[editIndex] = { ...products[editIndex], ...editProduct };

    setProducts(copyProduct);

    localStorage.setItem("products", JSON.stringify(copyProduct));

    navigate(-1);

    toast.info("Product has been Edited!");
  };

  return (
    <form
      onSubmit={EditProduct}
      className="w-screen h-screen p-[5%] items-center flex flex-col "
    >
      <h1 className="text-2xl mb-3 font-semibold">Edit Product</h1>
      <input
        className="w-1/2 py-2 px-2 bg-zinc-100 mb-2"
        type="url"
        placeholder="image link"
        name="image"
        value={editProduct && editProduct.image}
        onChange={handleChange}
      />
      <input
        className="w-1/2 py-2 px-2 bg-zinc-100 mb-2"
        type="text"
        placeholder="title"
        name="title"
        value={editProduct && editProduct.title}
        onChange={handleChange}
      />
      <div className="w-1/2 flex justify-between">
        <input
          className="w-[48%] py-2 px-2 bg-zinc-100"
          type="text"
          placeholder="category"
          name="category"
          value={editProduct && editProduct.category}
          onChange={handleChange}
        />
        <input
          className="w-[48%] py-2 px-2 bg-zinc-100"
          type="text"
          placeholder="price"
          name="price"
          value={editProduct && editProduct.price}
          onChange={handleChange}
        />
      </div>
      <textarea
        className="mt-2 w-1/2 py-2 px-2 bg-zinc-100"
        rows="10"
        type="text"
        placeholder="description"
        name="description"
        value={editProduct && editProduct.description}
        onChange={handleChange}
      ></textarea>
      <input
        className="mt-2 px-3 py-1 bg-red-200 rounded font-semibold text-zinc-700 cursor-pointer hover:bg-red-400 hover:text-white "
        type="submit"
        value="Submit"
      />
    </form>
  );
};

export default Edit;
