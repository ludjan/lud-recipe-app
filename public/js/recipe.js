const apiUrl='https://lud-recipe-api.herokuapp.com/api'

async function updateRecipe(recipe, id) {
  const targetUrl = apiUrl + "/" + id
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(recipe)
  }
  return await fetch(targetUrl, config)
}

async function addRecipe(recipe) {
  
  
  const targetUrl = apiUrl + "/recipes"
  
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(recipe)
  }
  return await fetch(targetUrl, config)
}

async function deleteRecipe(recipe) {
  const targetUrl = apiUrl + "/recipes/" + recipe.id
  const config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return await fetch(targetUrl, config)
}

async function getStepsForRecipe(recipe) {
  const targetUrl = apiUrl + "/steps/" + recipe.id
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return await fetch(targetUrl, config)
}
