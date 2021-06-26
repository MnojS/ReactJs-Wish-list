import React, { useState , useEffect } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList'

const Ingredients = () => {
  const [userIngredients , setUserIngredients] = useState([]);
  
  useEffect( () => {

    fetch('https://react-hooks-update-ae3ee-default-rtdb.firebaseio.com/ingredients.json')
      .then(response => response.json()
      .then(responseData => {
        const loadedIngredients = [];
        for(const key in responseData) {
          loadedIngredients.push({
            id:key,
            title : responseData[key].title,
            amount : responseData[key].amount
      });
    }
    setUserIngredients(loadedIngredients)
  }));

  } , []);

  useEffect( () => {
    console.log('RENDERING ' , userIngredients);
  } , [userIngredients])
  

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-update-ae3ee-default-rtdb.firebaseio.com/ingredients.json',{
      method:'POST',
      body: JSON.stringify(ingredient),
      headers:{ 'Content-Type' : 'application/json' }
    }).then(response => {
      return response.json();
    }).then(responseData => {
      setUserIngredients( prevIngredients => [
        ...prevIngredients , 
        {id : responseData.name , ...ingredient}
      ])
    });
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient = {addIngredientHandler} />

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem = {() => {}}/>
      </section>
    </div>
  );
}

export default Ingredients;
