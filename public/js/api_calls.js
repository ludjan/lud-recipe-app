const apiBaseURL='https://lud-recipe-api.herokuapp.com/api';
var appBaseURL='https://lud-recipe-app.herokuapp.com';

// if we are running the web app on localhost, change the appBaseURL
if (window.location.hostname == 'localhost') {
  appBaseURL = `http://${window.location.host}`;
}

// async function updateRecipe(recipe, id) {
//   const targetUrl = `${apiBaseURL}/id`
//   const config = {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(recipe)
//   }
//   return await fetch(targetUrl, config)
// }

// async function addRecipe(recipe) {
  
//   const targetUrl = apiBaseURL + "/recipes"
  
//   const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Inhqd3FPVkVFb0U0dXdKME9XV2JBTSJ9.eyJpc3MiOiJodHRwczovL2Rldi16Mjkzdmk2bi51cy5hdXRoMC5jb20vIiwic3ViIjoibUtCSVdWOHBhNE5NVzhYbGd4T0I3ZmdsSFYzb2t3MldAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vbHVkLXJlY2lwZS1hcGkuaGVyb2t1YXBwLmNvbSIsImlhdCI6MTY2MDU2NzczOCwiZXhwIjoxNjYwNjU0MTM4LCJhenAiOiJtS0JJV1Y4cGE0Tk1XOFhsZ3hPQjdmZ2xIVjNva3cyVyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.uOjtBNQ1m_KI9UnWa_MItU7eMKykgvLi2NHGyiHfiuyQuOJeZKXYpuKx7QjaqoC20l-uPldIiIhGVnxLlM_fJCqbVqnbtqU8mMPqMRAzG2nobFgFJnm3RYFHYddijoJ5N4WMWX0nx-sbdKhMud5sjnaqiTZaqdrvgJIu-ybxiKbvujRSKeF82XDQ15JFXbHtKNxK-RDa0yTdeb9idylfM-klfcu6yfTcSPYchvm2W_WAQOT5McLuaDmC46gEJEpuSZBK1drGynpbPK2d7QcclSCYoiC0RpcsGdbZ9qQdrbKQJBBNSExsQZx-qOPB8FoJl1qnTzm6MMDmypS3DrjviQ'

//   const config = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `bearer ${token}`
//     },
//     body: JSON.stringify(recipe)
//   }
//   return await fetch(targetUrl, config)
// }

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