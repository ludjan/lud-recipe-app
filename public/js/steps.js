// steps
const addStepInputBtn = document.getElementById('add-step-input-btn');
const recipeStepFeed = document.getElementById('recipe-step-feed');
var recipeStepArray = []; // actual recipeSteps
var recipeStepInputArray = []; // the inputs

function getStepDescriptionArray(array) {
    var newArray = [];
    for (let i = 0; i < array.length; i++) {
      const step = array[i];
      newArray.push(step.description);
    }
    return newArray;
}

function moveStepInputUp(id) {
    if (id <= 0 || id > recipeStepArray.length) return; // validate incoming clicked id
    saveCurrentStepInputs(); // save input fields to string array of descriptions
    swapElementsOnIndexes(recipeStepArray, id, id - 1); // swap the elements
    rerenderRecipeSteps(); // rerender
    console.log(`Swapped places of step ${id + 1} and ${id + 2}`);
}

function moveStepInputDown(id) {
    if (id < 0 || id >= recipeStepArray.length) return; // validate incoming clicked id
    saveCurrentStepInputs(); // save input fields to string array of descriptions
    swapElementsOnIndexes(recipeStepArray, id, id + 1); // swap the elements
    rerenderRecipeSteps(); // rerender
    console.log(`Swapped places of step ${id + 1} and ${id + 2}`);
}

function saveCurrentStepInputs() {
    var newArray = [];
    for (let i = 0; i < recipeStepInputArray.length; i++) {
      const description = recipeStepInputArray[i].descriptionInput.value;
      // console.log(`Saving ${description} to stepArray`);
      newArray.push(description);
    }
    recipeStepArray = newArray;
}


function rerenderRecipeSteps() {
    resetSteps();

    for (let i = 0; i < recipeStepArray.length; i++) {
      const newRecipeStepInput = createAndAppendStepInput(i);
      const recipeStep = recipeStepArray[i];
      newRecipeStepInput.descriptionInput.value = recipeStep;
    }
    // console.log('Rerendered steps');
}

function createAndAppendStepInput(stepNumber) {
    var newDiv = document.createElement('div');
    var html = `<div>`;

    html += `<label for="step-description-${stepNumber}">${stepNumber + 1} - Step description:</label>
          <input type="text" name="step" id="step-description-${stepNumber}"></select>`;
    
    if (stepNumber == recipeStepArray.length-1) {
        html += `<button onclick="moveStepInputDown(${stepNumber})" disabled>\\/</button>`
    } else {
        html += `<button onclick="moveStepInputDown(${stepNumber})">\\/</button>`
    }

    if (stepNumber == 0) {
      html += `<button onclick="moveStepInputUp(${stepNumber})" disabled>/\\</button>`;
    } else {
        html += `<button onclick="moveStepInputUp(${stepNumber})">/\\</button>`;
    }

    newDiv.innerHTML += `</div>`;

    newDiv.innerHTML = html;

    // add new html to the file
    recipeStepFeed.appendChild(newDiv);

    // find the newly added id
    const stepDescriptionInput = document.getElementById(
      `step-description-${stepNumber}`
    );

    // add it to global list of step inputs
    const recipeStepInput = {
      stepNumber: stepNumber,
      descriptionInput: stepDescriptionInput,
    };
    recipeStepInputArray.push(recipeStepInput);

    return recipeStepInput;
}

function resetSteps() {
    clearElement(recipeStepFeed);
    recipeStepInputArray = []; // clear the array of step inputs
}

