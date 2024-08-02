import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy]=useState("All");
  console.log(filterBy);
  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    setFoods([...foods, newFood]);
    console.log(newFood);
  }
  function handleRemove(id){
    const newFoodArray=foods.filter((food)=>food.id!==id);
    setFoods(newFoodArray);
  }
  function handleUpdate(id){
    const newFoodArray=foods.map((food)=>{
      if(food.id===id){
        return {
          ...foods,
          heatLevel:food.heatLevel+1,
        };
      } else {
        return food;
      }
    })
    setFoods(newFoodArray);
  }
  function handleFilterChange(event){
    setFilterBy(event.target.value);
  }
  const foodsToDisplay=foods.filter((food)=>{
    if(filterBy==="All"){
      return true;
    } else {
      return food.cuisine===filterBy;
    }
  })

  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
      <button onClick={()=>handleUpdate(food.id)}>Update</button>
      <button onClick={()=>handleRemove(food.id)}>Remove</button>
    </li>
  ));

  return (
    <div>
      <select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
