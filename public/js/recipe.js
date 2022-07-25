const apiUrl='https://lud-recipe-api.herokuapp.com/api/recipes'

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
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(recipe)
  }
  return await fetch(apiUrl, config)
}

async function deleteRecipe(recipe) {
  const targetUrl = apiUrl + "/" + recipe.id
  const config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return await fetch(targetUrl, config)
}
