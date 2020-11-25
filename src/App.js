import Axios from 'axios';
import React, {useState} from 'react'
import { v4 as uuidv4 } from "uuid";
import './App.css';
import Alert from './component/Alert';
import Recipe from './component/Recipe';

function App() {
  const [query, setQuery] = useState("");
  const [recipes,setRecipes] = useState([]);
  const [alert,setAlert] = useState("");
  
  const APP_ID = "92afe319";
  const APP_KEY = "47c54d2f35e57c038194e2633271ddae";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const getData = async() => {
    if(query!==""){
      const result = await Axios.get(url);
      if(!result.data.more){
        return setAlert("No food with such name");
      }
      setRecipes(result.data.hits);
      setAlert("");
      setQuery("");
    }else{
      setAlert("Please fill the form");
    }
  };
  
  const onChange = e => setQuery(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    getData();
  };



  return (
    <div className="App">
      <h1>Find Food Recipe</h1>
      <form className="search-form" onSubmit={onSubmit}>
      {alert !=="" && <Alert alert={alert}/>}
        <input 
        type="text" 
        name="query"
        onChange={onChange} 
        value={query}
        autoComplete="off" 
        placeholder="Search Recipe" 
        />
        <input type="submit" value="Search"/>
      </form>
      <div className="recipes">
        {recipes !==[] && recipes.map(recipe =><Recipe key={uuidv4()} recipe={recipe}/>)}
      </div>
    </div>
  );
};

export default App
