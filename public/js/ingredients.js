// ingredients
const addIngredientInputBtn = document.getElementById(
    'add-ingredient-input-btn'
  );
  const recipeIngredientsFeed = document.getElementById(
    'recipe-ingredient-feed'
  );
  var recipeIngredientArray = []; // actual recipeIngredients
  var recipeIngredientInputArray = []; // the inputs
  
  function rerenderRecipeIngredients() {
    resetIngredients();

    for (let i = 0; i < recipeIngredientArray.length; i++) {

        const newRecipeIngredientInput = createAndAppendIngredientInput2(i);
        const recipeIngredient = recipeIngredientArray[i];
        
        // set values of input
        setIngredientValuesInInput(recipeIngredient, newRecipeIngredientInput);
    }
    console.log(`Rerendered ingredients`);
  }

  function setIngredientValuesInInput(recipeIngredient, recipeIngredientInput) {

    console.log(recipeIngredient.ingredient);
    console.log(recipeIngredientInput.ingredientSelect);


    setValueInSelectorIfExists(
        recipeIngredientInput.ingredientSelect,
        recipeIngredient.ingredient
      );
      recipeIngredientInput.amountInput.value = recipeIngredient.quantity;
      setValueInSelectorIfExists(
        recipeIngredientInput.unitSelect,
        recipeIngredient.unit
      );
      console.log('Set inputs in IngredientValue row');
  }

function resetIngredients() {
    clearElement(recipeIngredientsFeed);
    recipeIngredientInputArray = [];
    console.log('Reset ingredients');
}

function createAndAppendIngredientInput2(inputNumber) {
    // create the html element
    var newDiv = document.createElement('div');
    newDiv.innerHTML = `<div id="ingredient-input-${inputNumber}">
          <label for="ingredients-select-${inputNumber}">Choose ingredient:</label>
          <select name="ingredient" id="ingredients-select-${inputNumber}"></select>

          <label for="ingredients-amount-${inputNumber}">Amount:</label>
          <input type="number" min="1" name="amount" id="ingredients-amount-${inputNumber}"</select>

          <label for="unit-select-${inputNumber}">Choose unit:</label>
          <select name="unit" id="unit-select-${inputNumber}"></select>

          <!-- <button onClick="removeIngredientInput(${inputNumber})">Remove</button> -->
        </div>`;

    // add new html to the file
    recipeIngredientsFeed.appendChild(newDiv);

    // find the newly added ids
    const ingredientSelect = document.getElementById(
      `ingredients-select-${inputNumber}`
    );
    const unitSelect = document.getElementById(
      `unit-select-${inputNumber}`
    );
    const amountInput = document.getElementById(
      `ingredients-amount-${inputNumber}`
    );

    // add it to the global input list
    const recipeIngredientInput = {
      ingredientSelect: ingredientSelect,
      amountInput: amountInput,
      unitSelect: unitSelect,
    };
    recipeIngredientInputArray.push(recipeIngredientInput);

    console.log(ingredients);
    appendOptionsToSelect(ingredients, recipeIngredientInput.ingredientSelect);
    appendOptionsToSelect(units, recipeIngredientInput.unitSelect);

    return recipeIngredientInput;
  }


















  function removeIngredientInput(id) {
    // remove the recipeIngredientInput from array
    const removedInput = recipeIngredientInputArray.splice(id, 1);
    const element = document.getElementById(`ingredients-input${id}`);
    console.log(removedInput);

    while (removedInput.firstChild) {
      removedInput.removeChild(removedInput.firstChild);
    }
    removedInput.remove();

    // while (element.firstChild) {
    //   element.removeChild(element.firstChild)
    // }
    // element.remove()
  }

  function loadIngredientInputs(ingredientArray) {
    console.log(`loadIngredientInputs start`);
    console.log(ingredientArray);
    for (let i = 0; i < ingredientArray.length; i++) {
      const recipeIngredientInput = createAndAppendIngredientInput(
        recipeIngredientInputArray.length
      );

      const row = ingredientArray[i];

      console.log(`Looking at row ${row}`);
      console.log(`Array ingredient: ${row.ingredient}`);
      console.log(`Array quantity: ${row.quantity}`);
      console.log(`Array unit: ${row.unit}`);

      setValueInSelectorIfExists(
        recipeIngredientInput.ingredientSelect,
        row.ingredient
      );
      recipeIngredientInput.amountInput.value = row.quantity;
      setValueInSelectorIfExists(
        recipeIngredientInput.unitSelect,
        row.unit
      );
    }
    console.log(`loadIngredientInputs end`);
  }

  function createAndAppendIngredientInput(inputNumber) {
    // create the html element
    var newDiv = document.createElement('div');
    newDiv.innerHTML = `<div id="ingredient-input-${inputNumber}">
          <label for="ingredients-select-${inputNumber}">Choose ingredient:</label>
          <select name="ingredient" id="ingredients-select-${inputNumber}"></select>

          <label for="ingredients-amount-${inputNumber}">Amount:</label>
          <input type="number" min="1" name="amount" id="ingredients-amount-${inputNumber}"</select>

          <label for="unit-select-${inputNumber}">Choose unit:</label>
          <select name="unit" id="unit-select-${inputNumber}"></select>

          <!-- <button onClick="removeIngredientInput(${inputNumber})">Remove</button> -->
        </div>`;

    // add new html to the file
    recipeIngredientsFeed.appendChild(newDiv);

    // find the newly added ids
    const ingredientSelect = document.getElementById(
      `ingredients-select-${inputNumber}`
    );
    const unitSelect = document.getElementById(
      `unit-select-${inputNumber}`
    );
    const amountInput = document.getElementById(
      `ingredients-amount-${inputNumber}`
    );

    // add it to the global input list
    const recipeIngredientInput = {
      ingredientSelect: ingredientSelect,
      amountInput: amountInput,
      unitSelect: unitSelect,
    };
    recipeIngredientInputArray.push(recipeIngredientInput);

    // set the values for the selectors
    appendIngredientsToSelect(
      ingredients,
      recipeIngredientInput.ingredientSelect
    );
    appendUnitToSelect(units, recipeIngredientInput.unitSelect);

    return recipeIngredientInput;
  }