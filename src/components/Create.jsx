import React, { useContext, useState } from "react";
import { ProductContext } from "../contexts/Context";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const { products, setProducts } = useContext(ProductContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const addProduct = (e) => {
    /// ADD ITEM
    e.preventDefault();

    const newID = products ? products.length + 1 : 1;

    const product = {
      id: newID,
      title,
      price,
      description,
      category,
      image,
    };

    if (
      title.length < 4 ||
      price.length < 2 ||
      description.length < 4 ||
      category.length < 4 ||
      image.length < 4
    ) {
      alert("Character less than 3 characters");
      return;
    }

    setProducts([...products, product]);

    localStorage.setItem("products", JSON.stringify([...products, product]));

    navigate("/");
    toast.success("Product added Successfully!");
  };

  return (
    <form
      onSubmit={addProduct}
      className="w-screen h-screen p-[5%] items-center flex flex-col "
    >
      <h1 className="text-2xl mb-3 font-semibold">Add New Product</h1>
      <input
        className="w-1/2 py-2 px-2 bg-zinc-100 mb-2"
        type="url"
        placeholder="image link"
        name="image"
        onChange={(e) => setImage(e.target.value)}
      />
      <input
        className="w-1/2 py-2 px-2 bg-zinc-100 mb-2"
        type="text"
        placeholder="title"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="w-1/2 flex justify-between">
        <input
          className="w-[48%] py-2 px-2 bg-zinc-100"
          type="text"
          placeholder="category"
          name="category"
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          className="w-[48%] py-2 px-2 bg-zinc-100"
          type="text"
          placeholder="price"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <textarea
        className="mt-2 w-1/2 py-2 px-2 bg-zinc-100"
        rows="10"
        type="text"
        placeholder="description"
        name="description"
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input
        className="mt-2 px-3 py-1 bg-red-200 rounded font-semibold text-zinc-700 cursor-pointer hover:bg-red-400 hover:text-white "
        type="submit"
        value="Submit"
      />
    </form>
  );
};

export default Create;
