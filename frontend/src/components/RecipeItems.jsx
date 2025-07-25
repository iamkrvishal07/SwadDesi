import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdStopwatch } from "react-icons/io";
import { FaHeart, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const RecipeItems = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [isFavRecipe, setIsFavRecipe] = useState(false);
  const navigate = useNavigate();

  let favItems = JSON.parse(localStorage.getItem("fav")) ?? [];
  const isMyRecipePage = window.location.pathname === "/myRecipe";

  useEffect(() => {
    fetchRecipes();
  }, [isFavRecipe]);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("https://swaddesi-backend.onrender.com/recipe");
      setAllRecipes(res.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/recipe/${id}`);
      setAllRecipes(prev => prev.filter(recipe => recipe._id !== id));
      const updatedFav = favItems.filter(recipe => recipe._id !== id);
      localStorage.setItem("fav", JSON.stringify(updatedFav));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const favRecipe = (item) => {
    const exists = favItems.some(recipe => recipe._id === item._id);
    let updatedFav;
    if (exists) {
      updatedFav = favItems.filter(recipe => recipe._id !== item._id);
    } else {
      updatedFav = [...favItems, item];
    }
    localStorage.setItem("fav", JSON.stringify(updatedFav));
    setIsFavRecipe(prev => !prev); // trigger re-render
  };

  return (
    <div className="card-container">
      {allRecipes?.map((item, index) => (
        <div key={index} className='card' onDoubleClick={() => navigate(`/recipe/${item._id}`)}>
          <img src={item.CoverImage} width="205px" height="200px" alt={item.title} />
          <div className="card-body">
            <div className="title">{item.title}</div>
            <div className="icons">
              <div className='timer'><IoMdStopwatch />45 mins</div>
              {!isMyRecipePage ? (
                <FaHeart
                  onClick={() => favRecipe(item)}
                  style={{ color: favItems.some(res => res._id === item._id) ? "red" : "" }}
                />
              ) : (
                <div className="action">
                  <Link to={`/editRecipe/${item._id}`} className="editIcon"><FaEdit /></Link>
                  <MdDelete onClick={() => onDelete(item._id)} className='deleteIcon' />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeItems;
