import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Nav from './Recipe_Component/Nav'
import Banner from './Recipe_Component/Banner'
import List from './Recipe_Component/List'
import Footer from './Recipe_Component/Footer'
import Copy from './Recipe_Component/Copy'


const RecipeApp = () => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [recipes, setRecipes] = useState([])
	const [keyword, setKeyword] = useState("")
	const [frecipe, setFRecipe] = useState([])

	useEffect(() => {
		makeApiCall()
	}, [])

const handleFilter = () => {
	const filtered_recipes = recipes.filter((recipe)=>{
		return recipe.name.toLowerCase().includes(keyword.toLowerCase())
	})
	setFRecipe(filtered_recipes)
}

	//make the call and get the data for us
	function makeApiCall(){
		axios.get('https://dummyjson.com/recipes')
		.then(function(resp){
			console.log(resp.data.recipes)
			setLoading(false)
			setRecipes(resp.data.recipes)
		})
		.catch(function(err){
			console.log(err)
			setLoading(false)
			setError(true)
		})
	}

  return (
	<>
		<Nav />
		<Banner keyword={keyword} setKeyword={setKeyword} handleFilter={handleFilter}/>
		<List  loading={loading} error={error} recipes={recipes} frecipe={frecipe} keyword={keyword}/>
		<Footer />
		<Copy />
	</>
  )
}

export default RecipeApp