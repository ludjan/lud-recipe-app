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

  return response = await fetch(targetUrl, config)
}

async function addRecipe(recipe) {

  // fetch the post 
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(recipe)
  })
  return response
}

async function deleteRecipe(recipe) {

  const targetUrl = apiUrl + "/" + recipe.id

  const config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  fetch(targetUrl, config)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      alert(data)
    })
    // .then(render())
}

// async function render() {
//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data)
//       feed.innerHTML = `<ul>`
//       data.forEach(recipe => {
//         const recipeUrl = url + '/' + recipe.id
//         feed.innerHTML += `
//         <li>
//           <a href="${recipeUrl}">
//             ${recipe.name}
//           </a>
//         </li>`
//       })
//       feed.innerHTML += `</ul>`
//     })
//     .catch(err => console.log(err))
// }

// render the page on first load
// render()