import React, { useState } from "react";
import foodRecipe from "../assets/foodRecipe.png";
import RecipeItems from "../components/RecipeItems";
import { useNavigate } from "react-router-dom";
import Model from "../components/Model";
import InputForm from "../components/inputForm";

const Home = () => {

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

    const addRecipe = () => {
        let token = localStorage.getItem("token")
        if (token)
            navigate("/addRecipe")
        else {
            setIsOpen(true)
        }
    }
  
  return (
    <>
      <section className="home">
        {/* <div className="left">
          <h1>
            <span style={{ fontSize: "7.2rem" }}>🍽️</span> Delicious Recipes
            Await
          </h1>

          <h4>
            Ever wondered why your taste buds dance when reading a good recipe?
            It's not just the ingredients it's the story. A well-written
            recipe grabs your attention, stirs your curiosity, and leaves you
            hungry for more. That's why we ditch the boring "content here" fluff
            and serve you authentic bites of culinary creativity  just like
            grandma used to write.
          </h4>
          <button onClick={addRecipe}>Share your recipe</button>
        </div>
        <div className="right">
          <img src={foodRecipe} width="500px" height="300px"></img>
        </div> */}

<div className="recipe-wrapper">
  <img src={foodRecipe} alt="Recipe" width="85%" height="250px" className="recipe-img" />

  <div className="recipe-content">
    <div className="left">
    <div style={{ fontFamily: 'Segoe UI, sans-serif' }}>
  <h1 style={{ fontSize: '2rem', color: '#d35400' }}>
    🍲 Swadisht Recipes Ka Khazana
  </h1>
  <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#333' }}>
    Kabhi socha hai ek achhi recipe padhte hi dil kyun khush ho jaata hai? Sirf masale hi nahi, har recipe ke
    peeche ek kahani hoti hai. Maa ke haathon ka swaad, dadi ki rasoi ki yaadein, aur bachpan ke vo
    khatte-meethe pal—sab kuch uss ek dish mein sama gaya hota hai. Hum yahi asli swaad lekar aaye hain, jo sirf
    pet nahi, dil bhi bhar de. Toh aaiye, milkar pakate hain yaadon bhare pakwaan, apne hi andaaz mein.

  </p>
</div>

    </div>
    <div className="right" >
      
      <br/>
      <div style={{color: '#d35400'}}>
      <button onClick={addRecipe}>Share your recipe</button>
      </div >
    </div>
  </div>
</div>        
        <br />
      </section>

      {(isOpen) && <Model onClose={() => setIsOpen(false)}><InputForm setIsOpen={() => setIsOpen(false)} /></Model>}
      <div className="recipe">
        <RecipeItems />
      </div>
    </>
  );
};

export default Home;
