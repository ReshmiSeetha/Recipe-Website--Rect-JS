import React,{useEffect,useState} from 'react';
import Recipe from './recipe.js';
import './App.css';

function App() {

  const APP_ID='dab55bae';
  const APP_KEY='eb3d9236fd67dc358a466e7d570577fd';

  const [recipes,setRecipes]=useState([]);
  const [search,setSearch]=useState('');
  const [query,setQuery]=useState('chicken');

  useEffect(()=>{
    getRecipe();
  },[query]);
  const updateSearch=e=>{
    setSearch(e.target.value);
  }
  const getSearch=e=>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  const getRecipe=async ()=>{
    const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data=await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe=>(
        <Recipe key={recipe.recipe.label} image={recipe.recipe.image} title={recipe.recipe.label} calories={recipe.recipe.calories}
        ingredients={recipe.recipe.ingredients}/>
      ))}
      </div>
    </div>
  );
}

export default App;
