import React from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import MainLayout from './components/MainLayout'
import axios from 'axios'
import Home from './pages/Home'
import AddFoodRecipe from './pages/AddFoodRecipe'
import EditRecipe from './pages/EditRecipe'
import RecipeDetails from './pages/RecipeDetails'

const getAllRecipes = async () => {
  try {
    const res = await axios.get('http://localhost:3000/recipe');
    return res.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return []; 
  }
};


const getMyRecipes=async()=>{
  let user=JSON.parse(localStorage.getItem("user"))
  let allRecipes=await getAllRecipes()
  return allRecipes.filter(item=>item.createdBy===user._id)
}


const getFavRecipes=()=>{
  return JSON.parse(localStorage.getItem("fav"))
}


const getRecipe=async({params})=>{
  let recipe;
  await axios.get(`http://localhost:3000/recipe/${params.id}`)
  .then(res=>recipe=res.data)

  await axios.get(`http://localhost:3000/user/${recipe.createdBy}`)
  .then(res=>{
    recipe={...recipe,email:res.data.email}
  })

  return recipe
}


const router = createBrowserRouter([
  {path:"/",element:<MainLayout/>,children:[
    {path : '/', element:<Home/>,loader:getAllRecipes},
    {path : '/myRecipe', element:<Home/>,loader:getMyRecipes},
    {path:"/favRecipe",element:<Home/>,loader:getFavRecipes},
    {path : '/addRecipe', element:<AddFoodRecipe/>},
    {path : '/editRecipe/:id', element:<EditRecipe/>},
    {path:"/recipe/:id",element:<RecipeDetails/>,loader:getRecipe}
    
  ]}
])

const App = () => {
  return (
    <>
    <RouterProvider router = {router}></RouterProvider>
    </>
  )
}

export default App
