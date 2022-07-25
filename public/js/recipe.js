// const feed = document.getElementById('recipe-feed')
// const addRecipeForm = document.getElementById('add-recipe-form')
// const recipeNameInput = document.getElementById('recipe-name')
// const recipeDescriptionInput = document.getElementById('recipe-description')


const apiUrl='https://lud-recipe-api.herokuapp.com/api/recipes'

console.log("recipe.js kjorer")


// addRecipeForm.addEventListener("submit", () => {
  
//   // create the new entry
//   const newRecipe = {
//     name: recipeNameInput.value,
//     description: recipeDescriptionInput.value
//   }
//   console.log(newRecipe)

//   // clear the input field
//   recipeNameInput.innerText = ""

//   // async add, then re-render
//   addRecipe(newRecipe).then(data => {
//     if (!data.ok) {
//       const errorMessage = `Error ${data.status} - ${data.statusText}`
//       console.log(errorMessage)
//       return alert(errorMessage)
//     }
//     window.location.pathname = ('/..') // navigates user back to main page
//   })
// })

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

  const config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: "something"
  }

  fetch(url, config)
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