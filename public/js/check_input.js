const isAlphaNumeric = str => /^[\w\-\s]+$/gi.test(str);
const isNumeric = str => isNotBlank(str) && isAlphaNumeric(str) && !isNaN(str);
const isBlank = str => str === "";
const isNotBlank = str => !isBlank(str);

function allRecipeInputsAreValid() {
    const recipeName = recipeNameInput.value;
    const recipeDescription = recipeDescriptionInput.value;
    const recipePortions = recipePortionsInput.value;

    if (!isAlphaNumeric(recipeName)) {
      alert(`Name '${recipeName}' is not alphanumeric`);
      return false;
    }
    if (!isAlphaNumeric(recipeDescription)) {
      alert(`Description '${recipeDescription}' is not alphanumeric`);
      return false;
    }
    if (!isNumeric(recipePortions)) {
      alert(`Portions '${recipePortions}'' is not numeric`);
      return false;
    }

    // validate ingredients
    var validRecipeIngredientCount = 0;
    console.log(
      `RecipeIngredientsArray length = ${recipeIngredientArray.length}`
    );
    for (let i = 0; i < recipeIngredientArray.length; i++) {
      const { quantity } = recipeIngredientArray[i];
      if (!isNumeric(quantity) || parseInt(quantity) <= 0) {
        console.log(
          `This amount ${quantity} was not a number or too small`
        );
        // remove this ?
        // removeIngredientInput
      } else {
        validRecipeIngredientCount++;
      }
    }
    if (validRecipeIngredientCount <= 0) {
      alert(`Must have at least 1 valid ingredients`);
      return false;
    }

    // validate ingredients
    var validStepCount = 0;
    console.log(`RecipeStepArray length = ${recipeStepArray.length}`);
    for (let i = 0; i < recipeStepArray.length; i++) {
      const description = recipeStepArray[i];
      if (isBlank(description)) {
        // remove this ?
        console.log(`Description cannot be blank`);
      } else {
        validStepCount++;
      }
    }
    if (validStepCount <= 0) {
      alert(`Must have at least 1 valid step`);
      return false;
    }

    return true;
  }
