const apiBaseURL='https://lud-recipe-api.herokuapp.com/api';
var appBaseURL='https://lud-recipe-app.herokuapp.com';

// if we are running the web app on localhost, change the appBaseURL
if (window.location.hostname == 'localhost') {
  appBaseURL = `http://${window.location.host}`;
}

async function deleteRecipe(recipeId, token) {
  const targetUrl = `${apiBaseURL}/recipes/${recipeId}`
  console.log(`Delete url: ${targetUrl}`);
  const config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${token}`
    }
  }
  return await fetch(targetUrl, config)
}

async function getToken() {
  return await fetch(`${appBaseURL}/getToken`)
}

async function getIngredients() {
  const targetUrl = `${apiBaseURL}/ingredients`
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return await fetch(targetUrl, config)
}

async function getUnits() {
  const targetUrl = `${apiBaseURL}/units`
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return await fetch(targetUrl, config)
}

async function getFullRecipe(recipeId) {
  const targetUrl = `${apiBaseURL}/fullRecipe/${recipeId}`
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return await fetch(targetUrl, config)
}

async function createFullRecipe(recipe, token) {
  const targetUrl = `${apiBaseURL}/fullRecipe`;
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${token}`
    },
    body: JSON.stringify(recipe)
  }
  return await fetch(targetUrl, config)
}

async function updateFullRecipe(id, recipe, token) {
  const targetUrl = `${apiBaseURL}/fullRecipe/${id}`;
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${token}`
    },
    body: JSON.stringify(recipe)
  }
  return await fetch(targetUrl, config)
}

export { getIngredients };