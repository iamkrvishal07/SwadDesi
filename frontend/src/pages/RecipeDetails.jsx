import profileImg from '../assets/profile.png'
import { useLoaderData } from 'react-router-dom'

export default function RecipeDetails() {
  const recipe = useLoaderData();

  // Fallback check
  if (!recipe) {
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        Recipe Not Found or Something Went Wrong.
      </div>
    );
  }

  return (
    <div className='outer-container'>
      <div className='profile'>
        <img src={profileImg} width="50px" height="50px" alt="Profile" />
        <h5>{recipe.email}</h5>
      </div>
      <h3 className='title'>{recipe.title}</h3>
      <img src={recipe.CoverImage} width="220px" height="200px" alt="Recipe" />
      <div className='recipe-details'>
        <div className='ingredients'>
          <h4>Ingredients</h4>
          <ul>
            {recipe.ingredients?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className='instructions'>
          <h4>Instructions</h4>
          <span>{recipe.instructions}</span>
        </div>
      </div>
    </div>
  );
}
